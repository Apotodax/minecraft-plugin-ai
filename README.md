# 🎮 Minecraft Plugin AI Generator

Generador de plugins de Minecraft con IA. ¡Gana dinero viendo anuncios!

## 🚀 Características

- ✨ **Generación de Plugins con IA**: Crea plugins de Minecraft automáticamente
- 💰 **Sistema de Créditos**: Gana viendo anuncios
- 💵 **Retiros a PayPal**: Convierte créditos en dinero real
- 🔐 **Autenticación Discord**: Login seguro con Discord
- 📦 **Descarga de Código**: Obtén el plugin listo para usar

## 📋 Prerequisites

- Node.js 18+
- PostgreSQL database
- Ollama installed (para IA gratuita)
- Discord Bot Token
- PayPal API credentials

## 🛠️ Installation

1. Clone el repositorio
```bash
git clone https://github.com/Apotodax/minecraft-plugin-ai
cd minecraft-plugin-ai
```

2. Instala dependencias
```bash
npm install
```

3. Configura las variables de entorno en `.env.local`
```bash
DISCORD_CLIENT_ID=your_discord_client_id
DISCORD_CLIENT_SECRET=your_discord_client_secret
DISCORD_BOT_TOKEN=your_bot_token
DATABASE_URL=your_database_url
PAYPAL_CLIENT_ID=your_paypal_id
PAYPAL_CLIENT_SECRET=your_paypal_secret
```

4. Configura la base de datos
```bash
npx prisma migrate dev --name init
```

5. Inicia Ollama
```bash
ollama serve
# En otra terminal:
ollama pull llama2
```

6. Inicia el servidor de desarrollo
```bash
npm run dev
```

Visita http://localhost:3000

## 🏗️ Estructura

```
├── src/
│   ├── pages/
│   │   ├── api/           # API endpoints
│   │   ├── dashboard.tsx  # Dashboard principal
│   │   └── index.tsx      # Home page
│   ├── lib/
│   │   ├── ollama.ts      # IA integration
│   │   └── prisma.ts      # Database client
│   └── styles/
├── prisma/
│   └── schema.prisma      # Database schema
└── README.md
```

## 💳 Configuración PayPal

1. Ve a https://developer.paypal.com
2. Crea una aplicación
3. Obtén Client ID y Secret
4. Configúralos en `.env.local`

## 🤖 Ollama Setup

```bash
# Instala Ollama desde https://ollama.ai
ollama pull llama2
ollama serve
```

## 📱 Discord Bot Setup

1. Ve a https://discord.com/developers/applications
2. Crea nueva aplicación
3. Copia el Client ID y Secret
4. Genera un token del bot
5. Configúralos en `.env.local`

## 🚀 Deploy a Railway

1. Push el código a GitHub
2. Ve a https://railway.app
3. Conecta tu repositorio de GitHub
4. Configura las variables de entorno
5. Deploy automático

## 📝 Licencia

MIT

## 👨‍💻 Autor

Apotodax

## 🔗 Links

- Discord: https://discord.gg/TTQn3AuhUY
- PayPal: apotodax@gmail.com
