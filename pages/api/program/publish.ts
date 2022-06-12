import { Sequelize } from "sequelize";
import mysql2 from 'mysql2'
import { getSession } from "next-auth/react"
import type { NextApiRequest, NextApiResponse } from "next"
import { createModels } from "../../../lib/createModels";

const sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USERNAME!, process.env.DB_PASSWORD!, {
  host: process.env.DB_HOST!,
  dialect: 'mysql',
  dialectOptions: {
      ssl: {
          rejectUnauthorized: true,        
      }
  },
  logging: false
})

const { Program, User } = createModels(sequelize)

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })

  if(!session) {
    res.status(401).json({ error: "Unauthorized" })
  }

  const {title, code, image } = JSON.parse(req.body)

  // get user id by user email
  const user: {id: string} = (await User.findOne({
    where: { email: session?.user?.email },
  }))?.dataValues as any

  const newProgram = await Program.create({
    user: user.id,
    title,
    image,
    code,
    upvotes: 0,
  })

  console.log(newProgram)

  // res
}

export default handler