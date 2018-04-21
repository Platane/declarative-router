import type { Route, RouteOption } from '../type'

type RouteTree = {
  // the node have a key if it is reachable
  key: string | null,

  children: {
    __var__?: { varName: string, next: RouteTree },

    [string]: RouteTree,
  },
}

const createRouteTree = (routes: RouteOption[]): RouteTree => {
  const routeTree = {
    key: null,
    children: {},
  }

  routes.forEach(r => {
    let node: RouteTree = routeTree

    r.path
      .split('/')
      .filter(Boolean)
      .forEach(l => {
        if (l[0] === ':') {
          // it's a parameter

          const next = {
            key: null,
            children: {},
          }

          node.children['__var__'] = node.children['__var__'] || {
            varName: l.slice(1),
            next: next,
          }

          node = next
        } else {
          node = node.children[l] = node.children[l] || {
            key: null,
            children: {},
          }
        }
      })

    node.key = r.key
  })

  return routeTree
}

export const createRouteResolver = (routes: RouteOption[]) => {
  const routeTree: RouteTree = createRouteTree(routes)

  return (path: string): Route => {
    const param: { [string]: string } = {}

    let node = routeTree
    let matchingPath = []
    let validKey = routeTree.key || null
    let validPath = validKey && '/'

    path
      .split('/')
      .filter(Boolean)
      .forEach(l => {
        if (node.children[l]) {
          // exact match
          node = node.children[l]
        } else if (node.children['__var__']) {
          // match the variable
          const { next, varName } = node.children['__var__']
          node = next
          param[varName] = l
        }
        // no match
        else return

        matchingPath.push(l)

        if (node.key) {
          validKey = node.key
          validPath = '/' + matchingPath.join('/')
        }
      })

    return {
      key: validKey,
      path: validPath || '/',
      param,
    }
  }
}
