import { deleteTask } from "@/lib/utils/api-routes"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const reqBody = await req.json()
    await deleteTask(reqBody.id)
    return NextResponse.json(reqBody)
}