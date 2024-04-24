import { createTask } from '@/lib/utils/api-routes'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    const reqBody = await req.json()
    createTask(reqBody)
    return NextResponse.json(reqBody)
}