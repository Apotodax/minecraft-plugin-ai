import axios from 'axios'

const OLLAMA_API_URL = process.env.OLLAMA_API_URL || 'http://localhost:11434'
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'llama2'

export async function generatePluginWithOllama(
  pluginName: string,
  description: string
): Promise<string> {
  const prompt = `
You are an expert Minecraft plugin developer. Generate a complete, working Minecraft plugin in Java.

Plugin Name: ${pluginName}
Description: ${description}

Requirements:
- Create a valid Minecraft plugin for Bukkit/Spigot API
- Include plugin.yml configuration
- Add proper command handlers if applicable
- Include event listeners if needed
- Add comments explaining the code
- Make it production-ready

Generate the complete plugin code now:
`

  try {
    const response = await axios.post(`${OLLAMA_API_URL}/api/generate`, {
      model: OLLAMA_MODEL,
      prompt,
      stream: false,
    })

    return response.data.response
  } catch (error) {
    console.error('Ollama API error:', error)
    throw new Error('Failed to generate plugin with Ollama')
  }
}

export async function checkOllamaHealth(): Promise<boolean> {
  try {
    const response = await axios.get(`${OLLAMA_API_URL}/api/tags`)
    return response.status === 200
  } catch {
    return false
  }
}
