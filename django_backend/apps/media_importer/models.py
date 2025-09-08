import os
from django.db import models
from django.utils.text import slugify


class ImportedAsset(models.Model):
    sku = models.CharField(max_length=64, db_index=True)
    view = models.CharField(max_length=32, blank=True)
    original_name = models.CharField(max_length=255)
    stored_path = models.CharField(max_length=512)
    status = models.CharField(max_length=16, default='queued')
    error = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"{self.sku} {self.original_name} ({self.status})"


ENABLE_PRODUCT_MEDIA = os.getenv('ENABLE_PRODUCT_MEDIA', '0') == '1'

if ENABLE_PRODUCT_MEDIA:
    class ProductMedia(models.Model):
        product = models.ForeignKey('products.Product', on_delete=models.CASCADE, related_name='media')  # type: ignore
        file = models.FileField(upload_to='products/%Y/%m/')
        alt_text = models.CharField(max_length=255, blank=True)
        view = models.CharField(max_length=32, blank=True)
        position = models.PositiveIntegerField(default=0)
        is_primary = models.BooleanField(default=False)

        class Meta:
            ordering = ['position', 'id']

        def __str__(self) -> str:
            return f"{self.product} {self.view or 'image'}"
else:
    ProductMedia = None  # type: ignore


