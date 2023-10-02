export function isCircular(obj: unknown) {
  const seenObjects: unknown[] = []

  function detect(obj: unknown) {
    if (obj && typeof obj === "object") {
      if (seenObjects.indexOf(obj) !== -1) {
        return true
      }
      seenObjects.push(obj)
      for (var key in obj) {
        if (obj.hasOwnProperty(key) && detect(obj[key as keyof typeof obj])) {
          console.log(obj, "cycle at " + key)
          return true
        }
      }
    }
    return false
  }

  return detect(obj)
}
