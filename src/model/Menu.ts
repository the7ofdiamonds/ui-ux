import { Link, LinkObject } from './Link';

export type MenuObject = {
  links: Array<LinkObject>;
};

export class Menu {
  links: Array<Link>;

  constructor(data?: MenuObject) {
    this.links = data?.links ? data.links.map((link) => new Link(link)) : [];
  }

  setLinks(links: Array<Link>) {
    this.links = links;
  }
}
