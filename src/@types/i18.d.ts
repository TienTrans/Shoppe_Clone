import 'i18next'
import { defaultNs, resources } from 'src/i18n/i18n'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'home'
    resources: (typeof resources)['vi']
  }
}
