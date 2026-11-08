from pathlib import Path
from html.parser import HTMLParser
import json, re, xml.etree.ElementTree as ET
from urllib.parse import urlsplit, unquote
ROOT=Path(__file__).resolve().parents[1]
errors=[]
class Links(HTMLParser):
    def __init__(self,path): super().__init__(); self.path=path; self.ids=set()
    def handle_starttag(self,tag,attrs):
        attrs=dict(attrs)
        if 'id' in attrs:
            if attrs['id'] in self.ids: errors.append(f'{self.path}: duplicate ID {attrs["id"]}')
            self.ids.add(attrs['id'])
        for key in ['href','src']:
            value=attrs.get(key,'')
            parsed=urlsplit(value)
            if not value or parsed.scheme or parsed.netloc or not parsed.path: continue
            target=(self.path.parent/unquote(parsed.path)).resolve()
            if 'releases' in target.parts: continue # artifact created after verification
            if not target.exists(): errors.append(f'{self.path.relative_to(ROOT)}: missing {value}')
for path in ROOT.rglob('*.html'):
    if 'releases' not in path.parts: Links(path).feed(path.read_text(encoding='utf-8'))
for path in (ROOT/'assets').rglob('*.svg'): ET.parse(path)
data=json.loads((ROOT/'catalog/data.json').read_text(encoding='utf-8'))
assert len({c['name'] for c in data['components']})==len(data['components'])
for c in data['components']:
    if not (ROOT/c['path']).is_file(): errors.append('Missing component '+c['name'])
for path in json.loads((ROOT/'manifest.json').read_text(encoding='utf-8'))['files']:
    if not (ROOT/path).is_file(): errors.append('Missing manifest entry '+path)
for doc in json.loads((ROOT/'design-system.json').read_text(encoding='utf-8'))['docs']['sections']:
    if not (ROOT/doc).is_file(): errors.append('Missing document '+doc)
styles = [ROOT/'tokens.css', *(ROOT/'components').glob('*.css'), ROOT/'operations/operations.css']
css = '\n'.join(path.read_text(encoding='utf-8-sig') for path in styles)
definitions = set(re.findall(r'(--[\w-]+)\s*:', css))
required = set(re.findall(r'var\(\s*(--[\w-]+)\s*\)', css))
# Single-letter properties are per-instance values in the expressive specimens.
unresolved = {name for name in required - definitions if len(name) > 3}
if unresolved:
    errors.append('Undefined CSS variables: ' + ', '.join(sorted(unresolved)))
if errors: raise SystemExit('\n'.join(errors))
print(f'Validated {len(data["components"])} previews, local HTML links, asset XML, manifest and documentation paths.')
