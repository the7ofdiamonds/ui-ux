import { Portfolio } from './Portfolio';
import { Product, ProductObject } from './Product';

export type ProductsObject = {
  id: string | number | null;
  title: string | null;
  description: string | null;
  list: ProductObject[] | null;
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

  fromPortfolio(portfolio: Portfolio) {
    if (portfolio.projects.size > 0) {
      Array.from(portfolio.projects).forEach((project) => {
        if (project?.solution && project.solution?.available === 'product') {
          const product = new Product();
          product.fromProject(project);
          this.list.push(product);
        }
      });
    }
  }

  filterService(id: string | number | null): Product | null {
    if (!id) return null;
    return (
      this.list.find((product) => String(product.id) === String(id)) ?? null
    );
  }

  toProductsObject(): ProductsObject {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      list:
        this.list.length > 0
          ? this.list.map((product) => product.toProductObject())
          : null,
    };
  }
}
