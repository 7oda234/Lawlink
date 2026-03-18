import pathlib

root = pathlib.Path('pages')
changes = []
for p in root.rglob('*.jsx'):
    rel = p.relative_to(root)
    if len(rel.parts) == 1:
        continue
    text = p.read_text(encoding='utf-8')
    new_text = text
    new_text = new_text.replace("import Navbar from '../components/Navbar';", "import Navbar from '../../components/Navbar';")
    new_text = new_text.replace("import Footer from '../components/Footer';", "import Footer from '../../components/Footer';")
    new_text = new_text.replace("import LawyerCard from '../components/LawyerCard';", "import LawyerCard from '../../components/LawyerCard';")
    if new_text != text:
        p.write_text(new_text, encoding='utf-8')
        changes.append(str(p))

print('updated files:', len(changes))
for c in changes:
    print(c)
