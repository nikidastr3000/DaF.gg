from db.session import SessionLocal
from db.models import Exam

MOCK_EXAMS = [
    {
        "id": 1,
        "title": "Umweltschutz im Alltag",
        "description": "Lesen Sie den Text und beantworten Sie die Fragen.",
        "section": "Leseverstehen",
        "part": 1,
        "content_text": "Der Umweltschutz spielt in der heutigen Gesellschaft eine immer wichtigere Rolle. Viele Menschen bemühen sich, ihren ökologischen Fußabdruck zu reduzieren. Dies beginnt oft im eigenen Haushalt: Mülltrennung, der Verzicht auf Plastiktüten und die Nutzung öffentlicher Verkehrsmittel sind nur einige Beispiele. Darüber hinaus fordern Aktivisten stärkere politische Maßnahmen zur Bekämpfung des Klimawandels."
    },
    {
        "id": 2,
        "title": "Studiengebühren pro und contra",
        "description": "Schreiben Sie einen zusammenhängenden Text zum Thema.",
        "section": "Schriftlicher Ausdruck",
        "part": 1,
        "content_text": "In den letzten Jahren wurde an vielen Universitäten intensiv über die Einführung oder Abschaffung von Studiengebühren diskutiert. Befürworter argumentieren, dass die Einnahmen die Qualität der Lehre verbessern könnten. Gegner befürchten jedoch, dass Bildung dadurch zu einem Privileg für Reiche wird. Nehmen Sie Stellung zu diesem Thema und wägen Sie die Vor- und Nachteile ab."
    }
]

def seed_db():
    db = SessionLocal()
    try:
        # Check if exams already exist
        if db.query(Exam).first():
            print("Database already seeded. Skipping...")
            return

        print("Seeding database with mock exams...")
        for exam_data in MOCK_EXAMS:
            exam = Exam(**exam_data)
            db.add(exam)
        
        db.commit()
        print("Successfully seeded!")
    except Exception as e:
        print(f"Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_db()
