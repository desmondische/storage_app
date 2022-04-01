export interface Item {
	id: number;
	userId?: string;
	title: string;
	description: string;
	imagePath: string;
	storageId: number;
	
	quantity?: number;
	serialNumber?: string;
	comments?: string;
	createdDate?: Date;
	storage?: {
		storageSpace: string;
	}
}