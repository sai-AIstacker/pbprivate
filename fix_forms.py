import re

with open('src/index.html', 'r') as f:
    content = f.read()

# I will use a simple regex approach but manually crafted
# Wait, it's easier to just do multi_replace_file_content for the 3 forms.
