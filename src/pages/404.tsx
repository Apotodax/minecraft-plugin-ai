import React from 'react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-minecraft-stone via-minecraft-dirt to-minecraft-grass flex items-center justify-center">
      <div className="bg-black bg-opacity-70 p-8 rounded-lg text-white border-2 border-yellow-500 text-center">
        <h1 className="text-4xl font-bold mb-4">❌ Página No Encontrada</h1>
        <p className="text-lg mb-6">Error 404 - Esta página no existe</p>
        <a href="/" className="bg-minecraft-gold text-black px-6 py-2 rounded font-bold hover:bg-yellow-400">
          Volver al Inicio
        </a>
      </div>
    </div>
  )
}
