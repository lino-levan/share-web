import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';
import { Sequelize } from "sequelize";
import mysql2 from 'mysql2'
import { createModels } from '../../../../lib/createModels';

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
  const session = await getSession({ req })

  if(!session) {
    res.status(401).json({ error: "Unauthorized" })
  }
  
  const { id } = req.query

  const program = await Program.update(
    { upvotes: sequelize.literal('upvotes + 1') },
    { where: { id } }
  );

  console.log(program)

  res.status(200).json(program)
}

export default handler