export type ImageObject = {
  id: string | number | null;
  title: string | null;
  url: string | null;
  class_name: string | null;
};

export class Image {
  id: string | number | null;
  type: string;
  title: string | null;
  url: string | null;
  className: string | null;
  data: string | null;

  constructor(data?: Partial<ImageObject>) {
    this.id = data?.id ? data.id : null;
    this.title = data?.title ? data.title : null;
    this.url = data?.url ? data.url : null;
    this.className = data?.class_name ? data.class_name : null;
    this.type = this.url ? this.getTypeFromString(this.url) : 'icon';
    this.data = this.url ? this.createHTMLElement(this.url) : null;
  }

  setID(id: string) {
    this.id = id;
  }

  getTypeFromString(str: string): string {
    console.log(str);
    if (str.startsWith('data:image/svg+xml')) {
      return 'svg+xml';
    }
    const match = str.match(/\.(\w+)(\?.*)?$/);
    return match ? match[1].toLowerCase() : 'unknown';
  }

  createHTMLElement(str: string): string | null {
    if (str.startsWith('data:image/svg+xml')) {
      let svgString = '';

      if (str.startsWith('data:image/svg+xml;base64,')) {
        const base64Data = str.replace('data:image/svg+xml;base64,', '');
        svgString = atob(base64Data);
      } else {
        svgString = decodeURIComponent(str.replace('data:image/svg+xml,', ''));
      }

      return svgString
        .replace(/<svg([^>]*?)width="[^"]*"([^>]*?)>/, '<svg$1$2>') // remove existing width
        .replace(/<svg([^>]*?)height="[^"]*"([^>]*?)>/, '<svg$1$2>') // remove existing height
        .replace(/<svg/, '<svg width="98" height="96" viewBox="0 0 98 96"');
    }

    return null;
  }

  setTitle(title: string) {
    this.title = title;
  }

  setURL(url: string) {
    this.url = url;
    this.type = this.getTypeFromString(url);
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
