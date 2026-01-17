'use client'


import { Brain, Database, Zap, Code, Palette, Cloud } from 'lucide-react'

// Updated Skills Data
const skillCategories = [
  {
    title: 'AI & Machine Learning',
    icon: Brain,
    gradient: 'from-purple-500 to-pink-500',
    skills: ['pandas', 'LangGraph', 'Crew AI', 'LangChain', 'Agentic RAG', 'RAG Systems', 'MCP', 'PyTorch', 'Data Preprocessing', 'Feature Engineering', 'Deep Learning']
  },
  {
    title: 'Data & Databases',
    icon: Database,
    gradient: 'from-green-500 to-emerald-500',
    skills: ['SQL', 'Supabase', 'PostgreSQL', 'MySQL', 'Joins / Indexing', 'Relational Database Design']
  },
  {
    title: 'AI Tools & LLMs',
    icon: Zap,
    gradient: 'from-orange-500 to-red-500',
    skills: ['GPT-4 / GPT-5', 'Gemini', 'Gemini Labs', 'DeepSeek', 'Grok', 'Claude', 'Hugging Face', 'Tavily', 'Perplexity', 'Prompt Engineering', 'RAG Implementation', 'LLM Fine-tuning']
  },
  {
    title: 'Development',
    icon: Code,
    gradient: 'from-blue-500 to-cyan-500',
    skills: ['Next.js', 'React', 'TypeScript', 'Python', 'FastAPI', 'Tailwind CSS', 'Framer Motion', 'Node.js']
  },
  {
    title: 'Music Production',
    icon: Palette,
    gradient: 'from-pink-500 to-purple-500',
    skills: ['FL Studio', 'Mixing', 'Mastering', 'Sound Design', 'Ghost Production']
  },
  {
    title: 'Cloud & Tools',
    icon: Cloud,
    gradient: 'from-cyan-500 to-blue-500',
    skills: ['VS Code', 'Git', 'AWS', 'Antigravity', 'Jupyter Notebook', 'Vercel', 'GitHub']
  }
]

export default function Skills() {


  return (
    <section id="skills" className="relative min-h-screen py-24 px-6 overflow-hidden">
      {/* NEW ALTERNATE THEME FOR ALL OTHER SECTIONS */}
      <div
        data-us-project="kl2zjnPvJD9tkUeaNg63"
        className="absolute inset-0 w-full h-full z-0 opacity-60"
      />
      {/* Global Unicorn Background applies here */}

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 backdrop-blur-md mb-6">
            <span className="text-blue-300 text-sm font-semibold tracking-wider">EXPERTISE</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Technical Arsenal
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            A comprehensive toolkit spanning advanced AI agents, full-stack development, and creative production.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-2xl hover:bg-white/10 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${category.gradient} shadow-lg`}>
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{category.title}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-sm text-gray-200 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors cursor-default"
                    >
                      {skill}
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
