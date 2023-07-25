export type ParamsType = {
  [param: string]:
    | string
    | number
    | boolean
    | ReadonlyArray<string | number | boolean>;
};

export function injectPathVariables(path: string, params: ParamsType) {
  for (const param in params) {
    path = path.replace(`:${param}`, `${params[param]}`);
  }
  return path;
}
