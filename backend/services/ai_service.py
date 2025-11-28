import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load key from .env file
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

# Configure Gemini
if api_key:
    genai.configure(api_key = api_key)

def summarize_code(file_name: str, code_content: str):
    """
    Send code to Gemini and asks for a summary.
    """
    if not api_key:
        return "Error: API key not found. Please set GEMINI_API_KEY in .env file."
    
    # If code is too huge, truncate it to save tokens
    if len(code_content) > 10000:
        code_content = code_content[:10000] + "\n...(truncated)..."

    prompt = f"""
    You are an expert developer. Explain what this code file ({file_name}) does in ONE simple, clear sentence.
    Focus on its purpose in the project. Do not mention imports unless necessary.

    Code:
    {code_content}
    """

    try: 
        model = genai.GenerativeModel('models/gemini-2.5-pro')
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"AI Error: {str(e)}"
