from typing import List
from sqlalchemy.sql import text
from sqlalchemy.orm import Session
from fastapi import FastAPI, HTTPException, status, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

import schema, models
from database import engine, SessionLocal

models.Base.metadata.create_all(engine)

column_mapping = {
    'title': models.Issue.title,
    'status': models.Issue.status,
    'createdAt': models.Issue.createdAt
}

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

@app.get('/get_issues', status_code=status.HTTP_200_OK, response_model=List[schema.IssueResponse])
def get_issues(param: schema.GetIssuesQuery = Depends(),  db: Session = Depends(getDB)):
    query = db.query(models.Issue)

    if param.status:
        query = query.where(models.Issue.status == param.status)
    if param.orderBy:
        if param.sort == 'desc':
            query = query.order_by(column_mapping[param.orderBy].desc())
        else:
            query = query.order_by(column_mapping[param.orderBy])

    all_issues = query.all()
    return all_issues

@app.get('/get_issues/{id}', status_code=status.HTTP_200_OK, response_model=schema.IssueResponse)
def get_issues(id: int, db: Session = Depends(getDB)):
    blog = db.query(models.Issue).where(models.Issue.id==id).first()
    if not blog:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                             detail=f"blog with id {id} not found")
    return blog

@app.patch('/issues/{id}', status_code=status.HTTP_202_ACCEPTED)
def update_issue(id: int, request: schema.Issue, db: Session = Depends(getDB)):
    issue = db.query(models.Issue).where(models.Issue.id == id)
    if not issue.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"blog with id {id} not found")
    issue.update({'title': request.title, 'description': request.description, 'status': request.status})
    db.commit()

    return 'Updated'

@app.delete('/delete_issue/{id}', status_code=status.HTTP_204_NO_CONTENT)
def delete_issue(id: int, db: Session = Depends(getDB)):
    issue = db.query(models.Issue).where(models.Issue.id == id)
    if not issue.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"blog with id {id} not found")
    issue.delete()
    db.commit()

    return "deleted"

if __name__ == "__main__":
    uvicorn.run("routes:app", host="127.0.0.1", port=8000, reload=True)