import { Image, ImageObject } from './Image';

export type ProductObject = {
  id: string;
  title: string;
  description: string;
  features: string[];
  content: string;
  price: number;
  icon: string;
  gallery: ImageObject[];
  button_icon: string;
  url: string;
  action_word: string | null;
};

export class Product {
  public id: string;
  public title: string;
  public description: string;
  public features: string[];
  public content: string;
  public price: number;
  public icon: string;
  public gallery: Image[];
  public buttonIcon: string;
  public url: string;
  public actionWord: string | null;

  constructor(product: ProductObject) {
    this.id = product.id;
    this.title = product.title;
    this.description = product.description;
    this.features = product.features;
    this.content = product.content;
    this.price = product.price;
    this.icon = product.icon;
    this.gallery = product.gallery
      ? product.gallery.map((img) => new Image(img))
      : [];
    this.buttonIcon = product.button_icon;
    this.url = product.url ?? '';
    this.actionWord = product.action_word ? product.action_word : null;
  }

  toProductObject(): ProductObject {
    return {
      id: '',
      title: '',
      description: '',
      features: [],
      content: '',
      price: 0,
      icon: '',
      gallery: [],
      button_icon: '',
      url: '',
      action_word: null,
    };
  }
}
