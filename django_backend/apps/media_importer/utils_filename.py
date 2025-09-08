from typing import Tuple


def parse_filename(filename: str) -> Tuple[str, str]:
    name = filename.rsplit('/', 1)[-1].rsplit('.', 1)[0]
    parts = name.replace('-', '_').split('_')
    if not parts:
        return "", ""
    sku = parts[0].strip()
    view = parts[1].strip() if len(parts) > 1 else ""
    return sku, view


