export type Location = {
  path: string,
  query: Object,
  hash: string,
}

export type Navigator = {
  pushState: (path: string, query?: Object, hash?: string) => void,
  replaceState: (path: string, query?: Object, hash?: string) => void,
  getLocation: () => Location,

  addListener: (fn: () => void) => void,
  removeListener: (fn: () => void) => void,
}
