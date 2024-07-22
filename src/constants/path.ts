const path = {
  home: '/',
  user: '/user',
  profile: '/user/profile',
  changePassword: '/user/password',
  historyPurchase: '/user/history-purchase',
  login: '/login',
  register: '/register',
  logout: '/logout',
  productDetail: ':id',
  cart: '/cart'
} as const
export default path
