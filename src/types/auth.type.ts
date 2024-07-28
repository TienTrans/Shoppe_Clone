import { SuccessResponse } from 'src/types/utils.type'
import { User } from './user.type'

export type AuthResponse = SuccessResponse<{
  access_token: string
  expires: number
  user: User
  refresh_token: string
  expires_refresh: number
}>

export type RefeshTokenReponse = SuccessResponse<{ access_token: string }>
