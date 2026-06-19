import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from './auth/[...nextauth]'
import { prisma } from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const session = await getServerSession(req, res, authOptions)
  if (!session?.user) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { amount } = req.body

  if (!amount || amount < 5) {
    return res.status(400).json({ error: 'Minimum withdrawal is $5' })
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id as string },
    })

    if (!user || user.balance < amount) {
      return res.status(400).json({ error: 'Insufficient balance' })
    }

    // Create PayPal transaction
    const transaction = await prisma.transaction.create({
      data: {
        userId: session.user.id as string,
        type: 'paypal_withdrawal',
        amount,
        description: `Withdrawal to PayPal`,
        status: 'pending',
      },
    })

    // TODO: Integrate with PayPal API to process the withdrawal

    res.status(200).json({
      success: true,
      transaction,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to process withdrawal' })
  }
}
