import { User } from 'src/types/user.type'

export const localStorageEventTarget = new EventTarget()

export const setAccessTokenToLs = (access_token: string) => {
  localStorage.setItem('accessToken', access_token)
}
export const setRefeshTokenToLs = (refresh_token: string) => {
  localStorage.setItem('refreshToken', refresh_token)
}

export const clearLS = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('profile')
  const clearLSEvent = new Event('clearLS')
  localStorageEventTarget.dispatchEvent(clearLSEvent)
}

export const getAccessTokenFromLs = () => {
  return localStorage.getItem('accessToken') || ''
}

export const getRefreshTokenFromLs = () => {
  return localStorage.getItem('refreshToken') || ''
}

export const getProfileFromLS = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}

export const setProfileFromLS = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}
