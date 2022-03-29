export interface Item {
	id: number;
	title: string;
	serialNumber: number;
	quantity: number;
	description: string;
	image: string;
	comments?: string;
	storageId: number;
	createdDate: Date;
	storage?: {
		storageSpace: string;
	}
}