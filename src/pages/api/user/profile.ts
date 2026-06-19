import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
import { prisma } from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const session = await getServerSession(req, res, authOptions)
  if (!session?.user) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id as string },
      select: {
        id: true,
        username: true,
        email: true,
        avatar: true,
        credits: true,
        balance: true,
        paypalEmail: true,
      },
    })

    res.status(200).json({
      success: true,
      user,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch user profile' })
  }
}
