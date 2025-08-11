import { Product, ProductObject } from './Product';

export type ProductsObject = {
  id: string;
  title: string;
  description: string;
  list: ProductObject[];
};

export class Products {
  public id: string | number | null;
  public title: string;
  public description: string | null;
  public list: Product[];

  constructor(products?: ProductsObject) {
    this.id = products?.id ? products.id : null;
    this.title = products?.title ? products.title : 'products';
    this.description = products?.description ? products.description : null;
    this.list = products?.list
      ? products.list.map((product) => new Product(product))
      : [];
  }

  setList(products: Product[]) {
    this.list = products;
  }
}
