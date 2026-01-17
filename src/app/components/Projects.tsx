'use client'


import { Github, ExternalLink, Code2 } from 'lucide-react'

const projects = [
  {
    title: 'KPI Query & Ranking Intelligence System',
    description: 'AI bot that interprets natural language queries (e.g., "Top 5 RPG games by global sales") and automatically generates structured SQL for KPI analytics. Includes schema understanding, intent extraction, ranking logic, and validated SQL output.',
    tags: ['LangGraph', 'LLM', 'SQL Generator', 'Semantic Parsing', 'KPI Analytics'],
    github: 'https://github.com/nakul-cloud/Video-Game-KPI-Query-Bot',
    gradient: 'from-purple-500 to-pink-500',
    featured: true
  },
  {
    title: 'ATS Resume Intelligence Platform',
    description: 'An AI-powered resume evaluation and interview-readiness system that parses resumes, creates embeddings, compares them with job descriptions, and generates personalized strengths, gaps, learning roadmap, and adaptive interview questions using an agentic LLM workflow.',
    tags: ['NLP', 'Agentic AI', 'LangGraph', 'Supabase', 'LLMs', 'SQL'],
    github: 'https://github.com/nakul-cloud/ATS-Resume-Intelligence-Platform',
    gradient: 'from-blue-500 to-cyan-500',
    featured: true
  },
  {
    title: 'Investment Document Analyzer',
    description: 'A Retrieval-Augmented Generation (RAG) system that extracts insights from investment documents. Built using FastAPI, FAISS, SentenceTransformers, and Google GenAI (Gemini). Supports PDF upload, OCR, intelligent chunking, vector search, and AI question answering with source page tracking.',
    tags: ['FastAPI', 'Python', 'FAISS', 'SentenceTransformers', 'Google GenAI', 'OCR (Tesseract)'],
    github: 'https://github.com/nakul-cloud/Investment-Document-Analyzer-using-RAG-LLMs',
    gradient: 'from-green-500 to-emerald-500',
    featured: false
  },
  {
    title: 'UNSW-NB15 Intrusion Detection',
    description: 'A machine-learning based intrusion detection system built on the UNSW-NB15 cybersecurity dataset. The project trains and evaluates traditional ML models to classify network traffic into normal vs attack (binary) and 9 attack categories (multiclass).',
    tags: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib'],
    github: 'https://github.com/nakul-cloud/UNSW-NB15-Binary-and-Multiclass-Intrusion-Detection-using-Traditional-ML',
    gradient: 'from-orange-500 to-red-500',
    featured: false
  }
]

export default function Projects() {


  return (
    <section id="work" className="relative min-h-screen py-24 px-6 overflow-hidden">
      {/* NEW ALTERNATE THEME FOR ALL OTHER SECTIONS */}
      <div
        data-us-project="kl2zjnPvJD9tkUeaNg63"
        className="absolute inset-0 w-full h-full z-0 opacity-60"
      />
      {/* Global Unicorn Background applies here */}

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 backdrop-blur-md mb-6">
            <span className="text-purple-300 text-sm font-semibold tracking-wider">PORTFOLIO</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Showcasing advanced AI implementations, agentic workflows, and production-ready systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`group relative rounded-2xl bg-white/5 border border-white/10 backdrop-blur-2xl overflow-hidden hover:scale-[1.02] transition-all duration-300
                ${project.featured ? 'md:col-span-2' : 'md:col-span-1'}
              `}
            >
              {/* Gradient Header/Banner */}
              <div className={`h-2 w-full bg-gradient-to-r ${project.gradient}`} />

              <div className="p-8">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed text-lg">
                      {project.description}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 shrink-0">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white font-medium transition-all group/btn"
                    >
                      <Github className="w-5 h-5" />
                      <span>Code</span>
                    </a>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm font-medium text-gray-300 bg-black/30 rounded-lg border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
