import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-6 text-center">
        Bestehen Sie den <span className="text-blue-600">TestDaF</span> mit Leichtigkeit
      </h1>
      <p className="text-xl text-gray-600 mb-10 max-w-2xl text-center">
        Die KI-gestützte Vorbereitungsplattform für Deutschlerner. Erhalten Sie sofortiges Feedback zu Ihren Schreib- und Sprechleistungen.
      </p>
      
      <div className="flex gap-4">
        <Link 
          href="/exam/demo" 
          className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition shadow-lg"
        >
          Kostenlose Demo starten
        </Link>
        <button className="bg-white text-gray-900 border border-gray-300 px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition shadow-sm">
          Mehr erfahren
        </button>
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        <FeatureCard 
          title="KI-Bewertung" 
          description="Erhalten Sie detaillierte Analysen Ihrer Texte basierend auf offiziellen TestDaF-Kriterien." 
        />
        <FeatureCard 
          title="Realistische Simulation" 
          description="Üben Sie mit Aufgaben, die genau wie die echte Prüfung aufgebaut sind." 
        />
        <FeatureCard 
          title="Sprechtraining" 
          description="Verbessern Sie Ihre Aussprache und Argumentation mit unserem Audio-Recorder." 
        />
      </div>
    </div>
  );
}

function FeatureCard({ title, description }: { title: string, description: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
