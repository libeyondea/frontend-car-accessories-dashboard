export class CreateProduct {
	image: File | null = null;
	category: number = 0;
	brand: number = 0;
	name: string = '';
	slug: string = '';
	details: string = '';
	price: number = 0;
	discount: number = 0;
	quantity: number = 0;
}

export class UpdateProduct extends CreateProduct {}
