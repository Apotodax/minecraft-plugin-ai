import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from './auth/[...nextauth]'
import { prisma } from '@/lib/prisma'

const CREDITS_PER_AD = 10
const CREDITS_TO_USD = 0.05 // 10 credits = $0.50

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const session = await getServerSession(req, res, authOptions)
  if (!session?.user) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    // Update user credits
    const user = await prisma.user.update({
      where: { id: session.user.id as string },
      data: {
        credits: {
          increment: CREDITS_PER_AD,
        },
        balance: {
          increment: CREDITS_PER_AD * CREDITS_TO_USD,
        },
      },
    })

    // Log ad watch
    await prisma.adWatch.create({
      data: {
        userId: session.user.id as string,
        adNetwork: 'google_adsense',
        creditsEarned: CREDITS_PER_AD,
      },
    })

    res.status(200).json({
      success: true,
      credits: user.credits,
      balance: user.balance,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to process ad watch' })
  }
}
