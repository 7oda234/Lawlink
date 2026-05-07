import os
import io
from PyPDF2 import PdfReader
import chromadb
from dotenv import load_dotenv

# بنحمل الإعدادات عشان نوصل لمفتاح جوجل لو هنحتاج embeddings
load_dotenv()

# بنفتح قاعدة البيانات اللي في نفس الفولدر
chroma_client = chromadb.PersistentClient(path="./chroma_db")
legal_collection = chroma_client.get_or_create_collection(name="legal_knowledge_base")

def add_legal_file_to_brain(file_path):
    """
    دالة بتاخد مسار ملف PDF وبتقطعه وبتضيفه للداتابيز عشان الذكاء الاصطناعي يتعلمه
    """
    if not file_path.endswith('.pdf'):
        print("يا ريس الملف لازم يكون PDF")
        return

    # بنقرأ الكلام اللي جوه الملف
    reader = PdfReader(file_path)
    text = ""
    for page in reader.pages:
        content = page.extract_text()
        if content:
            text += content + "\n"
    
    # بنقطع النص لحتت (Chunks) كل حتة 1000 حرف
    # ده بيساعد الـ AI إنه يلاقي المعلومة بدقة
    chunks = [text[i:i+1000] for i in range(0, len(text), 1000)]
    
    # بنعمل أرقام تعريفية (IDs) لكل حتة
    ids = [f"{os.path.basename(file_path)}_{i}" for i in range(len(chunks))]
    
    # بنضيف البيانات للمجموعة القانونية
    legal_collection.add(
        documents=chunks,
        ids=ids,
        metadatas=[{"source": os.path.basename(file_path)}] * len(chunks)
    )
    print(f"تم إضافة {len(chunks)} فقرة من ملف {os.path.basename(file_path)} لمخ السيستم بنجاح!")

# مثال للاستخدام (شيل الكومنت وشغله):
# add_legal_file_to_brain("قانون_العمل_المصري.pdf")
