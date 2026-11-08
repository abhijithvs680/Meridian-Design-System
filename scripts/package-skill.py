"""Package the portable skill with a versioned snapshot of Meridian."""

import hashlib
import json
from pathlib import Path
import re
from urllib.parse import unquote
from zipfile import ZIP_DEFLATED, ZipFile


ROOT = Path(__file__).resolve().parents[1]
NAME = "meridian-design-system"
SOURCE = ROOT / "skills" / NAME
VERSION = json.loads((ROOT / "package.json").read_text(encoding="utf-8"))["version"]
RELEASES = ROOT / "releases"
DESTINATION = RELEASES / f"{NAME}-skill-{VERSION}.zip"
EXPANDED = RELEASES / "skills" / VERSION

BUNDLE_DIRECTORIES = (
    "api", "assets", "catalog", "components", "docs",
    "marketing", "openui", "operations", "patterns",
)
BUNDLE_TYPES = {".css", ".html", ".js", ".json", ".md", ".mjs", ".mts", ".svg", ".ts", ".tsx", ".txt"}


def bundle_files():
    for name in ("index.html", "README.md", "tokens.css", "tokens.json", "DESIGN.md", "design-system.json", "package.json"):
        yield ROOT / name
    yield from sorted(ROOT.glob("[0-9][0-9]-*.md"))
    for directory in BUNDLE_DIRECTORIES:
        for path in sorted((ROOT / directory).rglob("*")):
            relative = path.relative_to(ROOT)
            if path.is_file() and not path.is_symlink() and path.suffix in BUNDLE_TYPES:
                if not any(part.startswith(".") for part in relative.parts):
                    yield path


def package():
    bundle = f"{NAME}/assets/meridian"
    catalog = json.loads((ROOT / "catalog/data.json").read_text(encoding="utf-8"))
    if catalog["version"] != VERSION:
        raise SystemExit("Catalog version is stale. Run npm run build first.")
    RELEASES.mkdir(exist_ok=True)
    with ZipFile(DESTINATION, "w", ZIP_DEFLATED) as archive:
        for path in sorted(SOURCE.rglob("*.md")):
            archive.write(path, f"{NAME}/{path.relative_to(SOURCE).as_posix()}")
        for path in bundle_files():
            archive.write(path, f"{bundle}/{path.relative_to(ROOT).as_posix()}")

    with ZipFile(DESTINATION) as archive:
        entries = set(archive.namelist())
        for item in catalog["components"] + catalog["patterns"] + catalog["assets"]:
            if f"{bundle}/{item['path']}" not in entries:
                raise SystemExit(f"Missing catalog resource: {item['path']}")
        if archive.testzip():
            raise SystemExit("Skill archive failed its integrity check.")
        archive.extractall(EXPANDED)

    skill = EXPANDED / NAME
    for doc in [skill / "SKILL.md", *skill.glob("references/*.md")]:
        for link in re.findall(r"\]\(([^)]+)\)", doc.read_text(encoding="utf-8")):
            if not (doc.parent / unquote(link.split("#", 1)[0])).exists():
                raise SystemExit(f"Missing reference in {doc.name}: {link}")

    print(f"{DESTINATION}\nExpanded skill: {skill}\nSHA-256: {hashlib.sha256(DESTINATION.read_bytes()).hexdigest()}")


if __name__ == "__main__":
    package()
