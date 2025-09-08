from __future__ import annotations

from io import BytesIO
from zipfile import ZipFile

from django.contrib.admin.views.decorators import staff_member_required
from django.core.files.storage import default_storage
from django.shortcuts import render
from django.http import HttpRequest, HttpResponse

from .models import ImportedAsset
from .utils_filename import parse_filename
from .tasks import process_imported_asset


@staff_member_required
def upload_images(request: HttpRequest) -> HttpResponse:
    if request.method == "POST":
        files = request.FILES.getlist("files")
        count = 0
        for f in files:
            filename = f.name
            if filename.lower().endswith(".zip"):
                with ZipFile(f) as zf:
                    for name in zf.namelist():
                        if name.endswith("/"):
                            continue
                        data = zf.read(name)
                        inner_name = name.split("/")[-1]
                        sku, view = parse_filename(inner_name)
                        if not sku:
                            continue
                        path = default_storage.save(f"imports/{inner_name}", BytesIO(data))
                        asset = ImportedAsset.objects.create(
                            sku=sku,
                            view=view,
                            original_name=inner_name,
                            stored_path=path,
                        )
                        process_imported_asset.delay(asset.id)
                        count += 1
            else:
                sku, view = parse_filename(filename)
                if not sku:
                    continue
                path = default_storage.save(f"imports/{filename}", f)
                asset = ImportedAsset.objects.create(
                    sku=sku,
                    view=view,
                    original_name=filename,
                    stored_path=path,
                )
                process_imported_asset.delay(asset.id)
                count += 1
        return render(request, "media_importer/upload_done.html", {"count": count})
    return render(request, "media_importer/upload.html")


