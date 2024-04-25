import { PrismaClient } from "@prisma/client";
import jwt, { VerifyErrors } from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { ITask } from "@/type/task";
import { ISignUpFx } from "@/type/auth";

declare global {
    var cachedPrisma: PrismaClient;
}

let prisma: PrismaClient;
if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
} else {
    if (!global.cachedPrisma) {
        global.cachedPrisma = new PrismaClient();
    }
    prisma = global.cachedPrisma;
}

export const prismadb = prisma;

export const generateTokens = (login: string) => {
    const accessToken = jwt.sign(
      {
        login
      },
      process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY as string,
      {
        expiresIn: '10m',
      }
    )
  
    const refreshToken = jwt.sign(
      {
        login
      },
      process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY as string,
      { expiresIn: '30d' }
    )
  
    return { accessToken, refreshToken }
  }

export const createUserAndGenerateTokens = async (reqBody: ISignUpFx) => {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(reqBody.password, salt)
    await prismadb.user.create({ data: {
      firstName: reqBody.firstName??'',
      secondName: reqBody.secondName??'',
      thirdName: reqBody.thirdName??'',
      login: reqBody.login??'',
      password: hash??'',
      headUserId: reqBody.headUserId??''
      }})
  return generateTokens(reqBody.login)
}

export const findUserByLogin = async (login: string) =>
  prismadb.user.findUnique({
    where: {
      login: login
    }
  })

export const createTask = async (reqBody: ITask) => {
  return await prismadb.task.create({ data: {
    headline: reqBody.headline??'',
    description: reqBody.description??'',
    endDate: reqBody.endDate,
    refreshDate: new Date(),
    priority: reqBody.priority??'',
    status: reqBody.status??'',
    createrId: reqBody.createrId??'',
    responsibleId: reqBody.responsibleId??''
  }})
}

export const getAuthRouteData = async (req: Request) => {
  const token = req.headers.get('authorization')?.split(' ')[1]
  const validatedTokenResult = await isValidAccessToken(token)

return {validatedTokenResult, token}
}

export const isValidAccessToken = async (token: string | undefined) => {
  const baseError = {
    message: 'Unauthorized',
    status: 401,
  }
  let jwtError = null

  if (!token) {
    return {
      ...baseError,
      error: { message: 'jwt is required' },
    }
  }

  await jwt.verify(
    token,
    process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY as string,
    async (err: VerifyErrors | null) => {
      if (err) {
        jwtError = err
      }
    }
  )

  if (jwtError) {
    return {
      ...baseError,
      error: jwtError,
    }
  }

  return { status: 200 }
}

export const parseJwt = (token: string) =>
  JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())

export const deleteTask = async (id: string) => {
  return await prismadb.task.delete({
      where: {
          id: id
      }
  })
}