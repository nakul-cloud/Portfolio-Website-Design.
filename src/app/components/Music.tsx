'use client'


import { Play, ExternalLink } from 'lucide-react'

const tracks = [
  {
    name: 'Love Language',
    url: 'https://open.spotify.com/track/4gyrd3PcTPHjTKny0QHeq3',
    image: '/images/love-language.jpg',
  },
  {
    name: 'In My Mind',
    url: 'https://open.spotify.com/track/0ng3Tzwvq8bZ8HxvwLTzok',
    image: '/images/in my mind.jpg',
  },
  {
    name: 'Goodbye',
    url: 'https://open.spotify.com/track/1UykWruJ0m0iqBjIMVzfZr',
    // Updated to JPG format as requested
    image: '/images/good-bye.jpg',
  },
  {
    name: 'Heartbreak',
    url: 'https://open.spotify.com/track/5H3x0fP54YOU7iXWrzDuny',
    image: '/images/heartbreak.jpg',
  },
]

export default function Music() {


  return (
    <section id="music" className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 px-6">
      {/* NEW ALTERNATE THEME FOR ALL OTHER SECTIONS */}
      <div
        data-us-project="kl2zjnPvJD9tkUeaNg63"
        className="absolute inset-0 w-full h-full z-0 opacity-60"
      />
      {/* Global Unicorn Background applies here */}

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Simplified Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/30 backdrop-blur-md mb-6">
            <span className="text-pink-300 text-sm font-semibold tracking-wider">🎵 MUSIC</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            My Releases
          </h2>
        </div>

        {/* Tracks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {tracks.map((track) => (
            <a
              key={track.name}
              href={track.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-2xl hover:scale-105 transition-all duration-300"
            >
              {/* Album Artwork */}
              <div className="relative aspect-square w-full rounded-xl mb-4 overflow-hidden bg-gray-900 shadow-lg">
                <img
                  src={track.image}
                  alt={track.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    console.error('Image load failed:', track.image);
                    // e.currentTarget.style.display = 'none'; 
                    // e.currentTarget.parentElement!.style.backgroundColor = '#333';
                  }}
                />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm">
                  <div className="p-3 bg-white rounded-full text-black transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-xl">
                    <Play className="w-8 h-8 fill-current translate-x-0.5" />
                  </div>
                </div>
              </div>

              {/* Track Name */}
              <div className="text-center">
                <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors truncate">
                  {track.name}
                </h3>
              </div>
            </a>
          ))}
        </div>

        {/* Spotify CTA */}
        <div className="text-center">
          <a
            href="https://open.spotify.com/artist/YOUR_ARTIST_ID"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#1DB954] hover:bg-[#1ed760] 
            text-white font-bold tracking-wide transition-all duration-300 hover:scale-105 shadow-lg shadow-green-900/20"
          >
            <ExternalLink className="w-5 h-5" />
            Listen on Spotify
          </a>
        </div>
      </div>
    </section>
  )
}
