import { Image, ImageObject } from '@the7ofdiamonds/ui-ux';

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

  setUrl(url: string) {
    this.url = url;
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
