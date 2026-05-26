import io  # بنستورد مكتبة io عشان نتعامل مع الملفات في الميموري (الرام)
import os  # بنستورد os عشان نقرأ متغيرات البيئة زي المفاتيح السرية
from pathlib import Path  # بنستورد Path عشان نظبط مسارات الملفات
from fastapi import FastAPI, HTTPException, UploadFile, File  # بنستورد أدوات FastAPI الأساسية للسيرفر
from pydantic import BaseModel  # بنستورد BaseModel عشان نحدد شكل الداتا اللي جاية
import chromadb  # بنستورد ChromaDB عشان قاعدة البيانات الذكية
import google.generativeai as genai  # بنستورد مكتبة جوجل للذكاء الاصطناعي
from PyPDF2 import PdfReader  # بنستورد مكتبة قراءة ملفات الـ PDF
from dotenv import load_dotenv  # بنستورد الأداة اللي بتقرأ ملف الـ .env
from google.generativeai.types import HarmCategory, HarmBlockThreshold  # بنستورد فلاتر الأمان عشان نقفلها

# بنحمل الإعدادات من ملف الـ .env
load_dotenv(dotenv_path=Path(__file__).with_name('.env'))

# بنعمل إنستنس من السيرفر
app = FastAPI(title="Legal AI Microservice")

# بنجيب مفتاح جوجل السري
GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    # لو مفيش مفتاح بنوقف السيرفر
    raise RuntimeError("يا ريس نسيت تحط الـ GOOGLE_API_KEY في ملف الـ .env")

# بنفعل المفتاح في مكتبة جوجل
genai.configure(api_key=GOOGLE_API_KEY)

# دالة توليد النصوص وإيقاف الفلاتر
def generate_content_with_fallback(prompt: str) -> str:
    # 🚀 التعديل السحري هنا: حطينا الموديلات الجديدة اللي مفتاحك بيدعمها فعلياً من السكريبت
    models_to_try = [
        'gemini-2.5-flash',      # موديل سريع جداً وممتاز
        'gemini-2.5-pro',        # موديل قوي جداً للمهام المعقدة
        'gemini-pro-latest'      # موديل احتياطي (Fallback) دايماً بيشاور على أحدث حاجة
    ]
    last_error = None
    
    # بنقفل فلاتر الأمان عشان جوجل ميقفلش الطلب بسبب المصطلحات القانونية
    safety_settings = {
        HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_NONE,
        HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_NONE,
        HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: HarmBlockThreshold.BLOCK_NONE,
        HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_NONE,
    }
    
    # بنجرب الموديلز واحد ورا التاني
    for model_name in models_to_try:
        try:
            # بنجهز الموديل
            model = genai.GenerativeModel(model_name)
            # بنبعت الطلب مع إعدادات الأمان
            response = model.generate_content(prompt, safety_settings=safety_settings)
            
            # بنتأكد إن في نص رجع
            if response.candidates and response.candidates[0].content.parts:
                return response.text
            else:
                raise ValueError("لم يتم استلام نص من الموديل.")
                
        except Exception as e:
            # بنطبع الإيرور من غير رموز عشان الـ Encoding بتاع التيرمينال ميضربش
            print(f"Warning: Model {model_name} failed: {e}")
            last_error = str(e)
            continue 
            
    # لو كل الموديلات فشلت، بنرمي الإيرور للواجهة
    raise RuntimeError(f"فشلت جميع موديلات الذكاء. السبب: {last_error}")

# تشغيل قاعدة البيانات
try:
    chroma_client = chromadb.PersistentClient(path="./chroma_db")
    legal_collection = chroma_client.get_or_create_collection(name="legal_knowledge_base")
except Exception:
    legal_collection = None 

# تعريف أشكال الداتا
class ResearchRequest(BaseModel):
    query: str

class PredictionRequest(BaseModel):
    facts: str
    jurisdiction: str

class DraftingRequest(BaseModel):
    documentType: str
    parties: str
    keyTerms: str

# مسار البحث
@app.post("/api/ai/research")
async def ai_research(request: ResearchRequest):
    try:
        query_text = request.query.strip()
        context = "لا توجد معلومات كافية."
        sources = []
        if legal_collection:
            results = legal_collection.query(query_texts=[query_text], n_results=3)
            if results['documents'] and results['documents'][0]:
                context = "\n\n".join(results['documents'][0])
                sources = results.get('metadatas', [])[0]
        
        prompt = f"بصفتك خبير قانوني مصري، استخدم السياق التالي: {context}\n\nالسؤال: {query_text}\nجاوب بدقة."
        return {"status": "success", "answer": generate_content_with_fallback(prompt), "sources": sources}
    except Exception:
        return {"status": "success", "answer": "تعذر تشغيل الذكاء الاصطناعي.", "sources": []}

# مسار مراجعة العقود
@app.post("/api/ai/contract-review")
async def contract_review(file: UploadFile = File(...)):
    try:
        pdf_content = await file.read()
        pdf_reader = PdfReader(io.BytesIO(pdf_content))
        contract_text = "".join([page.extract_text() or "" for page in pdf_reader.pages])
        if not contract_text.strip():
            raise HTTPException(status_code=400, detail='الملف فارغ.')
        prompt = f"راجع العقد ده بالقانون المصري وطلعلي الالتزامات والمخاطر.\n\nنص العقد: {contract_text}"
        return {"status": "success", "analysis": generate_content_with_fallback(prompt)}
    except Exception as e:
        # بنرمي الإيرور للواجهة
        raise HTTPException(status_code=500, detail=str(e))

# مسار الشات
@app.post("/api/ai/chat")
async def legal_chat(request: ResearchRequest):
    try:
        prompt = f"أنت مساعد قانوني مصري في LawLink. رد على: {request.query}"
        return {"status": "success", "reply": generate_content_with_fallback(prompt)}
    except Exception as e:
        # بنرمي الإيرور للواجهة
        raise HTTPException(status_code=500, detail=str(e))

# مسار التوقع
@app.post("/api/ai/predict")
async def predict(request: PredictionRequest):
    try:
        prompt = f"حلل الوقائع دي في {request.jurisdiction} حسب القانون المصري.\nالوقائع: {request.facts}\nتوقع النسبة."
        # غيرنا المفتاح لـ 'reasoning' عشان يتطابق مع اللي الفرونت إند مستنيه
        return {"status": "success", "reasoning": generate_content_with_fallback(prompt)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# مسار الصياغة
@app.post("/api/ai/draft")
async def draft_document(request: DraftingRequest):
    try:
        print(f"Incoming Draft Request: {request.model_dump()}") 
        prompt = f"اكتب مسودة {request.documentType} بالقانون المصري.\nالأطراف: {request.parties}\nالشروط: {request.keyTerms}."
        
        # 🚀 التعديل السحري هنا: شلنا الـ "data": {} الزيادة عشان الريأكت يستلم العقد مباشرة
        return {"status": "success", "draft": generate_content_with_fallback(prompt)}
    except Exception as e:
        print(f"Error in Draft Route: {str(e)}") 
        raise HTTPException(status_code=500, detail=str(e))

# مسار رفع الملفات للداتابيز
@app.post("/api/ai/ingest")
async def ingest_file(file: UploadFile = File(...)):
    try:
        if not legal_collection:
            raise HTTPException(status_code=500, detail="قاعدة بيانات ChromaDB غير متصلة.")
            
        filename = file.filename
        pdf_content = await file.read()
        pdf_reader = PdfReader(io.BytesIO(pdf_content))
        chunks = []
        for page in pdf_reader.pages:
            page_text = page.extract_text() or ""
            if page_text.strip():
                chunks.extend([page_text[i:i+1000] for i in range(0, len(page_text), 1000)])
        ids = [f"{filename}_{i}" for i in range(len(chunks))]
        metadatas = [{"source": filename}] * len(chunks)
        legal_collection.add(documents=chunks, ids=ids, metadatas=metadatas)
        return {"status": "success", "message": f"تم تزويد مخ البوت بـ {len(chunks)} معلومة جديدة."}
    except Exception as e:
        # بنرمي الإيرور للواجهة
        raise HTTPException(status_code=500, detail=str(e))

# نقطة البداية
if __name__ == "__main__":
    import uvicorn
    # تشغيل السيرفر
    uvicorn.run(app, host="0.0.0.0", port=8000)
