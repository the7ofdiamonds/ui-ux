export type ImageObject = {
  id: string | null;
  title: string | null;
  url: string | null;
  class_name: string | null;
};

export class Image {
  id: string | null;
  title: string | null;
  url: string | null;
  className: string | null;

  constructor(data?: Partial<ImageObject> | ImageObject) {
    this.id = data?.id ? data.id : null;
    this.title = data?.title ? data.title : null;
    this.url = data?.url ? data.url : null;
    this.className = data?.class_name ? data.class_name : null;
  }

  setID(id: string) {
    this.id = id;
  }

  setTitle(title: string) {
    this.title = title;
  }

  setURL(url: string) {
    this.url = url;
  }

  setClassName(className: string) {
    this.className = className;
  }

  toImageObject(): ImageObject {
    return {
      id: this.id,
      title: this.title,
      url: this.url,
      class_name: this.className,
    };
  }
}
