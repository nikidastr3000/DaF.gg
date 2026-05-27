from fastapi import APIRouter, HTTPException
from schemas.exam import Exam
from typing import List

router = APIRouter()

# Mock data for MVP
MOCK_EXAMS = {
    "1": {
        "id": 1,
        "title": "Umweltschutz im Alltag",
        "description": "Lesen Sie den Text und beantworten Sie die Fragen.",
        "section": "Leseverstehen",
        "part": 1,
        "content_text": "Der Umweltschutz spielt in der heutigen Gesellschaft eine immer wichtigere Rolle. Viele Menschen bemühen sich, ihren ökologischen Fußabdruck zu reduzieren. Dies beginnt oft im eigenen Haushalt: Mülltrennung, der Verzicht auf Plastiktüten und die Nutzung öffentlicher Verkehrsmittel sind nur einige Beispiele. Darüber hinaus fordern Aktivisten stärkere politische Maßnahmen zur Bekämpfung des Klimawandels."
    },
    "2": {
        "id": 2,
        "title": "Studiengebühren pro und contra",
        "description": "Schreiben Sie einen zusammenhängenden Text zum Thema.",
        "section": "Schriftlicher Ausdruck",
        "part": 1,
        "content_text": "In den letzten Jahren wurde an vielen Universitäten intensiv über die Einführung oder Abschaffung von Studiengebühren diskutiert. Befürworter argumentieren, dass die Einnahmen die Qualität der Lehre verbessern könnten. Gegner befürchten jedoch, dass Bildung dadurch zu einem Privileg für Reiche wird. Nehmen Sie Stellung zu diesem Thema und wägen Sie die Vor- und Nachteile ab."
    }
}

@router.get("/", response_model=List[Exam])
async def list_exams():
    return list(MOCK_EXAMS.values())

@router.get("/{exam_id}", response_model=Exam)
async def get_exam(exam_id: str):
    exam = MOCK_EXAMS.get(exam_id)
    if not exam:
        raise HTTPException(status_code=404, detail="Exam not found")
    return exam
