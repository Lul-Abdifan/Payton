from django.http import HttpResponse
from django.template.loader import render_to_string
from .queries import run_suggestions


def suggest(request):
    q = request.GET.get('q', '').strip()
    results = run_suggestions(q)
    groups = group_by_entity(results)
    html = render_to_string('search/_suggestions.html', {'q': q, 'groups': groups})
    return HttpResponse(html)


def group_by_entity(rows):
    order = ['product', 'instrument', 'customer', 'contract', 'work_order', 'trade_in']
    grouped = []
    total = 0
    for et in order:
        items = [map_item(r) for r in rows if r['entity_type'] == et]
        if items:
            total += len(items)
            grouped.append({'title': et.replace('_', ' ').title(), 'items': items})
    grouped.total = total  # type: ignore
    return grouped


def map_item(r):
    url = f"/{r['entity_type']}s/{r['entity_id']}/"
    primary_action = None
    if r['entity_type'] == 'instrument':
        primary_action = {
            'label': 'Start rental',
            'url': f"/contracts/start?instrument_id={r['entity_id']}",
        }
    return {
        'label': r.get('name') or r.get('sku') or '—',
        'meta': r.get('sku') or r.get('state') or '',
        'state': r.get('state'),
        'url': url,
        'primary_action': primary_action,
    }


