export type ActivityId = string & {
	"__IS_ACTIVITY_ID__": true
}

export function toActivityId(value: string): ActivityId {
	return value as ActivityId
}
