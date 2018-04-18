import EventEmitter from 'events'

export const createNavigator = () => {
  const history = [{ query: {}, hash: {}, path: '/' }]

  const eventEmitter = new EventEmitter()

  const push = (path = '/', query = {}, hash = {}) =>
    history.unshift({ query, hash, path })

  return {
    getLocation: () => history[0],

    pushState: push,
    replaceState: push,

    removeListener: fn => eventEmitter.removeListener('update', fn),
    addListener: fn => eventEmitter.addListener('update', fn),

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
