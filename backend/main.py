from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import shutil

# Import our services
from services.git_service import clone_repository
from services.file_service import get_file_structure

app = FastAPI()

# Enable CORS (Allows React to talk to Python)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 1. Define the Data Model
# This acts as a contract. We expect a JSON body looking like: { "url": "..." }
class RepoRequest(BaseModel):
    url: str

@app.get("/")
def read_root():
    return {"message": "Hello from the AI Backend!"}

# @app.get("/api/health")
# def health_check():
#     return {"status": "healthy"}

# 2. Create the Analysis Endpoint
@app.post("/api/analyze")
def analyze_repo(request: RepoRequest):
    print(f"Received request for: {request.url}")
    
    if "github.com" not in request.url:
        raise HTTPException(status_code=400, detail="Invalid GitHub URL")

    try:
        # 1 Clone the repo
        local_path = clone_repository(request.url)

        # 2 Scan the files
        files = get_file_structure(local_path)

        # 3 Retrun the result
        return {
            "message": "Analysis complete",
            "repo_url": request.url,
            "total_files": len(files),
            "files": files   #Sending the list of files to frontend
        }
    except Exception as e:
        print(f"Error: {str(e)}")
        raise HTTPException(status_code = 500, detail = str(e))
