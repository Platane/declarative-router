import { initSideEffect, reduce, goTo } from '../index'
import { createNavigator } from '../../navigator/__mock__'
import { createStore, combineReducers } from 'redux'

const routes = [
  { path: '/', key: 'home' },
  { path: '/a', key: 'a' },
  { path: '/u/w', key: 'uw' },
]

const reducer = combineReducers({
  router: reduce(routes),
})

it('should propagate the route to the navigator', () => {
  const navigator = createNavigator()

  const store = createStore(reducer)

  initSideEffect({ navigator })(store)

  store.dispatch(goTo('/a'))

  expect(store.getState().router.key).toBe('a')
  expect(navigator.history[0].path).toBe('/a')
})

it('should propagate the navigator changes to the state', () => {
  const navigator = createNavigator()

  const store = createStore(reducer)

  initSideEffect({ navigator })(store)

  navigator.push('/a')

  expect(store.getState().router.key).toBe('a')
})
