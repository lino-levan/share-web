import type {
  Adapter,
} from "next-auth/adapters"
import type { Sequelize, ModelStatic } from "sequelize"
import { createModels } from "../createModels"
import * as defaultModels from "../models"
import { AccountInstance, SessionInstance, UserInstance, VerificationTokenInstance } from "../types"

export { defaultModels as models }

// @see https://sequelize.org/master/manual/typescript.html


interface SequelizeAdapterOptions {
  synchronize?: boolean
  models?: Partial<{
    User: ModelStatic<UserInstance>
    Account: ModelStatic<AccountInstance>
    Session: ModelStatic<SessionInstance>
    VerificationToken: ModelStatic<VerificationTokenInstance>
  }>
}

export default function SequelizeAdapter(
  client: Sequelize,
  options?: SequelizeAdapterOptions
): Adapter {
  const { models, synchronize = true } = options ?? {}
  const defaultModelOptions = { underscored: true, timestamps: true }
  const { User, Account, Session, VerificationToken, Program } = createModels(client)
  let _synced = false
  const sync = async () => {
    if (process.env.NODE_ENV !== "production" && synchronize && !_synced) {
      const syncOptions =
        typeof synchronize === "object" ? synchronize : undefined

      await Promise.all([
        User.sync(syncOptions),
        Account.sync(syncOptions),
        Session.sync(syncOptions),
        VerificationToken.sync(syncOptions),
        Program.sync(syncOptions)
      ])

      _synced = true
    }
  }

  return {
    async createUser(user) {
      await sync()

      return await User.create(user)
    },
    async getUser(id) {
      await sync()

      const userInstance = await User.findByPk(id)

      return userInstance?.get({ plain: true }) ?? null
    },
    async getUserByEmail(email) {
      await sync()

      const userInstance = await User.findOne({
        where: { email },
      })

      return userInstance?.get({ plain: true }) ?? null
    },
    async getUserByAccount({ provider, providerAccountId }) {
      await sync()

      const accountInstance = await Account.findOne({
        where: { provider, providerAccountId },
      })

      if (!accountInstance) {
        return null
      }

      const userInstance = await User.findByPk(accountInstance.userId)

      return userInstance?.get({ plain: true }) ?? null
    },
    async updateUser(user) {
      await sync()

      await User.update(user, { where: { id: user.id } })
      const userInstance = await User.findByPk(user.id)

      return userInstance!
    },
    async deleteUser(userId) {
      await sync()

      const userInstance = await User.findByPk(userId)

      await User.destroy({ where: { id: userId } })

      return userInstance
    },
    async linkAccount(account) {
      await sync()

      await Account.create(account)
    },
    async unlinkAccount({ provider, providerAccountId }) {
      await sync()

      await Account.destroy({
        where: { provider, providerAccountId },
      })
    },
    async createSession(session) {
      await sync()

      return await Session.create(session)
    },
    async getSessionAndUser(sessionToken) {
      await sync()

      const sessionInstance = await Session.findOne({
        where: { sessionToken },
      })

      if (!sessionInstance) {
        return null
      }

      const userInstance = await User.findByPk(sessionInstance.userId)

      if (!userInstance) {
        return null
      }

      return {
        session: sessionInstance?.get({ plain: true }),
        user: userInstance?.get({ plain: true }),
      }
    },
    async updateSession({ sessionToken, expires }) {
      await sync()

      await Session.update(
        { expires, sessionToken },
        { where: { sessionToken } }
      )

      return await Session.findOne({ where: { sessionToken } })
    },
    async deleteSession(sessionToken) {
      await sync()

      await Session.destroy({ where: { sessionToken } })
    },
    async createVerificationToken(token) {
      await sync()

      return await VerificationToken.create(token)
    },
    async useVerificationToken({ identifier, token }) {
      await sync()

      const tokenInstance = await VerificationToken.findOne({
        where: { identifier, token },
      })

      await VerificationToken.destroy({ where: { identifier } })

      return tokenInstance?.get({ plain: true }) ?? null
    },
  }
}