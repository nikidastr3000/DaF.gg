from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def list_exams():
    return {"exams": []}

@router.get("/{exam_id}")
async def get_exam(exam_id: int):
    return {"exam_id": exam_id, "title": f"Exam {exam_id}"}
