import type { ImageObject } from '../model/Image';
import { Image } from '../model/Image';

export type ProjectURLObject = {
  id: string | null;
  name: string | null;
  url: string | null;
  description: string | null;
  image: ImageObject | null;
};

export class ProjectURL {
  id: string | null;
  name: string | null;
  url: string | null;
  description: string | null;
  image: Image | null;

  constructor(data?: ProjectURLObject | Partial<ProjectURLObject>) {
    this.id = data?.id ? data.id : data?.name ? data.name.toLowerCase() : null;
    this.name = data?.name ? data.name : null;
    this.url = data?.url ? data.url : null;
    this.description = data?.description ? data.description : null;
    this.image = data?.image ? new Image(data.image) : null;
  }

  isValid(url: string): boolean {
    try {

      if (!url) {
        throw new Error('No URL has been provided.');
      }

      if (typeof url !== 'string') {
        throw new Error('URL must be a string.');
      }

      new URL(url);

      return true;
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message);
    }
  }

  setUrl(url: string) {
    try {

      if (!this.isValid(url)) {
        this.url = null;
      }
      
      this.url = url;
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message);
    }
  }

  toProjectURLObject(): ProjectURLObject {
    return {
      id: this.id,
      name: this.name,
      url: this.url,
      description: this.description,
      image: this.image ? this.image.toImageObject() : null,
    };
  }
}
