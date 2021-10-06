export type ItemId = string & {
	"__IS_ITEM_ID__": true
}

export function toItemId(value: string): ItemId {
	return value as ItemId
}
