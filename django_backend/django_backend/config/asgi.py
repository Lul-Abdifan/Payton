"""
ASGI config for Payton Suite (django_backend).

Exposes the ASGI callable as a module-level variable named ``application``.
"""

import os
from django.core.asgi import get_asgi_application  # type: ignore

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'django_backend.config.settings.dev')

application = get_asgi_application()


