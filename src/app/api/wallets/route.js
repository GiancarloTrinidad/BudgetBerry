import { prisma } from '@/lib/prisma'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')
  
  const wallets = await prisma.wallet.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  })
  
  return Response.json(wallets)
}