import React from 'react'
import Link from 'next/link'
import { useSession, signIn } from 'next-auth/react'

export default function Home() {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen bg-gradient-to-b from-minecraft-stone via-minecraft-dirt to-minecraft-grass">
      {/* Header */}
      <header className="bg-black bg-opacity-80 text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">⛏️ Minecraft Plugin AI</h1>
          <div className="flex gap-4">
            {session ? (
              <>
                <Link href="/dashboard" className="bg-minecraft-gold text-black px-4 py-2 rounded hover:bg-yellow-400">
                  Dashboard
                </Link>
                <Link href="/api/auth/signout" className="bg-red-600 px-4 py-2 rounded hover:bg-red-700">
                  Logout
                </Link>
              </>
            ) : (
              <button
                onClick={() => signIn('discord')}
                className="bg-minecraft-gold text-black px-4 py-2 rounded hover:bg-yellow-400 font-bold"
              >
                Login con Discord
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-5xl font-bold text-white mb-4">
          Crea Plugins de Minecraft con IA
        </h2>
        <p className="text-xl text-gray-200 mb-8">
          ✨ Genera plugins automáticamente y gana dinero viendo anuncios
        </p>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-black bg-opacity-70 p-6 rounded-lg text-white border-2 border-minecraft-gold">
            <h3 className="text-2xl font-bold mb-2">🤖 IA Inteligente</h3>
            <p>Genera código profesional de plugins en segundos</p>
          </div>
          <div className="bg-black bg-opacity-70 p-6 rounded-lg text-white border-2 border-minecraft-gold">
            <h3 className="text-2xl font-bold mb-2">💰 Gana Dinero</h3>
            <p>Mira anuncios, gana créditos, retira a PayPal</p>
          </div>
          <div className="bg-black bg-opacity-70 p-6 rounded-lg text-white border-2 border-minecraft-gold">
            <h3 className="text-2xl font-bold mb-2">📦 Descarga Completa</h3>
            <p>Obtén el código listo para usar en tu servidor</p>
          </div>
        </div>

        {!session && (
          <button
            onClick={() => signIn('discord')}
            className="bg-minecraft-gold text-black text-lg font-bold px-8 py-4 rounded-lg hover:bg-yellow-400 transition-all"
          >
            Comenzar Ahora
          </button>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-black bg-opacity-80 text-white text-center py-6 mt-20">
        <p>Únete al servidor Discord: <a href="https://discord.gg/TTQn3AuhUY" className="text-minecraft-gold hover:underline">discord.gg/TTQn3AuhUY</a></p>
      </footer>
    </div>
  )
}
