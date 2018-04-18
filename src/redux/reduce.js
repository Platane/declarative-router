import { createRouteResolver } from '../routeResolver'
import type { Route, RouteOption } from '../type'

type State = {
  path: string,
  key: string | null,
  param: { [string]: string },
  query: { [string]: string },
  hash: string,
}

type Action =
  | {
      type: 'declarative-router:goTo' | 'declarative-router:navigatorChanged',
      payload: {
        path: string,
        query: { [string]: string },
        hash: string,
      },
    }
  | any

export const reduce = (routes: RouteOption[]) => {
  const resolveRoute = createRouteResolver(routes)

  return (state: State, action: Action) => {
    switch (action.type) {
      case 'declarative-router:goTo':
      case 'declarative-router:navigatorChanged':
        return {
          ...resolveRoute(action.payload.path),
          query: action.payload.query,
          hash: action.payload.hash,
        }

      default:
        return state || resolveRoute('/')
    }
  }
}
