"""
Base settings for the Payton Suite backend.

These settings are shared between development and production. Values can
be overridden via environment variables. Avoid committing secrets.
"""

import os
from pathlib import Path
import dj_database_url  # type: ignore


BASE_DIR = Path(__file__).resolve().parent.parent.parent

SECRET_KEY = os.getenv('SECRET_KEY', 'please-change-me')
DEBUG = os.getenv('DEBUG', 'False').lower() == 'true'

# Allow all hosts in development; restrict in production via env var
_hosts = os.getenv('ALLOWED_HOSTS', '')
if _hosts:
    ALLOWED_HOSTS = [h.strip() for h in _hosts.split(',')]
elif DEBUG:
    ALLOWED_HOSTS = ['*']
else:
    ALLOWED_HOSTS = []

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    
    #local
    'apps.search',
    'apps.media_importer',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'django_backend.config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'django_backend.wsgi.application'
ASGI_APPLICATION = 'django_backend.config.asgi.application'

# Database configuration using dj-database-url. Provide a DATABASE_URL env
# such as postgresql://user:pass@host:port/dbname
DATABASE_URL = os.getenv('DATABASE_URL', 'postgres://postgres:Password@localhost:5432/payton')
DATABASES = {
    'default': dj_database_url.parse(DATABASE_URL, conn_max_age=600),
}

# Cache (default to local memory cache; override with Redis in prod)
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Celery configuration
CELERY_BROKER_URL = os.getenv('REDIS_URL', 'redis://localhost:6379/0')
CELERY_RESULT_BACKEND = CELERY_BROKER_URL
CELERY_TASK_DEFAULT_QUEUE = 'default'
CELERY_TASK_QUEUES = {
    'sync': {},
    'media': {},
    'email': {},
    'forecast': {},
}

# Logging (avoid defining LOGGING_CONFIG to keep Django default)
from django_backend.config.logging import LOGGING as PROJECT_LOGGING  # type: ignore
LOGGING = PROJECT_LOGGING


