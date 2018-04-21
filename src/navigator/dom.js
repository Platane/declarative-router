import {
  stringify as querystringStringify,
  parse as querystringParse,
} from 'querystring'
import type { Location, Navigator } from './type'

const toArray = path => path.split('/').filter(Boolean)
const toPath = arr => arr.join('/')

const buildUrl = (pathPrefix: string) => (
  path: string,
  query = {},
  hash: string
) =>
  [
    window.location.origin,

    '/' + toPath([...toArray(pathPrefix), ...toArray(path)]),

    Object.keys(query).length && '?' + querystringStringify(query),

    hash && '#' + hash,
  ]
    .filter(Boolean)
    .join('')

const parsePathname = (pathPrefix: string) => (path: string) => {
  const b = toArray(pathPrefix)
  const p = toArray(path)

  if (b.every((_, i) => b[i] === p[i])) p.splice(0, b.length)
  else throw new Error('base path is not in the location')

  return '/' + toPath(p)
}

export const pushState = (pathPrefix: string) => (...args) =>
  history.pushState({}, '', buildUrl(pathPrefix)(...args))

export const replaceState = (pathPrefix: string) => (...args) =>
  history.replaceState({}, '', buildUrl(pathPrefix)(...args))

export const getLocation = (pathPrefix: string) => (): Location => ({
  path: parsePathname(pathPrefix)(window.location.pathname),
  query: querystringParse((window.location.search || '').replace(/^\?/, '')),
  hash: (window.location.hash || '').replace(/^#/, ''),
})

export const createNavigator = ({
  pathPrefix = '',
}: {
  pathPrefix: string,
} = {}): Navigator => ({
  pushState: pushState(pathPrefix),
  replaceState: replaceState(pathPrefix),
  getLocation: getLocation(pathPrefix),

  addListener: fn => window.addEventListener('popstate', fn),
  removeListener: fn => window.removeEventListener('popstate', fn),
})
