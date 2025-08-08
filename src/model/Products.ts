import { Product, ProductObject } from './Product';

export type ProductsObject = {
  id: string;
  title: string;
  description: string;
  list: ProductObject[];
};

export class Products {
  public id: string;
  public title: string;
  public description: string;
  public list: Product[];

  constructor(products: ProductsObject) {
    this.id = products.id;
    this.title = products.title;
    this.description = products.description;
    this.list = products.list.map((product) => new Product(product));
  }

}
