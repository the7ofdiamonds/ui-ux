import { Service, ServiceObject } from './Service';

export type ServicesObject = {
  id: string;
  title: string;
  description: string;
  list: ServiceObject[];
};

export class Services {
  public id: string;
  public title: string;
  public description: string;
  public list: Service[];

  constructor(services: ServicesObject) {
    this.id = services.id;
    this.title = services.title;
    this.description = services.description;
    this.list = services.list
      ? services.list.map((service) => new Service(service))
      : [];
  }
}
