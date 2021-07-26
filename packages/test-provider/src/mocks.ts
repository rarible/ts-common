export const testOrderData = {
	types: {
		EIP712Domain: [
			{
				type: "string",
				name: "name",
			},
			{
				type: "string",
				name: "version",
			},
			{
				type: "uint256",
				name: "chainId",
			},
			{
				type: "address",
				name: "verifyingContract",
			},
		],
		AssetType: [
			{
				name: "assetClass",
				type: "bytes4",
			},
			{
				name: "data",
				type: "bytes",
			},
		],
		Asset: [
			{
				name: "assetType",
				type: "AssetType",
			},
			{
				name: "value",
				type: "uint256",
			},
		],
		Order: [
			{
				name: "maker",
				type: "address",
			},
			{
				name: "makeAsset",
				type: "Asset",
			},
			{
				name: "taker",
				type: "address",
			},
			{
				name: "takeAsset",
				type: "Asset",
			},
			{
				name: "salt",
				type: "uint256",
			},
			{
				name: "start",
				type: "uint256",
			},
			{
				name: "end",
				type: "uint256",
			},
			{
				name: "dataType",
				type: "bytes4",
			},
			{
				name: "data",
				type: "bytes",
			},
		],
	},
	domain: {
		name: "Exchange",
		version: "2",
		chainId: 17,
		verifyingContract: "0x551e4009116d489e3c5a98405a9c4b601d250b58",
	},
	primaryType: "Order",
	message: {
		maker: "0x243b39fca7579a3f95bdb6330a8a216cf58f009b",
		makeAsset: {
			assetType: {
				assetClass: "0x973bb640",
				data:
					"0x0000000000000000000000008812cfb55853da0968a02aaaea84cd93ec4b42a10000000000000000000000000000000000000000000000000000000000000700",
			},
			value: "5",
		},
		taker: "0x0000000000000000000000000000000000000000",
		takeAsset: {
			assetType: {
				assetClass: "0xaaaebeba",
				data: "0x",
			},
			value: "1000000000000000",
		},
		salt: "110737562242466701869988304486828331742241400638536321290437284321622182656357",
		start: 0,
		end: 0,
		dataType: "0x4c234266",
		data:
			"0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000e627243104a101ca59a2c629adbcd63a782e837f00000000000000000000000000000000000000000000000000000000000000fa",
	},
}
