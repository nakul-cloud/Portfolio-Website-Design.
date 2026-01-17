'use client'


import { Mail, Github, Linkedin, Instagram, Music } from 'lucide-react'

const socialLinks = [
  {
    name: 'GitHub',
    icon: Github,
    url: 'https://github.com/nakul-cloud',
    color: 'hover:text-white'
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: 'https://linkedin.com/in/nakul-jadhav-05a7a231a', // User's LinkedIn profile
    color: 'hover:text-blue-400'
  },
  {
    name: 'Instagram',
    icon: Instagram,
    url: 'https://www.instagram.com/nakymine/', // Placeholder
    color: 'hover:text-pink-400'
  },
  {
    name: 'Spotify',
    icon: Music,
    url: 'https://open.spotify.com/artist/3CgBi6qhaYUolOWg9FwL0I?si=2Ho3mN_eQSmoPF7RCTSk-Q',
    color: 'hover:text-green-400'
  },
  {
    name: 'Email',
    icon: Mail,
    url: 'mailto:jadhavnakul16@gmail.com',
    color: 'hover:text-red-400'
  }
]

export default function Contact() {


  return (
    <section id="contact" className="relative min-h-screen py-24 px-6 overflow-hidden flex items-center justify-center">
      {/* NEW ALTERNATE THEME FOR ALL OTHER SECTIONS */}
      <div
        data-us-project="kl2zjnPvJD9tkUeaNg63"
        className="absolute inset-0 w-full h-full z-0 opacity-60"
      />
      {/* Global Unicorn Background applies here */}

      <div className="relative z-10 w-full max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 backdrop-blur-md mb-6">
            <span className="text-green-300 text-sm font-semibold tracking-wider">GET IN TOUCH</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Let's Build Something
          </h2>
          <p className="text-lg text-gray-300 max-w-xl mx-auto">
            Whether it's an AI breakthrough, a music collaboration, or just a tech chat — I'm always open to new ideas.
          </p>
        </div>

        {/* Contact Card */}
        <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12">
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400 ml-1">Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-5 py-4 rounded-xl bg-black/20 border border-white/10 text-white focus:outline-none focus:border-purple-500/50 focus:bg-white/5 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400 ml-1">Email</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full px-5 py-4 rounded-xl bg-black/20 border border-white/10 text-white focus:outline-none focus:border-purple-500/50 focus:bg-white/5 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Message</label>
              <textarea
                rows={4}
                placeholder="Tell me about your project..."
                className="w-full px-5 py-4 rounded-xl bg-black/20 border border-white/10 text-white focus:outline-none focus:border-purple-500/50 focus:bg-white/5 transition-all resize-none"
              />
            </div>

            <button
              type="button"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-purple-900/20"
            >
              Send Message
            </button>
          </form>

          {/* Social Links Footer */}
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap justify-center gap-8">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center gap-2 text-gray-400 ${link.color} transition-colors`}
              >
                <link.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="font-medium">{link.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
