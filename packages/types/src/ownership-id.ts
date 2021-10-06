export type OwnershipId = string & {
	"__IS_OWNERSHIP_ID__": true
}

export function toOwnershipId(value: string): OwnershipId {
	return value as OwnershipId
}
