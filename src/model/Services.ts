import { Service, ServiceObject } from './Service';

export type ServicesObject = {
  id: string | number | null;
  title: string | null;
  description: string;
  list: ServiceObject[];
};

export class Services {
  public id: string | number | null;
  public title: string;
  public description: string | null;
  public list: Service[];

  constructor(services?: ServicesObject) {
    this.id = services?.id ? services.id : null;
    this.title = services?.title ? services.title : 'services';
    this.description = services?.description ? services.description : null;
    this.list = services?.list
      ? services.list.map((service) => new Service(service))
      : [];
  }

  setList(services: Array<Service>) {
    this.list = services;
  }
}
