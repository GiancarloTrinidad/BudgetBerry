import { prisma } from '@/lib/prisma'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const walletId = searchParams.get('walletId')
  
  const transactions = await prisma.transaction.findMany({
    where: { walletId },
    orderBy: { createdAt: 'desc' },
    take: 10 // Limit to 10 most recent
  })
  
  return Response.json(transactions)
}