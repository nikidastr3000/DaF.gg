from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.dialects.postgresql import JSON
from sqlalchemy.orm import relationship
from .session import Base

class Exam(Base):
    __tablename__ = "exams"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text)
    section = Column(String, nullable=False)
    part = Column(Integer, nullable=False)
    content_text = Column(Text, nullable=False)

    submissions = relationship("Submission", back_populates="exam")

class Submission(Base):
    __tablename__ = "submissions"

    id = Column(Integer, primary_key=True, index=True)
    exam_id = Column(Integer, ForeignKey("exams.id"))
    student_text = Column(Text, nullable=False)
    score = Column(String)
    feedback = Column(Text)
    grammar_issues = Column(JSON)
    vocabulary_suggestions = Column(JSON)

    exam = relationship("Exam", back_populates="submissions")
