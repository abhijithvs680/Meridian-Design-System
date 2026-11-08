from pathlib import Path
import zipfile, hashlib, json
ROOT=Path(__file__).resolve().parents[1]
version=json.loads((ROOT/'package.json').read_text(encoding='utf-8'))['version']
dest=ROOT/'releases'/f'meridian-design-system-{version}.zip'
dest.parent.mkdir(exist_ok=True)
with zipfile.ZipFile(dest,'w',zipfile.ZIP_DEFLATED) as archive:
    for path in sorted(ROOT.rglob('*')):
        if path.is_file() and not any(p in {'releases','.git','node_modules','__pycache__','test-results'} for p in path.relative_to(ROOT).parts):
            archive.write(path,'meridian-design-system/'+path.relative_to(ROOT).as_posix())
digest=hashlib.sha256(dest.read_bytes()).hexdigest()
(dest.parent/'SHA256SUMS.txt').write_text(digest+'  '+dest.name+'\n',encoding='utf-8')
print(f'{dest}\n{dest.stat().st_size:,} bytes\nSHA-256: {digest}')
