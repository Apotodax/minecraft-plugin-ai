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
    const plugins = await prisma.plugin.findMany({
      where: {
        userId: session.user.id as string,
      },
      include: {
        reviews: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    res.status(200).json({
      success: true,
      plugins,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch plugins' })
  }
}
