from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import shutil
from contextlib import asynccontextmanager

# Import services
from services.git_service import clone_repository
from services.file_service import get_file_structure

# --- CLEANUP LOGIC ---
TEMP_DIR = os.path.join(os.getcwd(), "temp_repos")

def on_rm_error(func, path, exc_info):
    """
    Error handler for shutil.rmtree.
    If the error is due to an access error (read only file),
    it changes the file to be readable/writable and then attempts removal.
    """
    import stat
    os.chmod(path, stat.S_IWRITE)
    func(path)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # 1. Startup: Clean the temp_repos folder
    if os.path.exists(TEMP_DIR):
        print(f"🧹 Cleaning up temp_repos folder at startup...")
        try:
            shutil.rmtree(TEMP_DIR, onerror=on_rm_error)
            os.makedirs(TEMP_DIR)
            print("✅ Cleanup complete.")
        except Exception as e:
            print(f"⚠️ Warning: Could not clean temp_repos: {e}")
    yield
    # 2. Shutdown: (We can add logic here if needed later)

app = FastAPI(lifespan=lifespan)

# --- MIDDLEWARE ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RepoRequest(BaseModel):
    url: str

@app.get("/")
def read_root():
    return {"message": "Hello from the AI Backend!"}

@app.post("/api/analyze")
def analyze_repo(request: RepoRequest):
    print(f"Received request for: {request.url}")
    
    if "github.com" not in request.url:
        raise HTTPException(status_code=400, detail="Invalid GitHub URL")

    try:
        # 1. Clone the Repo
        local_path = clone_repository(request.url)
        
        # 2. Scan the Files
        files = get_file_structure(local_path)
        
        # 3. Return the result
        return {
            "message": "Analysis complete",
            "repo_url": request.url,
            "total_files": len(files),
            "files": files
        }

    except Exception as e:
        print(f"Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))