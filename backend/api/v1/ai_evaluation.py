from fastapi import APIRouter
from schemas.submission import SubmissionCreate, EvaluationResponse
import asyncio

router = APIRouter()

@router.post("/evaluate", response_model=EvaluationResponse)
async def evaluate_submission(submission: SubmissionCreate):
    # Simulate AI processing time
    await asyncio.sleep(1.5)
    
    # MVP Mock Response
    return EvaluationResponse(
        score="TDN 4",
        feedback="Ihr Text ist im Allgemeinen gut verständlich und strukturiert. Die Argumentation ist logisch aufgebaut. Es gibt jedoch einige grammatikalische Ungenauigkeiten und der Wortschatz könnte variabler sein.",
        grammar_issues=[
            "Achten Sie auf die korrekte Deklination der Adjektive nach bestimmten Artikeln.",
            "Überprüfen Sie die Satzstellung in Nebensätzen (Verb am Ende)."
        ],
        vocabulary_suggestions=[
            "Statt 'gut' könnten Sie 'vorteilhaft' oder 'positiv' verwenden.",
            "Verwenden Sie Synonyme für 'viele Menschen', z.B. 'ein Großteil der Bevölkerung'."
        ]
    )
