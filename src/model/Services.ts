import type { OfferingsObject } from './Offerings';
import type { ServiceObject } from './Service';
import type { StripeProductsResponse } from './Stripe';

import { Image } from './Image';
import { Offering } from './Offering';
import { Offerings } from './Offerings';
import { Portfolio } from './Portfolio';
import { Service } from './Service';

export type ServicesObject = OfferingsObject<ServiceObject> & {};

export class Services extends Offerings {
  public title: string = 'services';
  public buttonImage: Image = new Image({ class_name: 'fas fa-power-off' });
  public buttonLink: string = '/services';
  public buttonText: string | 'start';
  public override list: Service[];

  constructor(services?: ServicesObject) {
    super(services)
    this.title = services?.title ? services.title : 'services';
    this.description = services?.description ? services.description : null;
    this.buttonImage = services?.button_image
      ? new Image(services.button_image)
      : new Image({ class_name: 'fas fa-power-off' });
    this.buttonLink = services?.button_link
      ? services.button_link
      : '/services';
    this.buttonText = services?.button_text ? services.button_text : 'start';
    this.list = this.fromArrayServiceObject(services?.list);
  }

  setList(services: Array<Service>) {
    this.list = services;
  }

  filterService(id: string | number | null): Service | null {
    if (!id) return null;
    return (
      this.list.find((service) => String(service.id) === String(id)) ?? null
    );
  }

  fromPortfolio(portfolio: Portfolio) {
    if (portfolio.projects.size > 0) {
      Array.from(portfolio.projects).forEach((project) => {
        if (project?.solution && project.solution?.available === 'service') {
          const service = new Service();
          service.fromProject(project);
          this.list.push(service);
        }
      });
    }
  }

  fromStripeProductsResponse(response: StripeProductsResponse | undefined | null) {
    const offeringList = super.fromStripeProductsResponse(response);
    if (offeringList.length <= 0) return [];

    const list: Array<Service> = offeringList
      .filter((offering): offering is Offering => offering?.type === 'product')
      .map((product: Offering) => {
        const prod = new Service();
        prod.fromOffering(product);
        return prod;
      });

    this.setList(list);

    return list;
  }

  fromArrayServiceObject(data: Array<ServiceObject> | undefined | null): Array<Service> {
    if (!data || !Array.isArray(data) || data.length <= 0) return [];

    const list: Array<Service> = data
      .filter((offering): offering is ServiceObject => offering?.type === 'service')
      .map((service) => new Service(service));

    this.setList(list);

    return list;
  }

  listToArrayServiceObject(list: Array<Service> | null): Array<ServiceObject> | null {
    if (!list || !Array.isArray(list) || list.length === 0) return null;
    return list.filter((service): service is Service => service instanceof Service)
      .map((service) => service.toServiceObject());
  }

  toServicesObject(): ServicesObject {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      button_image: this.buttonImage ? this.buttonImage.toImageObject() : null,
      button_link: this.buttonLink,
      button_text: this.buttonText,
      list: this.list
        ? this.list.map((service) => service.toServiceObject())
        : null,
    };
  }
}
