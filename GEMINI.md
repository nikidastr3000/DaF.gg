# DaF.gg - TestDaF Preparation Platform

**CRITICAL INSTRUCTION FOR AI AGENTS:** Always update this `GEMINI.md` file at the end of your task to reflect the current state of the project, completed tasks, and any new learnings or outstanding issues.

## Project Overview
DaF.gg is a web application designed to help students prepare for the TestDaF (Test Deutsch als Fremdsprache) exam. The platform simulates exam conditions, allowing users to practice various TestDaF tasks. A core feature is the integration of AI to provide immediate, automated evaluation and feedback on user submissions (like writing and speaking), mirroring the official TestDaF grading criteria. 

**Tech Stack:**
- **Frontend:** Next.js (React, TypeScript, Tailwind CSS)
- **Backend:** FastAPI (Python, Pydantic)
- **Database:** PostgreSQL
- **Caching/Queue:** Redis
- **Infrastructure:** Docker & Docker Compose

## Current Project Status
The project architecture has been successfully scaffolded and the core Minimum Viable Product (MVP) data flow is connected. 
- **Infrastructure:** `docker-compose.yml` orchestrates PostgreSQL, Redis, FastAPI backend, and Next.js frontend via their respective Dockerfiles.
- **Backend (FastAPI):** Core API routes (`auth`, `exams`, `ai_evaluation`) are established. Pydantic schemas define the data contract. Currently, the API uses mock data to simulate database queries and AI evaluations to enable immediate frontend integration.
- **Frontend (Next.js):** The application layout and landing page are implemented. The exam session UI (`/exam/[id]`) is fully functional as a React Client Component. It dynamically fetches exam data from the backend and submits student responses to the evaluation endpoint, displaying the simulated AI feedback upon return.

## Completed Tasks
- [x] Initial dual-directory scaffold (`/frontend`, `/backend`).
- [x] `docker-compose.yml` and root configuration setup.
- [x] Backend Dockerfile and Python `requirements.txt`.
- [x] Frontend Dockerfile and Next.js configuration (`tsconfig.json`, `tailwind.config.ts`, `postcss.config.js`).
- [x] Backend database session and core configuration modules (`core/config.py`, `db/session.py`).
- [x] Pydantic schemas for data validation (`schemas/exam.py`, `schemas/submission.py`).
- [x] Implementation of MVP API logic in `api/v1/exams.py` and `api/v1/ai_evaluation.py`.
- [x] Conversion of `frontend/app/exam/[id]/page.tsx` to a fully interactive Client Component with state management and API integration.
- [x] Fixed Next.js frontend compilation issue related to Tailwind CSS dependencies (`autoprefixer`, `postcss`).
- [x] **Database Integration:** Defined SQLAlchemy models (`Exam`, `Submission`) in `backend/db/models.py`.
- [x] **Database Migrations:** Initialized Alembic and created the first migration script for the schema.
- [x] **Backend Logic Upgrade:** Refactored `api/v1/exams.py` to fetch data from PostgreSQL.
- [x] **Data Seeding:** Created `backend/seed.py` to populate the database with initial exam content.
- [x] **Infrastructure Fix:** Resolved `EACCES` permission denied error in frontend container by adding an anonymous volume for `.next`.

## Outstanding Tasks
- **AI Integration:** Implement real API calls to OpenAI or Google Generative AI within `api/v1/ai_evaluation.py`, utilizing system prompts tailored for TestDaF grading. Update the endpoint to save submissions to the database.
- **Frontend Enhancements:** Add the audio-recording UI/logic for the speaking sections of the exam.
- **Authentication:** Implement JWT-based user authentication and protect the API routes.

## Known Issues/Edge Cases
- The Next.js frontend currently expects `NEXT_PUBLIC_API_URL` to be `http://localhost:8000` via environment variables. Ensure the `docker-compose.yml` propagates this correctly, or adjust local `.env` files.
- The Alembic initialization was intentionally deferred. It must be run from inside the backend Docker container (or local venv with DB running) to generate the `alembic.ini` with correct paths.
- The `tsconfig.json` was generated manually; if there are issues with Next.js type-checking during the first build, consider deleting it and letting `npm run dev` auto-generate it.