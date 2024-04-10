from typing import List
from sqlalchemy.orm import Session
from fastapi import FastAPI, HTTPException, status, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

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

@app.get('/get_issues', status_code=status.HTTP_200_OK,response_model=List[schema.Issue])
def create(db: Session = Depends(getDB)):
    all_issues = db.query(models.Issue).all()

    return all_issues

@app.get('/get_issues/{id}', status_code=status.HTTP_200_OK, response_model=schema.Issue)
def show(id: int, db: Session = Depends(getDB)):
    blog = db.query(models.Issue).where(models.Issue.id==id).first()
    if not blog:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                             detail=f"blog with id {id} not found")
    return blog

if __name__ == "__main__":
    uvicorn.run("routes:app", host="127.0.0.1", port=8000, reload=True)