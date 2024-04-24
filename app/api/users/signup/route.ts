import { createUserAndGenerateTokens } from '@/lib/utils/api-routes'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const reqBody = await req.json()
    const tokens = await createUserAndGenerateTokens(reqBody)

    return NextResponse.json(tokens)
  } catch (error) {
    throw new Error((error as Error).message)
  }
}