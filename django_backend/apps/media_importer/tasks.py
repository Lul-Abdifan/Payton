from __future__ import annotations

from celery import shared_task  # type: ignore
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from django.utils.text import slugify
from django.utils.timezone import now
from PIL import Image  # type: ignore

from .models import ImportedAsset, ProductMedia
from .utils_images import SIZES, to_jpeg_bytes

try:
    from erp.products.models import Product  # type: ignore
except Exception:
    Product = None  # type: ignore


@shared_task(queue="media")
def process_imported_asset(asset_id: int) -> int:
    asset = ImportedAsset.objects.get(id=asset_id)
    try:
        if Product is None:
            raise RuntimeError("Product model is not available; ensure your ERP products app is installed")

        product = Product.objects.filter(sku__iexact=asset.sku).first()
        if not product:
            raise ValueError(f"No product found for SKU {asset.sku}")

        with default_storage.open(asset.stored_path, "rb") as f:
            img = Image.open(f)

        stamp = now().strftime("%Y%m%d")
        base = slugify(f"{product.sku}-{asset.view or 'image'}-{stamp}")

        large_bytes = to_jpeg_bytes(img, SIZES["lg"], quality=85)
        thumb_bytes = to_jpeg_bytes(img, SIZES["xs"], quality=80)

        if ProductMedia is None:
            raise RuntimeError("ProductMedia disabled (ENABLE_PRODUCT_MEDIA!=1)")
        pm = ProductMedia.objects.create(
            product=product,
            alt_text=f"{product.name} {asset.view or ''} – Payton Violins".strip(),
            view=asset.view or "",
            position=getattr(product, 'media', []).count() if hasattr(product, 'media') else 0,
        )
        pm.file.save(f"{base}.jpg", ContentFile(large_bytes), save=True)

        asset.status = "processed"
        asset.save(update_fields=["status"])
        return pm.id
    except Exception as exc:
        asset.status = "failed"
        asset.error = str(exc)
        asset.save(update_fields=["status", "error"])
        raise


