import type { Account as ApadterAccount } from "next-auth"
import type {
  Adapter,
  AdapterUser,
  AdapterSession,
  VerificationToken,
} from "next-auth/adapters"
import type { Model } from "sequelize"

export interface IProgram {
  id: string
  title: string
  author: string
  authorId: string
  code: string
  upvotes: number
  image: string
}

export interface AccountInstance
  extends Model<ApadterAccount, Partial<ApadterAccount>>,
    ApadterAccount {}
export interface UserInstance
  extends Model<AdapterUser, Partial<AdapterUser>>,
    AdapterUser {}
export interface SessionInstance
  extends Model<AdapterSession, Partial<AdapterSession>>,
    AdapterSession {}
export interface VerificationTokenInstance
  extends Model<VerificationToken, Partial<VerificationToken>>,
    VerificationToken {}