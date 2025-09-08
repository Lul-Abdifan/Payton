from django.contrib import admin
from .models import ImportedAsset, ProductMedia


@admin.register(ImportedAsset)
class ImportedAssetAdmin(admin.ModelAdmin):
    list_display = ("sku", "original_name", "status", "created_at")
    search_fields = ("sku", "original_name")


if ProductMedia is not None:
    @admin.register(ProductMedia)
    class ProductMediaAdmin(admin.ModelAdmin):
        list_display = ("product", "view", "position", "is_primary")
        search_fields = ("product__sku", "view")


