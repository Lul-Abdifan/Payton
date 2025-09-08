from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('search/', include('apps.search.urls')),
    path('media/', include('apps.media_importer.urls')),
]


