import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { authOptions } from '../auth/[...nextauth]'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Get popular plugins
    const plugins = await prisma.plugin.findMany({
      where: {
        isPublic: true,
      },
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
        reviews: true,
      },
      orderBy: {
        downloads: 'desc',
      },
      take: 20,
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
