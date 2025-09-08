"""Project configuration package (ASGI/WSGI, Celery, settings, URLs, logging)."""

# Expose Celery app if needed by external tools
try:
    from .celery import app as celery_app  # type: ignore
    __all__ = ("celery_app",)
except Exception:
    __all__ = ()


