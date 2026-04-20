from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from .database import get_db, engine
from .ai_service import qa_chain
from . import models

# Create SQL tables if they don't exist
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="LawLink Professional Backend")

@app.get("/ask")
async def ask_lawlink(query: str, db: Session = Depends(get_db)):
    try:
        # 1. Get Answer from AI Service
        result = qa_chain.invoke({"query": query})
        answer = result["result"]

        # 2. Log to MySQL (ai_tools table)
        new_log = models.AIToolLog(user_id=8, input_text=query, response_text=answer)
        db.add(new_log)
        db.commit()

        return {"answer": answer}
    except Exception as e:
        raise HTTPException(status_code=503, detail=str(e))
