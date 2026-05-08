import io  # بنستخدمها عشان نتعامل مع الملفات في الرام من غير ما نسيفها
import os  # عشان نقدر نوصل لملفات النظام والبيئة زي الـ API Key
from pathlib import Path  # عشان نحدد مسار الملفات بدقة
from fastapi import FastAPI, HTTPException, UploadFile, File  # أساسيات سيرفر الـ API بتاعنا
from pydantic import BaseModel  # عشان نحدد شكل الداتا اللي جاية في الطلبات (Requests)
import chromadb  # داتابيز ذكية بتخزن النصوص كأرقام عشان البحث السريع (Vector DB)
import google.generativeai as genai  # المكتبة الرسمية لموديل Gemini بتاع جوجل
from PyPDF2 import PdfReader  # عشان نقرأ ونستخرج الكلام من ملفات الـ PDF
from dotenv import load_dotenv  # عشان نسحب البيانات السرية من ملف الـ .env

# بنحمل الإعدادات من ملف الـ .env اللي جنب الملف ده
load_dotenv(dotenv_path=Path(__file__).with_name('.env'))

# بننشئ السيرفر بتاعنا وبنديله اسم شيك للمشروع
app = FastAPI(title="Legal AI Microservice")

# بنجيب مفتاح جوجل من البيئة المحيطة عشان نشغل الذكاء الاصطناعي
GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    # لو نسيت المفتاح السيرفر مش هيقوم وهيطلعلك الرسالة دي
    raise RuntimeError("يا ريس نسيت تحط الـ GOOGLE_API_KEY في ملف الـ .env")

# بنعرف جوجل بالمفتاح بتاعنا وبنجهز الموديل
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')  # بنستخدم نسخة Flash عشان سريعة وموفرة

# بنشغل قاعدة بيانات ChromaDB عشان البحث القانوني الذكي (RAG)
try:
    chroma_client = chromadb.PersistentClient(path="./chroma_db")  # بنحدد مكان تخزين الداتابيز
    legal_collection = chroma_client.get_or_create_collection(name="legal_knowledge_base")  # بنعمل جدول للقوانين
except Exception as e:
    print(f"في مشكلة في قاعدة البيانات بس هنعديها: {e}")

# بنحدد شكل البيانات اللي مستنيينها في كل طلب (Schemas)
class ResearchRequest(BaseModel):
    query: str  # السؤال اللي المستخدم بيبعته

class PredictionRequest(BaseModel):
    facts: str  # وقائع القضية
    jurisdiction: str  # المنطقة القانونية أو المحكمة

class DraftingRequest(BaseModel):
    documentType: str  # نوع العقد
    parties: str  # أطراف العقد
    keyTerms: str  # الشروط الأساسية

# 1. طريق البحث القانوني (RAG): بيدور في الكتب قبل ما يجاوب
@app.post("/api/ai/research")
async def ai_research(request: ResearchRequest):
    try:
        query_text = request.query.strip()  # بننظف السؤال من أي مسافات زيادة
        results = legal_collection.query(query_texts=[query_text], n_results=3)  # بنبص بصه في الداتابيز بتاعتنا
        context = "\n\n".join(results['documents'][0]) if results['documents'] else "ملقيتش معلومات كافية."
        
        # بنجهز "البرومبت" اللي بنبعته لـ Gemini مع المعلومات اللي لقيناها
        prompt = f"بصفتك خبير قانوني مصري، استخدم السياق التالي: {context}\n\nالسؤال: {query_text}\nجاوب بدقة."
        response = model.generate_content(prompt)  # بنخلي الذكاء الاصطناعي يولد الرد
        return {"status": "success", "answer": response.text, "sources": results.get('metadatas', [])}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 2. طريق مراجعة العقود: بيحلل ملفات الـ PDF ويطلع المخاطر
@app.post("/api/ai/contract-review")
async def contract_review(file: UploadFile = File(...)):
    try:
        pdf_content = await file.read()  # بنقرأ الملف اللي ارفع
        pdf_reader = PdfReader(io.BytesIO(pdf_content))  # بنفتحه كملف PDF
        contract_text = "".join([page.extract_text() or "" for page in pdf_reader.pages])  # بنلم كل الكلام اللي فيه

        if not contract_text.strip():
            raise HTTPException(status_code=400, detail='الملف PDF مطلعش منه نص.')
        
        # بنطلب من Gemini يراجع العقد ويشوف إيه اللي ناقص أو خطر
        prompt = f"راجع العقد ده بالقانون المصري وطلعلي الالتزامات والمخاطر.\n\nنص العقد: {contract_text}"
        response = model.generate_content(prompt)
        return {"status": "success", "analysis": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 3. طريق الشات القانوني: دردشة سريعة في القانون
@app.post("/api/ai/chat")
async def legal_chat(request: ResearchRequest):
    try:
        prompt = f"أنت مساعد قانوني مصري في LawLink. رد على ده: {request.query}"
        response = model.generate_content(prompt)
        return {"status": "success", "reply": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 4. طريق خدمة العملاء: شات تقني للمساعدة في التطبيق (مش قانوني)
@app.post("/api/ai/customer-support")
async def customer_support(request: ResearchRequest):
    try:
        # بنحدد للبوت شخصيته إنه موظف دعم فني بس
        support_context = """
        أنت موظف خدمة عملاء في تطبيق LawLink. مهمتك الدعم التقني فقط.
        - لو سأل قانوني قوله: روح لقسم المستشار القانوني.
        - لغة الحوار: مصرية عامية شيك.
        """
        prompt = f"{support_context}\n\nسؤال المستخدم: {request.query}"
        response = model.generate_content(prompt)
        return {"status": "success", "answer": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 5. طريق توقع النتيجة: بيحلل فرص كسب القضية
@app.post("/api/ai/predict")
async def predict(request: PredictionRequest):
    try:
        prompt = f"حلل الوقائع دي في {request.jurisdiction} حسب القانون المصري.\nالوقائع: {request.facts}\nتوقع النسبة."
        response = model.generate_content(prompt)
        return {"status": "success", "data": {"analysis": response.text}}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 6. طريق كتابة العقود: بيعمل مسودة عقد من الصفر
@app.post("/api/ai/draft")
async def draft_document(request: DraftingRequest):
    try:
        prompt = f"اكتب مسودة {request.documentType} بالقانون المصري.\nالأطراف: {request.parties}\nالشروط: {request.keyTerms}."
        response = model.generate_content(prompt)
        return {"status": "success", "data": {"draft": response.text}}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 7. طريق الإضافة للداتابيز: عشان نزود معلومات البوت القانونية من ملفات PDF
@app.post("/api/ai/ingest")
async def ingest_file(file: UploadFile = File(...)):
    try:
        filename = file.filename
        pdf_content = await file.read()
        pdf_reader = PdfReader(io.BytesIO(pdf_content))

        chunks = []  # هنقسم الكلام لقطع صغيرة (Chunks)
        for page in pdf_reader.pages:
            page_text = page.extract_text() or ""
            if page_text.strip():
                # بنقطع النص كل 1000 حرف عشان الداتابيز تفهمه أحسن
                chunks.extend([page_text[i:i+1000] for i in range(0, len(page_text), 1000)])

        ids = [f"{filename}_{i}" for i in range(len(chunks))]  # بنعمل رقم تعريفي لكل قطعة
        metadatas = [{"source": filename}] * len(chunks)  # بنسجل اسم الملف الأصلي كمصدر

        # بنضيف البيانات للداتابيز الذكية (ChromaDB)
        legal_collection.add(documents=chunks, ids=ids, metadatas=metadatas)
        return {"status": "success", "message": f"تم تزويد مخ البوت بـ {len(chunks)} معلومة جديدة."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# بنشغل السيرفر ونخليه يسمع على بورت 8000
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
