import os
import shutil
from git import Repo

# Where we will store the downloaded code
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TEMP_DIR = os.path.join(BASE_DIR, "temp_repos")

def clone_repository(repo_url: str):
    """
    Clones a GitHub repo to a local temporary folder.
    Returns the path to the local folder.
    """

    repo_name = repo_url.split("/")[-1].replace(".git", "")
    repo_path = os.path.join(TEMP_DIR, repo_name)

    # Clean up if it alreasy exists (fresh start
    if os.path.exists(repo_path):
        shutil.rmtree(repo_path)

    # Create temp directory if it doesnot exits
    if not os.path.exists(TEMP_DIR):
        os.makedirs(TEMP_DIR)

    print(f"Clonning {repo_url} to {repo_path}...")

    # We use depth=1 to just get the latest version (faster)
    Repo.clone_from(repo_url, repo_path, depth=1)

    return repo_path