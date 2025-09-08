"""
Development settings for Payton Suite.

Extends the base settings with development‑only packages and options
such as Django Debug Toolbar and relaxed security settings.
"""

from .base import *  # noqa: F401,F403

# Ensure debug mode is enabled explicitly
DEBUG = True

# Add development tools
INSTALLED_APPS += ['debug_toolbar']  # type: ignore
MIDDLEWARE.insert(0, 'debug_toolbar.middleware.DebugToolbarMiddleware')  # type: ignore

# Configure internal IPs for debug toolbar (localhost and Docker)
INTERNAL_IPS = ['127.0.0.1', '10.0.2.2']


