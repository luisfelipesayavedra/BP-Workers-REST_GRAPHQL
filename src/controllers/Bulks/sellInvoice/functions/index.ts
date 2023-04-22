import { TYPE_DNI } from "../../../../generated/client"

export interface customerExcel {
  id?: string
  firstName: string
  lastName: string
  localCreation: string
  birthDate: string
  email: string
  DNI: string
  gender: string
  phone: string
  profileImg: string
  typeDoc: TYPE_DNI
  country: string
  state: string
  city: string
  address: string
  instagram: string
}