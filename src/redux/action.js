import type { Location } from '../navigator/type'

export const goTo = (
  path: string,
  query: { [string]: string } = {},
  hash: string = ''
) => ({
  type: 'declarative-router:goTo',
  payload: {
    path,
    query,
    hash,
  },
})

export const navigatorChanged = (location: Location) => ({
  type: 'declarative-router:navigatorChanged',
  payload: location,
})
