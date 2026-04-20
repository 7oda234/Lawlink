import os
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain_chroma import Chroma
from langchain_classic.chains import RetrievalQA

PDF_FILENAME = "Noor-Book.com  مشروع قانون بأصدار قانون الأحوال الشخصية الجديد.pdf"
PERSIST_DIRECTORY = "./chroma_db"

def get_qa_chain():
    embeddings = GoogleGenerativeAIEmbeddings(model="gemini-embedding-2-preview")
    
    if os.path.exists(PERSIST_DIRECTORY):
        vectorstore = Chroma(persist_directory=PERSIST_DIRECTORY, embedding_function=embeddings)
    else:
        loader = PyPDFLoader(PDF_FILENAME)
        splits = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=150).split_documents(loader.load())
        vectorstore = Chroma.from_documents(documents=splits, embedding=embeddings, persist_directory=PERSIST_DIRECTORY)

    llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature=0.2)
    return RetrievalQA.from_chain_type(llm=llm, chain_type="stuff", retriever=vectorstore.as_retriever(search_kwargs={"k": 3}))

qa_chain = get_qa_chain()
