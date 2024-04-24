import { findUserByLogin, generateTokens } from '@/lib/utils/api-routes'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const reqBody = await req.json()
  const user = await findUserByLogin(reqBody.login)

  if(!user) {
    return NextResponse.json({
        warningMessage: 'Пользователь не существует'
    })
  }

  if (!bcrypt.compareSync(reqBody.password, user.password)) {
    return NextResponse.json({
        warningMassage: 'Неверный пароль'
    })
  }

  const tokens = generateTokens(user.login)

  return NextResponse.json(tokens)
}