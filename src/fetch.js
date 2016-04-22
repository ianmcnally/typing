import { polyfill } from 'es6-promise'
import 'whatwg-fetch'

polyfill()

export const fetch = window.fetch
