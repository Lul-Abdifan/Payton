from io import BytesIO
from typing import Tuple
from PIL import Image


SIZES = {
    "xs": (200, 200),
    "sm": (400, 400),
    "md": (800, 800),
    "lg": (1600, 1600),
}


def to_jpeg_bytes(img: Image.Image, size: Tuple[int, int], quality: int = 85) -> bytes:
    im = img.copy()
    im.thumbnail(size)
    buf = BytesIO()
    im.convert("RGB").save(buf, format="JPEG", quality=quality, optimize=True)
    return buf.getvalue()


