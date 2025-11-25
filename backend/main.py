from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

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

@app.get("/api/health")
def health_check():
    return {"status": "healthy"}

# 2. Create the Analysis Endpoint
@app.post("/api/analyze")
def analyze_repo(request: RepoRequest):
    # This is where the magic will happen later
    print(f"Received request for: {request.url}")
    
    if "github.com" not in request.url:
        raise HTTPException(status_code=400, detail="Invalid GitHub URL")

    # For now, just return a success message
    return {
        "message": "Analysis started successfully",
        "repo_url": request.url,
        "status": "processing"
    }
