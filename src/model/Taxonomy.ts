import { snakeCaseToPath } from '@/utils/String';
import { Image, ImageObject } from './Image';

export type TaxonomyObject = {
  id: string | null;
  type: string | null;
  title: string | null;
  path: string | null;
  description?: string | null;
  image?: ImageObject | null;
  usage?: number;
};

export class Taxonomy {
  id: string | null;
  type: string | null;
  title: string | null;
  description: string | null;
  path: string | null;
  image: Image | null;
  usage: number;

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

  setTitle(title: string) {
    this.title = title;
  }

  setUsage(usage: number) {
    this.usage = usage;
  }

  createSlug(path: string, title: string) {
    return `${path}/${title}`;
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
