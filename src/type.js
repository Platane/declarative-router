export type RouteOption = {
  path: string,
  key: string,
}

export type Route = {
  key: string | null,
  path: string,
  param: { [string]: string },
}
