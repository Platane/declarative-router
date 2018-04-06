export type RouteOption = {
  path: string,
  key: string,
}

export type Route = {
  key: string | null,
  param: { [string]: string },
  path: string,
}
