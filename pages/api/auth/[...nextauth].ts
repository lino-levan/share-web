import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import SequelizeAdapter from "../../../lib/SequelizeAdapter"
import { Sequelize } from "sequelize"

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
const adapter = SequelizeAdapter(sequelize)

sequelize.authenticate();

sequelize.sync()

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  theme: {
    colorScheme: "light",
  },
  adapter: adapter,
})