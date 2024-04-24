import { prismadb } from "@/lib/utils/api-routes"
import { NextResponse } from "next/server"

export const GET = async () => {
    const db = await prismadb.task.findMany()
    return NextResponse.json(db)
}