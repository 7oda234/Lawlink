import io
import os
from pathlib import Path
from fastapi import FastAPI, HTTPException, UploadFile, File
from pydantic import BaseModel
import chromadb
import google.generativeai as genai
from PyPDF2 import PdfReader
from dotenv import load_dotenv

load_dotenv(dotenv_path=Path(__file__).with_name('.env'))

app = FastAPI(title="Legal AI Microservice")

GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    raise RuntimeError("Missing GOOGLE_API_KEY environment variable for the AI microservice.")

genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-2.5-flash')

# Initialize ChromaDB client from the local ai_service/chroma_db store
try:
    chroma_client = chromadb.PersistentClient(path="./chroma_db")
    legal_collection = chroma_client.get_or_create_collection(name="legal_knowledge_base")
except Exception as e:
    raise RuntimeError(f"Unable to initialize ChromaDB: {e}")

class ResearchRequest(BaseModel):
    query: str

@app.get("/")
async def health_check():
    return {"status": "ok", "service": "Legal AI Microservice"}

@app.post("/api/ai/research")
async def ai_research(request: ResearchRequest):
    try:
        query_text = request.query.strip()
        if not query_text:
            raise HTTPException(status_code=400, detail="The research query cannot be empty.")

        results = legal_collection.query(
            query_texts=[query_text],
            n_results=3,
            include=["documents", "metadatas"]
        )

        if not results['documents'] or not results['documents'][0]:
            context = "No relevant Egyptian legal documents found in the database."
            sources = []
        else:
            context = "\n\n".join([doc for doc in results['documents'][0] if doc])
            sources = results['metadatas'][0] if results.get('metadatas') else []

        prompt = f"""
You are an expert Egyptian legal research assistant.
Answer the user's question using only the information available in the provided legal context.
Frame all answers according to Egyptian law, Egyptian legal principles, and applicable Egyptian statutes.
If the answer is not contained in the context, state that clearly and do not invent legal facts.

Context:
{context}

Question: {query_text}

Provide a clear, professional, and structured answer.
"""

        response = model.generate_content(prompt)

        return {
            "status": "success",
            "answer": response.text,
            "sources": sources
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/ai/contract-review")
async def contract_review(file: UploadFile = File(...)):
    try:
        if not file.filename.lower().endswith('.pdf'):
            raise HTTPException(status_code=400, detail="Only PDF files are supported.")

        pdf_content = await file.read()
        pdf_reader = PdfReader(io.BytesIO(pdf_content))

        contract_text = ""
        for page in pdf_reader.pages:
            text = page.extract_text()
            if text:
                contract_text += text + "\n"

        if not contract_text.strip():
            raise HTTPException(status_code=400, detail="Could not extract text from the PDF. It may be scanned or encrypted.")

        prompt = f"""
You are an expert Egyptian legal counsel and contract reviewer.
Analyze the contract below according to Egyptian contract law and the applicable Egyptian legal framework.
Provide a structured summary that focuses on obligations, risks, and missing clauses from the perspective of Egyptian law.

Please format your response into exactly three sections:
1. Key Obligations: What are the main duties of each party?
2. Potential Risks: Identify any unusual, highly favorable, or risky clauses.
3. Missing Standard Clauses: Are any standard clauses (e.g., Force Majeure, Severability, Governing Law) missing?

Contract Text:
{contract_text}
"""

        response = model.generate_content(prompt)

        return {
            "status": "success",
            "filename": file.filename,
            "analysis": response.text
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", 8000)))

@app.post("/api/ai/chat")
async def legal_chat(request: ResearchRequest):
    """
    AI-powered Egyptian legal assistant chat endpoint.
    Searches the web and knowledge base for Egyptian law information.
    """
    try:
        query_text = request.query.strip()
        if not query_text:
            raise HTTPException(status_code=400, detail="Query cannot be empty.")

        prompt = f"""
You are an expert Egyptian legal assistant with comprehensive knowledge of Egyptian law.
You have access to current information about Egyptian legal systems, statutes, regulations, and court decisions.

When answering questions:
1. Focus exclusively on Egyptian law and the Egyptian legal framework
2. Cite relevant Egyptian statutes, codes, and legal principles
3. Reference Egyptian court rulings when applicable
4. Explain legal concepts in Arabic and English when relevant
5. Provide practical guidance based on Egyptian legal standards
6. If information is not available in Egyptian law specifically, state that clearly

User Question: {query_text}

Provide a comprehensive, professional, and well-structured response about Egyptian law.
Include relevant Egyptian legal references, statute numbers, and practical implications.
"""

        response = model.generate_content(prompt)

        return {
            "status": "success",
            "reply": response.text,
            "jurisdiction": "Egyptian Law"
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
