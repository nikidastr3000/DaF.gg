from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from schemas.exam import Exam
from db import models
from db.session import get_db
from typing import List

router = APIRouter()

@router.get("/", response_model=List[Exam])
async def list_exams(db: Session = Depends(get_db)):
    exams = db.query(models.Exam).all()
    return exams

@router.get("/{exam_id}", response_model=Exam)
async def get_exam(exam_id: int, db: Session = Depends(get_db)):
    exam = db.query(models.Exam).filter(models.Exam.id == exam_id).first()
    if not exam:
        raise HTTPException(status_code=404, detail="Exam not found")
    return exam
