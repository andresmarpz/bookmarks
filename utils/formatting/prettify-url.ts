export function prettifyUrl(url: string): string {
  // Remove any protocol prefix (e.g. "https://")
  let prettifiedUrl = url.replace(/(^\w+:|^)\/\//, "")

  // Remove any trailing slashes
  prettifiedUrl = prettifiedUrl.replace(/\/+$/, "")

  // Replace any remaining slashes with a space
  prettifiedUrl = prettifiedUrl.replace(/\//g, " ")

  return prettifiedUrl
}
