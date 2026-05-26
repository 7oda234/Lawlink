import os
import google.generativeai as genai
from dotenv import load_dotenv

# تحميل المفتاح من ملف .env
load_dotenv()
api_key = os.environ.get("GOOGLE_API_KEY")

if not api_key:
    print("❌ مفتاح الـ API مش موجود!")
else:
    genai.configure(api_key=api_key)
    print("✅ الموديلات المتاحة لمفتاحك للرد على النصوص هي:")
    print("-" * 50)
    
    # استخراج وطباعة الموديلات المدعومة
    try:
        for m in genai.list_models():
            if 'generateContent' in m.supported_generation_methods:
                print(m.name)
    except Exception as e:
        print(f"❌ حصل خطأ أثناء جلب الموديلات: {e}")
