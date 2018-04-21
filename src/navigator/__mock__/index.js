import EventEmitter from 'events'
import type { Navigator } from '../type'

export const createNavigator = (): Navigator => {
  const history = [{ query: {}, hash: '', path: '/' }]

  const eventEmitter = new EventEmitter()

  const push = (path: string = '/', query: Object = {}, hash: string = '') =>
    void history.unshift({ query, hash, path })

  return {
    getLocation: () => history[0],

    pushState: push,
    replaceState: push,

    removeListener: fn => void eventEmitter.removeListener('update', fn),
    addListener: fn => void eventEmitter.addListener('update', fn),

    push: (...args) => {
      push(...args)
      eventEmitter.emit('update')
    },

    history,

    back: () => {
      history.shift()
      eventEmitter.emit('update')
    },
  }
}
