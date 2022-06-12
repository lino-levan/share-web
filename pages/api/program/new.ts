import { Sequelize } from "sequelize";
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
  const programs = (await Program.findAll() as any).map((program: any)=>{
    delete program.dataValues.code
    
    return program.dataValues
  })

  res.status(200).json(programs)
}

export default handler