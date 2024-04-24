import { NextResponse } from "next/server";
import { findUserByLogin, getAuthRouteData, parseJwt } from "@/lib/utils/api-routes";

export async function GET(req: Request) {
    try {
        const {validatedTokenResult, token} = await getAuthRouteData(req)

        if (validatedTokenResult.status !== 200) {
            return NextResponse.json(validatedTokenResult)
        }

        const user = await findUserByLogin(parseJwt(token as string).login)

        return NextResponse.json({ status: 200, massage: 'token is valid', user })
    } catch (error) {
        throw new Error((error as Error).message);
        
    }
}