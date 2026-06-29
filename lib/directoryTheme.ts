export function getDirectoryTheme(isPostgraduate: boolean) {
  return {
    theme: isPostgraduate ? "postgraduate" : "undergraduate",
  };
}
