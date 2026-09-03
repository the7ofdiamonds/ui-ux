import type { OfferingsObject } from './Offerings';
import type { ProductObject } from './Product';
import type { StripeProductsResponse } from './Stripe';

import { Image } from './Image';
import { Offering } from './Offering';
import { Offerings } from './Offerings';
import { Portfolio } from './Portfolio';
import { Product } from './Product';

export type ProductsObject = OfferingsObject<ProductObject> & {};

export class Products extends Offerings {
  public title: string = 'products';
  public buttonImage: Image = new Image({
    class_name: 'fa-brands fa-wpexplorer',
  });
  public buttonLink: string = '/products';
  public buttonText: string | 'explore';
  public override list: Product[] = [];

  constructor(products?: Partial<ProductsObject>) {
    super(products)
    this.title = products?.title ? products.title : 'products';
    this.buttonImage = products?.button_image
      ? new Image(products.button_image)
      : new Image({ class_name: 'fa-brands fa-wpexplorer' });
    this.buttonLink = products?.button_link
      ? products.button_link
      : '/products';
    this.buttonText = products?.button_text ? products.button_text : 'explore';
    this.list = this.fromArrayProductObject(products?.list);
  }

  setList(products: Product[]) {
    this.list = products;
  }

  filterService(id: string | number | null): Product | null {
    if (!id || !this.list) return null;
    return (
      this.list.find((product) => String(product.id) === String(id)) ?? null
    );
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

  fromStripeProductsResponse(response: StripeProductsResponse | undefined | null) {
    const offeringList = super.fromStripeProductsResponse(response);
    if (offeringList.length <= 0) return [];

    const list: Array<Product> = offeringList
      .filter((offering): offering is Offering => offering?.type === 'product')
      .map((product: Offering) => {
        const prod = new Product();
        prod.fromOffering(product);
        return prod;
      });

    this.setList(list);

    return list;
  }

  fromArrayProductObject(data: Array<ProductObject> | undefined | null): Array<Product> {
    if (!data || !Array.isArray(data) || data.length <= 0) return [];

    const list: Array<Product> = data
      .filter((offering): offering is ProductObject => offering?.type === 'product')
      .map((product) => new Product(product));

    this.setList(list);

    return list;
  }

  listToArrayProductObject(list: Array<Product> | null): Array<ProductObject> | null {
    if (!list || !Array.isArray(list) || list.length === 0) return null;
    return list.filter((product): product is Product => product instanceof Product)
      .map((product) => product.toProductObject());
  }

  toProductsObject(): ProductsObject {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      button_image: this.buttonImage ? this.buttonImage.toImageObject() : null,
      button_link: this.buttonLink,
      button_text: this.buttonText,
      list: this.listToArrayProductObject(this.list)
    };
  }
}
