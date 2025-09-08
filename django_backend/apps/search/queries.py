from django.db import connection

SQL = """
WITH q AS (
  SELECT %(raw_q)s   AS raw_q,
         %(quoted_q)s AS quoted_q,
         plainto_tsquery('english', %(raw_q)s) AS tsq
)
SELECT id, entity_type, entity_id, name, sku, state,
(
  CASE WHEN sku=%(raw_q)s OR serial=%(raw_q)s THEN 1.00 ELSE 0 END +
  CASE WHEN name ILIKE %(quoted_q)s THEN 0.90 ELSE 0 END +
  CASE WHEN %(raw_q)s = ANY(aliases) THEN 0.85 ELSE 0 END +
  0.60 * GREATEST(similarity(name,%(raw_q)s), similarity(sku,%(raw_q)s), similarity(serial,%(raw_q)s)) +
  0.45 * ts_rank_cd(tsv, (SELECT tsq FROM q), 32) +
  CASE WHEN state IN ('available','in_stock') THEN 0.10 ELSE 0 END +
  0.20 * recent_score
) AS score
FROM search_omnibox
WHERE (sku % %(raw_q)s OR name % %(raw_q)s OR serial % %(raw_q)s OR tsv @@ (SELECT tsq FROM q))
ORDER BY score DESC
LIMIT 10;
"""


def run_suggestions(q: str):
    q = (q or '').strip()
    if not q:
        return []
    params = {"raw_q": q, "quoted_q": f"%{q}%"}
    with connection.cursor() as cur:
        cur.execute(SQL, params)
        columns = [col[0] for col in cur.description]
        return [dict(zip(columns, row)) for row in cur.fetchall()]


