import os

# Folders we dont care about
IGNORE_DIRS = {
    "node_modules", "venv", ".git", "__pycache__", "dist", "build", ".idea", ".vscode"
}

# Files we dont care about
IGNORE_EXTENSIONS = {
    ".png", ".jpg", ".jpeg", ".gif", ".svg", ".ico", ".json", ".lock", ".md", ".txt"
}

def get_file_structure(root_path: str):
    """
    Walks through the directory and returns a list of code files.
    """ 

    file_list = []

    for root, dirs, files in os.walk(root_path):
        # 1 Filter out ignored directories in-place
        dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]

        for file in files:
            # 2 Filter out ignored extensions
            if any(file.endswith(ext) for ext in IGNORE_EXTENSIONS):
                continue

            # 3 Create a clean path string
            full_path = os.path.join(root, file)
            relative_path = os.path.relpath(full_path, root_path)

            file_list.append({
                "name" : file,
                "path": relative_path,
                "type": "file"
            })
            
    return file_list