export type LinkObject = {
  href: string | null;
  text: string | null;
};

export class Link {
  href: string | null;
  text: string | null;

  constructor(data?: Partial<LinkObject>) {
    this.href = data?.href ? data.href : null;
    this.text = data?.text ? data.text : null;
  }

  setHref(href: string) {
    this.href = href;
  }

  setText(text: string) {
    this.text = text;
  }

  toLinkObject(): LinkObject {
    return {
      href: this.href,
      text: this.text,
    };
  }
}
