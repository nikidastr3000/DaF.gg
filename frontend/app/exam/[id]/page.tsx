import React from 'react';

export default function ExamSessionPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-12rem)]">
      
      {/* Left Column: Reading Text / Instructions */}
      <div className="flex-1 bg-white p-6 rounded-lg shadow-sm border border-gray-200 overflow-y-auto">
        <div className="mb-4">
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">Leseverstehen</span>
          <span className="ml-2 text-sm text-gray-500">Teil 1</span>
        </div>
        <h2 className="text-2xl font-bold mb-4">Exam #{params.id} Text</h2>
        <div className="prose prose-blue max-w-none">
          <p>
            Hier ist ein Beispieltext für das Leseverstehen. In der eigentlichen Prüfung 
            werden hier akademische Texte, Diagramme oder Argumentationen angezeigt. 
            Die Aufgabe des Studenten ist es, den Text zu lesen und die Fragen auf der 
            rechten Seite zu beantworten.
          </p>
          {/* Mock long text */}
          <div className="h-96 bg-gray-50 border border-dashed border-gray-300 rounded flex items-center justify-center mt-4">
            <span className="text-gray-400">Mock Text Content Placeholder</span>
          </div>
        </div>
      </div>

      {/* Right Column: Interaction (Input / Audio Recorder) */}
      <div className="flex-[0.8] bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col">
        <h3 className="text-lg font-semibold mb-4">Ihre Antwort</h3>
        
        {/* Mock Writing Input */}
        <div className="mb-6 flex-1 flex flex-col">
          <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-2">
            Schreiben Sie Ihren Text hier:
          </label>
          <textarea 
            id="answer"
            rows={8}
            className="flex-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Tippen Sie Ihre Antwort..."
          />
        </div>

        {/* Mock Audio Recorder / Submission */}
        <div className="border-t pt-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-gray-600">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-200 transition">
              <span className="block w-4 h-4 bg-red-500 rounded-full"></span>
            </div>
            <span className="text-sm">00:00 / 03:00</span>
          </div>
          
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition shadow-sm font-medium">
            Einreichen & Bewerten
          </button>
        </div>
      </div>

    </div>
  );
}
