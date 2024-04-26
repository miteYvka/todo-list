import { getTasks, prismadb } from "@/lib/utils/api-routes"
import { NextResponse } from "next/server"

export const GET = async () => {
    return NextResponse.json(await getTasks())
}