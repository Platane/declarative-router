import { navigatorChanged } from './action'

const defaultSelectRouter = x => x.router

const shallowEqual = (a, b) =>
  Object.keys(a).length == Object.keys(b).length &&
  Object.keys(a).every(key => a[key] == b[key])

export const initSideEffect = ({
  navigator,
  selectRouter = defaultSelectRouter,
}) => store => {
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
