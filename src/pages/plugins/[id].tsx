import React from 'react'

export default function PluginDetail() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-minecraft-stone via-minecraft-dirt to-minecraft-grass">
      <header className="bg-black bg-opacity-80 text-white p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">⛏️ Detalles del Plugin</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-black bg-opacity-70 p-8 rounded-lg text-white border-2 border-minecraft-gold">
          <p className="text-gray-400">Cargando plugin...</p>
        </div>
      </main>
    </div>
  )
}
