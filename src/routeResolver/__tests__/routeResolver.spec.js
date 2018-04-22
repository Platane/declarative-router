import { createRouteResolver } from '../index'

it('should route to null if route does not exist', () => {
  const getRoute = createRouteResolver([
    //
    { path: 'u', key: 'u' },
    { path: 'a', key: 'a' },
  ])

  expect(getRoute('b')).toEqual({ key: null, param: {}, path: '/' })
})

it('should route to / if route does not exist, and / if defined', () => {
  const getRoute = createRouteResolver([
    //
    { path: '', key: 'root' },
    { path: 'a', key: 'a' },
  ])

  expect(getRoute('b')).toEqual({ key: 'root', param: {}, path: '/' })
})

it('should route to existing route', () => {
  const getRoute = createRouteResolver([
    //
    { path: 'u', key: 'u' },
    { path: 'a', key: 'a' },
    { path: 'a/b/c', key: 'abc' },
  ])

  expect(getRoute('a/b/c')).toEqual({ key: 'abc', param: {}, path: '/a/b/c' })
})

it('should fallback to closest route', () => {
  const getRoute = createRouteResolver([
    //
    { path: 'u', key: 'u' },
    { path: 'a', key: 'a' },
    { path: 'a/b/c', key: 'abc' },
  ])

  expect(getRoute('a/u/c')).toEqual({ key: 'a', param: {}, path: '/a' })
})

it('should grab param', () => {
  const getRoute = createRouteResolver([
    //
    { path: 'a/:id', key: 'a' },
  ])

  expect(getRoute('a/123')).toEqual({
    key: 'a',
    param: { id: '123' },
    path: '/a/123',
  })
})

it('should grab param 2', () => {
  const getRoute = createRouteResolver([
    //
    { path: 'a', key: 'u' },
    { path: 'a/:b', key: 'b' },
    { path: 'a/:b/c', key: 'c' },
    { path: 'a/:b/w', key: 'w' },
    { path: 'a/:b/c/:d', key: 'd' },
  ])

  expect(getRoute('a/123/c/456')).toEqual({
    key: 'd',
    param: { b: '123', d: '456' },
    path: '/a/123/c/456',
  })
})
