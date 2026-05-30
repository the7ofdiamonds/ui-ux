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
  data: string | null = null;

  constructor(data?: Partial<ImageObject>) {
    this.id = data?.id ?? null;
    this.title = data?.title ?? null;
    this.url = data?.url ?? null;
    this.type = this.url ? this.getTypeFromString(this.url) : 'icon';
    this.className = data?.class_name ?? this.createClassName();
  }

  setID(id: string) {
    this.id = id;
  }

  setData(data: string) {
    this.data = data;
  }

  createClassName(): string | null {
    if (!this.className && this.id && this.type) {
      this.className = `${this.id}-${this.type}`;
    }

    return this.className;
  }

  getTypeFromString(str: string): string {
    if (str.startsWith('data:image/svg+xml')) {
      return 'svg+xml';
    }
    
    const match = str.match(/\.(\w+)(\?.*)?$/);
    return match ? match[1].toLowerCase() : 'unknown';
  }

  async loadSVG(url: string): Promise<string> {
    const res = await fetch(url).catch(() => {  throw new Error(`Failed to fetch SVG from URL: ${url}`); });

    return await res.text().catch(() => { throw new Error(`Failed to read SVG content from response for URL: ${url}`); });
  }

  async createHTMLElement(str?: string): Promise<string | null> {
    try {
      const url = str ?? this.url;

      if (!url) return null;

      let svgString = null;

      if (url.endsWith(".svg")) {
        svgString = this.loadSVG(url).catch(() => null);

        if (svgString) {
          svgString.then(data => {
            if (data) {
              this.setData(data)
            }

            return data;
          })
        }
      }

      if (url.startsWith('data:image/svg+xml')) {
        svgString = '';

        if (url.startsWith('data:image/svg+xml;base64,')) {
          const base64Data = url.replace('data:image/svg+xml;base64,', '');
          svgString = atob(base64Data);
        } else {
          svgString = decodeURIComponent(url.replace('data:image/svg+xml,', ''));
        }

        svgString
          .replace(/<svg([^>]*?)width="[^"]*"([^>]*?)>/, '<svg$1$2>')
          .replace(/<svg([^>]*?)height="[^"]*"([^>]*?)>/, '<svg$1$2>')
          .replace(/<svg/, '<svg width="98" height="96" viewBox="0 0 98 96"');

        this.data = svgString;
      }

      return svgString;
    } catch (error) {
      console.error("Error creating HTML element from SVG:", error);
      return null;
    }


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
