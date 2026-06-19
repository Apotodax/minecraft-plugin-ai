import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN
const DISCORD_SERVER_ID = process.env.DISCORD_SERVER_ID

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { userId, code } = req.body

  if (!userId || !code) {
    return res.status(400).json({ error: 'Missing fields' })
  }

  try {
    // Verify Discord user
    const user = await prisma.user.findFirst({
      where: { discordId: userId },
    })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    // TODO: Verify code with Discord bot
    // Send code verification through Discord bot
    // This would involve checking if the user has the verification code

    res.status(200).json({
      success: true,
      message: 'Code verified',
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Verification failed' })
  }
}
