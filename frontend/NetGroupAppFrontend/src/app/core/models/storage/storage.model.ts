import { Item } from "../item/item.model";

export interface Storage {
	id: number;
	userId?: string;
	storageSpace: string;
	createdDate?: Date;
	items?: Item[];
}