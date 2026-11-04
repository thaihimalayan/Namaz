#!/usr/bin/env python3
"""Copies prayer times from prayertimes.muslimthaipost.com for every province into mtp.json (run daily by GitHub)."""
import json, re, sys, time, datetime, urllib.parse, urllib.request

BASE = 'https://prayertimes.muslimthaipost.com'
UA = {'User-Agent': 'Mozilla/5.0 (compatible; NamazApp personal use)'}

def get(url, data=None):
    req = urllib.request.Request(url, data=data, headers=dict(UA, **({'Content-Type': 'application/x-www-form-urlencoded', 'X-Requested-With': 'XMLHttpRequest'} if data else {})))
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read().decode('utf-8')

def pad(t):
    return re.sub(r'^(\d):', r'0\1:', t.strip())

def main():
    html = get(BASE + '/province/bangkok')
    m = re.search(r'AREA_DATA\s*=\s*(\[\[.*?\]\]);', html, re.S)
    area = json.loads(m.group(1))
    try:
        old = json.load(open('mtp.json', encoding='utf-8'))
    except Exception:
        old = {}
    out = {'updated': datetime.date.today().isoformat(), 'prov': old.get('prov', {}), 'd': old.get('d', {})}
    ok = 0
    for a in area:
        pid = str(a[0])
        try:
            j = json.loads(get(BASE + '/app_crud.php', urllib.parse.urlencode({'action': 'getsolatbyprovince', 'id': pid}).encode()))
            t = j['rowsolat']
            start = datetime.date(int(t['yyyy']), int(t['mm']), int(t['dd']))
            rows = [t] + j['rowsolats']
            days = out['d'].setdefault(pid, {})
            for i, r in enumerate(rows):
                key = (start + datetime.timedelta(days=i)).isoformat()
                days[key] = ' '.join(pad(r[k]) for k in ('subhi', 'shuruk', 'zuhri', 'asri', 'maghrib', 'aisha'))
            out['prov'][pid] = {'n': a[1], 'lat': round(float(a[2]), 4), 'lng': round(float(a[3]), 4)}
            ok += 1
        except Exception as e:
            print('province', pid, 'failed:', e, file=sys.stderr)
        time.sleep(0.3)
    cutoff = (datetime.date.today() - datetime.timedelta(days=60)).isoformat()
    for pid in out['d']:
        out['d'][pid] = {k: v for k, v in sorted(out['d'][pid].items()) if k >= cutoff}
    print('provinces saved:', ok)
    if ok < 70:
        sys.exit(1)
    with open('mtp.json', 'w', encoding='utf-8') as f:
        json.dump(out, f, ensure_ascii=False, separators=(',', ':'), sort_keys=True)

main()
