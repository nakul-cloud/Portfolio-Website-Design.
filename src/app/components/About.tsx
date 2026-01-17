'use client'


import { Brain, Music, Code2, Sparkles } from 'lucide-react'

// Updated stats with icons as requested
const stats = [
    { icon: Brain, label: 'AI Projects', value: '12+' },
    { icon: Music, label: 'Music Streams', value: '900K+' },
    { icon: Code2, label: 'Models Trained', value: '144+' },
    { icon: Sparkles, label: 'Tech Stack', value: '25+' },
]

export default function About() {


    return (
        <section id="about" className="relative min-h-screen overflow-hidden">
            {/* NEW ALTERNATE THEME FOR ALL OTHER SECTIONS */}
            <div
                data-us-project="kl2zjnPvJD9tkUeaNg63"
                className="absolute inset-0 w-full h-full z-0 opacity-60"
            />
            {/* Global Unicorn Background applies here */}

            {/* Content */}
            <div className="relative z-10 py-20 px-6 max-w-7xl mx-auto h-full flex flex-col justify-center">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <div className="space-y-8">
                        <div className="inline-block px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 backdrop-blur-md">
                            <span className="text-purple-300 text-sm font-semibold tracking-wider">ABOUT ME</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                            Building the Future with{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                                AI & Music
                            </span>
                        </h2>

                        <div className="space-y-6 text-lg text-gray-200 leading-relaxed">
                            <p>
                                I'm <span className="font-semibold text-white">Nakul Jadhav</span>, a PGDM student specializing in AI & Data Science at Adani Institute of Digital Technology Management,
                                and a B.Tech CSE graduate. I work across AI agents, machine learning pipelines, generative AI, image processing and intelligent automation,
                                building practical, production-ready systems.
                            </p>

                            <p>
                                Beyond tech, I'm also a music producer with <span className="font-semibold text-white">900K+ Spotify streams</span>,
                                blending creativity with precision — the same mindset I bring into AI development.
                            </p>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        {stats.map((stat) => (
                            <div
                                key={stat.label}
                                className="group backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 hover:bg-white/10"
                            >
                                <stat.icon className="w-8 h-8 text-purple-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
                                <div className="text-3xl font-bold mb-1 text-white">{stat.value}</div>
                                <div className="text-sm text-gray-300 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
