import { Dispatch } from "react"

interface User {
  email?: string,
  full_name?:  string,
  last_seen?: Date,
  photo_url?: string,
}

export interface Wallet {
}
interface Category {
}
interface Transaction {
}

interface AbstractStore<T> {
  data: Promise<T>[]
}

export default interface StoreType {
  dispatch: Dispatch<any>
  loggedInUser: User,
  wallet: AbstractStore<Wallet>,
  category: AbstractStore<Category>,
  transaction: AbstractStore<Transaction>,
}
