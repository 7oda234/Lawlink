from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class LegalQuery(BaseModel):
    text: str

@app.post("/analyze")
async def analyze_legal_text(query: LegalQuery):
    # This is where your AI logic goes (e.g., summarization or analysis)
    # You'd call OpenAI or your local model here
    ai_response = f"Analyzed: {query.text[:50]}..." 
    return {"advice": ai_response}
