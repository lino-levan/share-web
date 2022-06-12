import type { NextApiRequest, NextApiResponse } from 'next'
import { Sequelize } from "sequelize";
import { createModels } from '../../../lib/createModels';

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

const { Program } = createModels(sequelize)

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query

  // get program by id
  const program = (await Program.findOne({
    where: { id },
  }) as any)?.dataValues

  res.status(200).json(program)
}

export default handler