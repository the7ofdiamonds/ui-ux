import { Image, ImageObject } from './Image';
import { Portfolio } from './Portfolio';
import { Service, ServiceObject } from './Service';

export type ServicesObject = {
  id: string | number | null;
  title: string | null;
  description: string | null;
  button_image: ImageObject | null;
  button_link: string | null;
  button_text: string | null;
  list: ServiceObject[] | null;
};

export class Services {
  public id: string | number | null;
  public title: string = 'services';
  public description: string | null;
  public buttonImage: Image = new Image({ class_name: 'fas fa-power-off' });
  public buttonLink: string = '/services';
  public buttonText: string | 'start';
  public list: Service[];

  constructor(services?: ServicesObject) {
    this.id = services?.id ? services.id : null;
    this.title = services?.title ? services.title : 'services';
    this.description = services?.description ? services.description : null;
    this.buttonImage = services?.button_image
      ? new Image(services.button_image)
      : new Image({ class_name: 'fas fa-power-off' });
    this.buttonLink = services?.button_link
      ? services.button_link
      : '/services';
    this.buttonText = services?.button_text ? services.button_text : 'start';
    this.list = services?.list
      ? services.list.map((service) => new Service(service))
      : [];
  }

  setList(services: Array<Service>) {
    this.list = services;
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

  filterService(id: string | number | null): Service | null {
    if (!id) return null;
    return (
      this.list.find((service) => String(service.id) === String(id)) ?? null
    );
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
