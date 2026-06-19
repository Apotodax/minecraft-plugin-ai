import React, { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('generate')

  if (status === 'loading') {
    return <div className="flex items-center justify-center h-screen">Cargando...</div>
  }

  if (!session) {
    router.push('/')
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-minecraft-stone via-minecraft-dirt to-minecraft-grass">
      {/* Header */}
      <header className="bg-black bg-opacity-80 text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">⛏️ Dashboard</h1>
          <div className="flex gap-4 items-center">
            <div className="bg-minecraft-gold text-black px-4 py-2 rounded font-bold">
              💰 Créditos: {session?.user?.credits || 0}
            </div>
            <div className="bg-green-600 text-white px-4 py-2 rounded font-bold">
              💵 Balance: ${session?.user?.balance || 0}
            </div>
            <button
              onClick={() => signOut()}
              className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-black bg-opacity-60 text-white p-4">
        <div className="max-w-7xl mx-auto flex gap-4">
          <button
            onClick={() => setActiveTab('generate')}
            className={`px-4 py-2 rounded ${activeTab === 'generate' ? 'bg-minecraft-gold text-black font-bold' : 'bg-gray-700 hover:bg-gray-600'}`}
          >
            🤖 Generar Plugin
          </button>
          <button
            onClick={() => setActiveTab('plugins')}
            className={`px-4 py-2 rounded ${activeTab === 'plugins' ? 'bg-minecraft-gold text-black font-bold' : 'bg-gray-700 hover:bg-gray-600'}`}
          >
            📦 Mis Plugins
          </button>
          <button
            onClick={() => setActiveTab('ads')}
            className={`px-4 py-2 rounded ${activeTab === 'ads' ? 'bg-minecraft-gold text-black font-bold' : 'bg-gray-700 hover:bg-gray-600'}`}
          >
            📺 Ver Anuncios
          </button>
          <button
            onClick={() => setActiveTab('withdraw')}
            className={`px-4 py-2 rounded ${activeTab === 'withdraw' ? 'bg-minecraft-gold text-black font-bold' : 'bg-gray-700 hover:bg-gray-600'}`}
          >
            💳 Retirar
          </button>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Generate Plugin Tab */}
        {activeTab === 'generate' && (
          <div className="bg-black bg-opacity-70 p-8 rounded-lg text-white border-2 border-minecraft-gold">
            <h2 className="text-3xl font-bold mb-6">Genera tu Plugin con IA</h2>
            <GeneratePluginForm />
          </div>
        )}

        {/* Plugins Tab */}
        {activeTab === 'plugins' && (
          <div className="bg-black bg-opacity-70 p-8 rounded-lg text-white border-2 border-minecraft-gold">
            <h2 className="text-3xl font-bold mb-6">Mis Plugins</h2>
            <PluginsList />
          </div>
        )}

        {/* Ads Tab */}
        {activeTab === 'ads' && (
          <div className="bg-black bg-opacity-70 p-8 rounded-lg text-white border-2 border-minecraft-gold">
            <h2 className="text-3xl font-bold mb-6">Gana Dinero Viendo Anuncios</h2>
            <AdsSection />
          </div>
        )}

        {/* Withdraw Tab */}
        {activeTab === 'withdraw' && (
          <div className="bg-black bg-opacity-70 p-8 rounded-lg text-white border-2 border-minecraft-gold">
            <h2 className="text-3xl font-bold mb-6">Retirar Dinero</h2>
            <WithdrawSection />
          </div>
        )}
      </main>
    </div>
  )
}

function GeneratePluginForm() {
  const [pluginName, setPluginName] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    if (!pluginName || !description) {
      alert('Por favor completa todos los campos')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/generate-plugin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: pluginName, description }),
      })
      const data = await response.json()
      if (data.success) {
        alert('¡Plugin generado correctamente!')
        setPluginName('')
        setDescription('')
      }
    } catch (error) {
      console.error(error)
      alert('Error al generar el plugin')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Nombre del plugin"
        value={pluginName}
        onChange={(e) => setPluginName(e.target.value)}
        className="w-full p-3 bg-gray-800 border border-minecraft-gold rounded text-white"
      />
      <textarea
        placeholder="Descripción de lo que debe hacer el plugin"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-3 bg-gray-800 border border-minecraft-gold rounded text-white h-32"
      />
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="w-full bg-minecraft-gold text-black font-bold py-3 rounded hover:bg-yellow-400 disabled:opacity-50"
      >
        {loading ? 'Generando...' : '🚀 Generar Plugin'}
      </button>
    </div>
  )
}

function PluginsList() {
  return (
    <div className="text-center py-8">
      <p className="text-gray-400">Aún no has generado ningún plugin</p>
    </div>
  )
}

function AdsSection() {
  return (
    <div className="space-y-4">
      <p>Gana créditos viendo anuncios. Cada anuncio te da 10 créditos = $0.50</p>
      <div id="ad-container" className="bg-gray-800 p-4 rounded h-60 flex items-center justify-center border-2 border-minecraft-gold">
        <p className="text-gray-400">Los anuncios aparecerán aquí</p>
      </div>
      <button className="w-full bg-minecraft-gold text-black font-bold py-3 rounded hover:bg-yellow-400">
        📺 Ver Anuncio
      </button>
    </div>
  )
}

function WithdrawSection() {
  const [amount, setAmount] = useState('')

  return (
    <div className="space-y-4">
      <p>Mínimo a retirar: $5.00</p>
      <input
        type="number"
        placeholder="Cantidad a retirar en $"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-3 bg-gray-800 border border-minecraft-gold rounded text-white"
      />
      <button className="w-full bg-green-600 text-white font-bold py-3 rounded hover:bg-green-700">
        💳 Retirar a PayPal
      </button>
    </div>
  )
}
