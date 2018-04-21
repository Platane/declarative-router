import { navigatorChanged } from './action'
import type { Navigator } from '../navigator/type'
import type { State } from './reduce'

const defaultSelectRouter = x => x.router

const shallowEqual = (a, b) =>
  Object.keys(a).length == Object.keys(b).length &&
  Object.keys(a).every(key => a[key] == b[key])

type Option = {
  navigator: Navigator,
  selectRouter: (state: Object) => State,
}
export const initSideEffect = ({
  navigator,
  selectRouter = defaultSelectRouter,
}: Option) => store => {
  // when the navigator changed, fire an action
  const onNavigatorChange = () =>
    store.dispatch(navigatorChanged(navigator.getLocation()))

  navigator.addListener(onNavigatorChange)
  onNavigatorChange()

  // when the state router changed,
  // replicate the change on the navigator
  const onStoreChange = () => {
    let { path, hash, query } = selectRouter(store.getState())

    const current = navigator.getLocation()

    if (path != current.path) navigator.pushState(path, query, hash)
    else if (!shallowEqual(query, current.query) || hash !== current.hash)
      navigator.replaceState(path, query, hash)
  }
  const unsubscribe = store.subscribe(onStoreChange)

  return () => {
    unsubscribe()
    navigator.removeListener(onNavigatorChange)
  }
}
