export class Category {
	id: number = 0;
	name: string = '';
	slug: string = '';
	created_at: string = '';
	updated_at: string = '';
}

export class CreateCategory {
	name: string = '';
	slug: string = '';
}

export class UpdateCategory extends CreateCategory {}
