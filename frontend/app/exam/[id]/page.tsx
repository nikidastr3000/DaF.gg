"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Exam {
  id: number;
  title: string;
  description: string;
  section: string;
  part: number;
  content_text: string;
}

interface Evaluation {
  score: string;
  feedback: string;
  grammar_issues: string[];
  vocabulary_suggestions: string[];
}

export default function ExamSessionPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [exam, setExam] = useState<Exam | null>(null);
  const [loading, setLoading] = useState(true);
  const [answer, setAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);

  useEffect(() => {
    // Fetch exam data
    const fetchExam = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        const res = await fetch(`${apiUrl}/api/v1/exams/${params.id}`);
        if (!res.ok) throw new Error('Failed to fetch exam');
        const data = await res.json();
        setExam(data);
      } catch (error) {
        console.error("Error fetching exam:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExam();
  }, [params.id]);

  const handleSubmit = async () => {
    if (!answer.trim()) return;
    
    setIsSubmitting(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await fetch(`${apiUrl}/api/v1/ai_evaluation/evaluate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          exam_id: parseInt(params.id),
          student_text: answer
        }),
      });
      
      if (!res.ok) throw new Error('Evaluation failed');
      const data = await res.json();
      setEvaluation(data);
    } catch (error) {
      console.error("Error evaluating submission:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-[50vh]">Lade Prüfung...</div>;
  }

  if (!exam) {
    return <div className="flex justify-center items-center h-[50vh]">Prüfung nicht gefunden.</div>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-12rem)]">
      
      {/* Left Column: Reading Text / Instructions */}
      <div className="flex-1 bg-white p-6 rounded-lg shadow-sm border border-gray-200 overflow-y-auto">
        <div className="mb-4">
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">{exam.section}</span>
          <span className="ml-2 text-sm text-gray-500">Teil {exam.part}</span>
        </div>
        <h2 className="text-2xl font-bold mb-2">{exam.title}</h2>
        <p className="text-gray-600 mb-6 italic">{exam.description}</p>
        
        <div className="prose prose-blue max-w-none bg-gray-50 p-6 border border-gray-100 rounded-lg">
          <p className="whitespace-pre-wrap text-gray-800 leading-relaxed">
            {exam.content_text}
          </p>
        </div>
      </div>

      {/* Right Column: Interaction (Input / Evaluation) */}
      <div className="flex-[0.8] bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col overflow-y-auto">
        
        {!evaluation ? (
          <>
            <h3 className="text-lg font-semibold mb-4">Ihre Antwort</h3>
            
            {/* Writing Input */}
            <div className="mb-6 flex-1 flex flex-col">
              <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-2">
                Schreiben Sie Ihren Text hier:
              </label>
              <textarea 
                id="answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                rows={12}
                className="flex-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Tippen Sie Ihre Antwort..."
                disabled={isSubmitting}
              />
            </div>

            {/* Submission */}
            <div className="border-t pt-4 flex items-center justify-end">
              <button 
                onClick={handleSubmit}
                disabled={isSubmitting || !answer.trim()}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition shadow-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Wird bewertet...' : 'Einreichen & Bewerten'}
              </button>
            </div>
          </>
        ) : (
          /* Evaluation Results */
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-6 border-b pb-4">
              <h3 className="text-2xl font-bold text-gray-900">Auswertung</h3>
              <span className="bg-green-100 text-green-800 text-lg font-bold px-4 py-1 rounded-full">
                {evaluation.score}
              </span>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Feedback</h4>
                <p className="text-gray-700 leading-relaxed">{evaluation.feedback}</p>
              </div>

              <div>
                <h4 className="font-semibold text-red-600 mb-2">Grammatik</h4>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  {evaluation.grammar_issues.map((issue, idx) => (
                    <li key={idx}>{issue}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-blue-600 mb-2">Wortschatz & Stil</h4>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  {evaluation.vocabulary_suggestions.map((suggestion, idx) => (
                    <li key={idx}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t text-center">
              <button 
                onClick={() => {
                  setEvaluation(null);
                  setAnswer("");
                }}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Neue Antwort schreiben
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
