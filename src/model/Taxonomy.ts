import { snakeCaseToPath } from '@/utils/String';
import { Image, ImageObject } from './Image';

export type TaxonomyObject = {
  id: string | number | null;
  type: string | null;
  title: string | null;
  path: string | null;
  description?: string | null;
  image?: ImageObject | null;
  usage?: number;
};

export class Taxonomy {
  public id: string | number | null;
  public type: string | null;
  public title: string | null;
  public description: string | null;
  public path: string | null;
  public image: Image | null;
  public usage: number;

  constructor(data?: TaxonomyObject | Partial<TaxonomyObject>) {
    this.id = data?.id ? data.id : null;
    this.type = data?.type ? data.type : null;
    this.title = data?.title ? data.title : null;
    this.description = data?.description ? data.description : '';
    this.path =
      data?.path && data?.title ? this.createSlug(data.path, data.title) : null;
    this.usage = data?.usage ?? 0;
    this.image = data?.image
      ? new Image({
          id: this.id,
          title: this.title,
          url: data?.image?.url,
          class_name: data?.image?.class_name,
        })
      : null;
  }

  setID(id: string) {
    this.id = id;
  }

  setType(type: string) {
    this.type = type;
  }

  setTitle(title: string) {
    this.title = title;
  }

  setDescription(description: string) {
    this.description = description;
  }

  setPath(path: string) {
    this.path = path;
  }

  setImage(image: Image) {
    this.image = image;
  }

  setUsage(usage: number) {
    this.usage = usage;
  }

  createSlug(path: string, id: string) {
    return `${path}/${id}`;
  }

  getSlug() {
    return `${this.path}/${this.id}`;
  }

  isValid(): boolean {
    if (this.id == '') {
      throw new Error('ID is not valid');
    }

    if (this.type == '') {
      throw new Error('Type is not valid');
    }

    if (this.title == '') {
      throw new Error('Title is not valid');
    }

    if (this.path == '') {
      throw new Error('Path is not valid');
    }

    return true;
  }

  toTaxonomyObject(): TaxonomyObject {
    return {
      id: this.id,
      type: this.type,
      title: this.title,
      description: this.description,
      path: this.path,
      image: this.image ? this.image.toImageObject() : null,
      usage: this.usage,
    };
  }
}
