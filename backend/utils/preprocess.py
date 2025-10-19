import re

def clean_text(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r"http\S+", " ", text)        # remove URLs
    text = re.sub(r"[^a-z0-9\s]", " ", text)    # keep only letters & numbers
    text = re.sub(r"\s+", " ", text)            # normalize spaces
    return text
