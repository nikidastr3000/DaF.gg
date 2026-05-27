from pydantic import BaseModel
from typing import Optional

class SubmissionCreate(BaseModel):
    exam_id: int
    student_text: str

class EvaluationResponse(BaseModel):
    score: str # e.g., TDN 3, 4, 5
    feedback: str
    grammar_issues: list[str]
    vocabulary_suggestions: list[str]
