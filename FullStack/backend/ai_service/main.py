import io
import os
from pathlib import Path
from fastapi import FastAPI, HTTPException, UploadFile, File
from pydantic import BaseModel
import chromadb
import google.generativeai as genai
from PyPDF2 import PdfReader
from dotenv import load_dotenv

# بنحمل ملف الـ .env عشان نقرأ مفتاح الـ API
load_dotenv(dotenv_path=Path(__file__).with_name('.env'))

# بنبدأ تطبيق الـ FastAPI بتاعنا
app = FastAPI(title="Legal AI Microservice")

# بنجيب مفتاح جوجل من البيئة المحيطة
GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    raise RuntimeError("يا ريس نسيت تحط الـ API KEY في ملف الـ .env")

# بنعرف جوجل بالـ مفتاح بتاعنا عشان نقدر نستخدم Gemini
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('models/gemini-2.5-flash')

# بنشغل قاعدة بيانات ChromaDB عشان البحث القانوني الذكي
try:
    chroma_client = chromadb.PersistentClient(path="./chroma_db")
    legal_collection = chroma_client.get_or_create_collection(name="legal_knowledge_base")
except Exception as e:
    print(f"في مشكلة في قاعدة البيانات بس هنعديها: {e}")

# بنحدد شكل البيانات اللي مستنيينها في طلبات البحث والتوقعات
class ResearchRequest(BaseModel):
    query: str

class PredictionRequest(BaseModel):
    facts: str
    jurisdiction: str

class DraftingRequest(BaseModel):
    documentType: str
    parties: str
    keyTerms: str

# أول طريق: البحث القانوني (RAG)
@app.post("/api/ai/research")
async def ai_research(request: ResearchRequest):
    try:
        query_text = request.query.strip()
        # بنروح ندور في الكتب القانونية اللي عندنا في الداتابيز
        results = legal_collection.query(query_texts=[query_text], n_results=3)
        context = "\n\n".join(results['documents'][0]) if results['documents'] else "ملقيتش حاجة تخص الموضوع ده في الداتابيز."
        
        # بنبعت السؤال مع شوية معلومات قانونية للموديل عشان يجاوب صح
        prompt = f"بصفتك خبير قانوني مصري، استخدم المعلومات دي: {context}\n\nالسؤال: {query_text}\nجاوب بدقة وباحترافية."
        response = model.generate_content(prompt)
        return {"status": "success", "answer": response.text, "sources": results.get('metadatas', [])}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# تاني طريق: مراجعة العقود (PDF)
@app.post("/api/ai/contract-review")
async def contract_review(file: UploadFile = File(...)):
    try:
        # بنقرأ ملف الـ PDF ونطلع الكلام اللي جواه
        pdf_content = await file.read()
        pdf_reader = PdfReader(io.BytesIO(pdf_content))
        contract_text = "".join([page.extract_text() for page in pdf_reader.pages])
        
        # بنخلي الذكاء الاصطناعي يحلل الالتزامات والمخاطر
        prompt = f"راجع العقد ده بالقانون المصري وطلعلي الالتزامات والمخاطر والبنود اللي ناقصة.\n\nنص العقد: {contract_text}"
        response = model.generate_content(prompt)
        return {"status": "success", "analysis": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# تالت طريق: الشات بوت القانوني
@app.post("/api/ai/chat")
async def legal_chat(request: ResearchRequest):
    try:
        # شات سريع للاستفسارات العامة
        prompt = f"خليك مساعد قانوني مصري شاطر، رد على ده: {request.query}"
        response = model.generate_content(prompt)
        return {"status": "success", "reply": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# رابع طريق: توقع نتيجة القضية
@app.post("/api/ai/predict")
async def predict(request: PredictionRequest):
    try:
        # بنحلل الوقائع عشان نعرف القضية كسبانة ولا لأ
        prompt = f"حلل الوقائع دي في {request.jurisdiction} حسب القانون المصري.\nالوقائع: {request.facts}\nقولي نسبة النجاح والسبب."
        response = model.generate_content(prompt)
        return {"status": "success", "data": {"analysis": response.text}}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# خامس طريق: كتابة مسودات العقود
@app.post("/api/ai/draft")
async def draft_document(request: DraftingRequest):
    try:
        # بنكتب مسودة عقد بناء على النوع والأطراف والشروط
        prompt = f"اكتب مسودة {request.documentType} بالقانون المصري.\nالأطراف: {request.parties}\nالشروط الرئيسية: {request.keyTerms}\nاجعلها احترافية وشاملة."
        response = model.generate_content(prompt)
        return {"status": "success", "data": {"draft": response.text}}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# سادس طريق: إضافة ملفات إلى مخ المعرفة
@app.post("/api/ai/ingest")
async def ingest_file(file: UploadFile = File(...)):
    try:
        filename = file.filename or "uploaded_document.pdf"
        if not filename.lower().endswith('.pdf'):
            raise HTTPException(status_code=400, detail='الملف لازم يكون PDF')

        pdf_content = await file.read()
        pdf_reader = PdfReader(io.BytesIO(pdf_content))

        chunks = []
        for page in pdf_reader.pages:
            page_text = page.extract_text() or ""
            if page_text.strip():
                chunks.extend([page_text[i:i+1000] for i in range(0, len(page_text), 1000)])

        if not chunks:
            raise HTTPException(status_code=400, detail='الـ PDF فاضي أو لم يتم استخراج نص منه')

        ids = [f"{filename}_{i}" for i in range(len(chunks))]
        metadatas = [{"source": filename}] * len(chunks)

        legal_collection.add(
            documents=chunks,
            ids=ids,
            metadatas=metadatas
        )

        return {
            "status": "success",
            "message": "تم إضافة الملف إلى قاعدة المعرفة بنجاح.",
            "added_chunks": len(chunks),
            "source": filename
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    # بنشغل السيرفر على بورت 8000
    uvicorn.run(app, host="0.0.0.0", port=8000)
