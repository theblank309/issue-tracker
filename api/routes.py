from typing import List
from sqlalchemy.orm import Session
from fastapi import FastAPI, HTTPException, status, Depends
from fastapi.middleware.cors import CORSMiddleware

import schema, models
from database import engine, SessionLocal

models.Base.metadata.create_all(engine)

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
)

def getDB():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post('/issue', status_code=status.HTTP_201_CREATED)
def create(request: schema.Issue, db: Session = Depends(getDB)):
    new_issue = models.Issue(title=request.title, description=request.description)
    db.add(new_issue)
    db.commit()
    db.refresh(new_issue)

    return new_issue