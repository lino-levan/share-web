import type { Sequelize } from "sequelize"

import { AccountInstance, SessionInstance, UserInstance, VerificationTokenInstance } from "./types"
import * as models from "./models"


export function createModels(client: Sequelize) {
  const defaultModelOptions = { underscored: true, timestamps: true }
  return {
    User:
      client.define<UserInstance>(
        "user",
        models.User,
        defaultModelOptions
      ),
    Account:
      client.define<AccountInstance>(
        "account",
        models.Account,
        defaultModelOptions
      ),
    Session:
      client.define<SessionInstance>(
        "session",
        models.Session,
        defaultModelOptions
      ),
    VerificationToken:
      client.define<VerificationTokenInstance>(
        "verificationToken",
        models.VerificationToken,
        defaultModelOptions
      ),
    Program:
      client.define(
        "program",
        models.Program,
        defaultModelOptions
      ),
  }
}