import { Link } from './Link';

export class SiteMap {
  info: Array<Link>;
  communication: Array<Link>;
  account: Array<Link>;
  offer: Array<Link>;

  constructor(
    info: Array<Link> = [],
    communication: Array<Link> = [],
    account: Array<Link> = [],
    offer: Array<Link> = []
  ) {
    this.info = info;
    this.communication = communication;
    this.account = account;
    this.offer = offer;
  }

  setInfo(info: Array<Link>) {
    this.info = info;
  }

  setCommunication(communication: Array<Link>) {
    this.communication = communication;
  }

  setAccount(account: Array<Link>) {
    this.account = account;
  }

  setOffer(offer: Array<Link>) {
    this.offer = offer;
  }
}
