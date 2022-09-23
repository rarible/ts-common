export function getRandomId(prefix?: string): string {
	return (prefix ? prefix + "-" : "") + Date.now().toString(36) + "-" + (((Math.random() + 1) * 10**16)).toString(36)
}