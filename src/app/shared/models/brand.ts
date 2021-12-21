export class Brand {
	id: number = 0;
	name: string = '';
	slug: string = '';
	created_at: string = '';
	updated_at: string = '';
}

export class CreateBrand {
	name: string = '';
	slug: string = '';
}

export class UpdateBrand extends CreateBrand {}
