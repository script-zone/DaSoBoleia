type PropDel<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export function propDel<T, K extends keyof T>(obj: T, props: K[]): PropDel<T, K> {
  const result = { ...obj };
  for (const prop of props) {
    delete result[prop];
  }
  return result;
}
