import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

if api_key:
    genai.configure(api_key=api_key)
else:
    print("Gemeni API Key is missing.")

MODEL_NAME = 'models/gemini-2.5-pro'

def identify_relevant_files(user_question: str, file_structure: list ):
    """
    Step 1: Ask AI which files look relevant based on there names.
    Returns a list of file paths.
    """
    # Create a simple string list of all files
    all_paths = [f['path'] for f in file_structure]
    paths_text = "\n".join(all_paths)

    prompt = f"""
                You are an expert developer. The user has a question about a codebase.
                Below is the list of all files in the project.
                
                User Question: "{user_question}"
                
                Task: Identify up to 5 files that are most likely to contain the answer.
                Return ONLY the file paths as a Python list of strings. Do not explain.
                If no files seem relevant, return an empty list.
                
                File List:
                {paths_text}
            """
    
    try:
        model = genai.GenerativeModel(MODEL_NAME)
        response = model.generate_content(prompt)

        # Clean up the response to get just the list string
        text = response.text.strip()
        if "```" in text:
            text = text.replace("```json", "").replace("```python", "").replace("```", "")

        import ast
        relevant_files = ast.literal_eval(text)

        if isinstance(relevant_files, list):
            return relevant_files[:5]
        
        return []
    
    except Exception as e:
        print(f"Error identifying files: {e}")
        return []