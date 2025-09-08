"""
Celery application for Payton Suite (django_backend).
"""
import os
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'django_backend.config.settings.dev')

app = Celery('payton')

# Load custom config from Django settings using the `CELERY_` namespace
app.config_from_object('django.conf:settings', namespace='CELERY')

# Auto-discover tasks from installed apps
app.autodiscover_tasks()


