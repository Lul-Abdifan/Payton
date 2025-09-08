from django.urls import path
from .views import upload_images


urlpatterns = [
    path("bulk-media/upload/", upload_images, name="bulk_media_upload"),
]


