import re
from pathlib import Path
root = Path('src')
app = root / 'App.jsx'
text = app.read_text(encoding='utf-8')
imports = re.findall(r"import\s+(\w+)\s+from\s+['\"](.+?)['\"]", text)
route_paths = re.findall(r"<Route\s+path=['\"]([^\"']+)['\"]\s+element=\{<([^>]+)>\}", text)
routes = {p: c for p, c in route_paths}
imported = {name: mod for name, mod in imports}
missing = []
for c, mod in imported.items():
    if mod.startswith('.'):
        file_path = (root / mod).with_suffix('.jsx')
        if not file_path.exists():
            missing.append((c, mod, str(file_path)))
missing_routes = []
for path, comp in routes.items():
    comp_clean = comp.strip()
    if comp_clean not in imported:
        missing_routes.append((path, comp_clean))
print('imported components:', len(imported))
print('routes total:', len(routes))
print('missing imported files:', len(missing))
for m in missing:
    print('MISSING IMPORT', m)
print('missing route component imports:', len(missing_routes))
for r in missing_routes:
    print('MISSING ROUTE', r)
