import os
import re

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
FRONTEND = os.path.join(ROOT, 'frontend')


def find_jsx_files(base_dir):
    jsx_files = []
    for dirpath, _, filenames in os.walk(base_dir):
        for file in filenames:
            if file.endswith('.jsx'):
                jsx_files.append(os.path.join(dirpath, file))
    return jsx_files


def has_default_export(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    return bool(re.search(r'export\s+default\s+', content))


def main():
    jsx_files = find_jsx_files(FRONTEND)
    print(f'Found {len(jsx_files)} JSX files.')

    missing = []
    for file in jsx_files:
        if not has_default_export(file):
            missing.append(file)

    if missing:
        print('The following JSX files do not have a default export:')
        for file in missing:
            print(f'  - {file}')
        raise SystemExit(1)

    print('All JSX files have default exports.')


if __name__ == '__main__':
    main()
