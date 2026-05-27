from pydantic import BaseModel
from typing import List, Optional

class ExamBase(BaseModel):
    title: str
    description: Optional[str] = None
    section: str # z.B. "Leseverstehen", "Schriftlicher Ausdruck"
    part: int # z.B. 1, 2, 3

class ExamCreate(ExamBase):
    content_text: str

class Exam(ExamBase):
    id: int
    content_text: str

    model_config = {
        "from_attributes": True
    }
