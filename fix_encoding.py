with open('e:/kaisb/descarga/js/app.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

replacements = [
    # Vowels lowercase
    ('Ã¡', 'á'), ('Ã©', 'é'), ('Ã­', 'í'), ('Ã³', 'ó'), ('Ãº', 'ú'),
    ('Ã\x81', 'Á'), ('Ã\x89', 'É'), ('Ã\x8d', 'Í'), ('Ã\x93', 'Ó'), ('Ã\x9a', 'Ú'),
    ('Ã±', 'ñ'), ('Ã\x91', 'Ñ'),
    ('Ã¼', 'ü'), ('Ã\x9c', 'Ü'),
    ('Â¿', '¿'), ('Â¡', '¡'),
    ('Â·', '·'), ('Â»', '»'), ('Â«', '«'),
    ('â€™', "'"), ('â€œ', '"'), ('â€\x9d', '"'), ('â€"', '—'), ('â€"', '–'),
    ('Ã€', 'À'), ('Ã‡', 'Ç'), ('Ã§', 'ç'),
    ('Ã ', 'à'), ('Ã¨', 'è'), ('Ã¬', 'ì'), ('Ã²', 'ò'), ('Ã¹', 'ù'),
]

total = 0
for bad, good in replacements:
    count = text.count(bad)
    if count > 0:
        text = text.replace(bad, good)
        total += count
        print(f'  {repr(bad)} -> {good!r}  x{count}')

with open('e:/kaisb/descarga/js/app.jsx', 'w', encoding='utf-8') as f:
    f.write(text)

print(f'\nDone. {total} replacements total.')
