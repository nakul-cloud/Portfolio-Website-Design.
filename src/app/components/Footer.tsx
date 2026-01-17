'use client'



export default function Footer() {


    return (
        <footer className="relative py-12 px-6 border-t border-white/5 bg-black overflow-hidden">
            {/* NEW ALTERNATE THEME FOR ALL OTHER SECTIONS */}
            <div
                data-us-project="kl2zjnPvJD9tkUeaNg63"
                className="absolute inset-0 w-full h-full z-0 opacity-60"
            />

            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-500">
                        © 2026 Nakul Jadhav. Built with React & Tailwind CSS
                    </p>
                    <p className="text-sm text-gray-500">
                        Ahmedabad, Gujarat, IN
                    </p>
                </div>
            </div>
        </footer>
    )
}
