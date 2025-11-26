import os
import shutil
import uuid
from git import Repo

# Where we will store the downloaded code
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TEMP_DIR = os.path.join(BASE_DIR, "temp_repos")

def clone_repository(repo_url: str):
    """
    Clones a GitHub repo to a local temporary folder.
    Uses a unique ID to avoid Windows permission/locking issues.
    """
    # Extract the repo name (e.g., "react")
    repo_name_clean = repo_url.split("/")[-1].replace(".git", "")
    
    # Create a UNIQUE folder name (e.g., "react_a1b2c3d4")
    # This ensures we never clash with a locked folder from a previous run
    unique_id = str(uuid.uuid4())[:8]
    repo_folder_name = f"{repo_name_clean}_{unique_id}"
    repo_path = os.path.join(TEMP_DIR, repo_folder_name)

    # Create temp directory if it doesn't exist
    if not os.path.exists(TEMP_DIR):
        os.makedirs(TEMP_DIR)

    print(f"Cloning {repo_url} to unique path: {repo_path}...")
    
    try:
        # We use depth=1 to just get the latest version (faster)
        Repo.clone_from(repo_url, repo_path, depth=1)
        return repo_path
    except Exception as e:
        print(f"Error cloning repo: {e}")
        raise e