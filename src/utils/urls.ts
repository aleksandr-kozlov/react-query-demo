export function getServerUrl(path: string) {
  return `http://localhost:3000${path}`;
}

export function getStaticUrl(path: string) {
  return `http://localhost:3000/static/${path}`;
}
