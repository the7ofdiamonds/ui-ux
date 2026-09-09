import { ContentURL } from '../model/ContentURL';

export type ContentObject = {
  id: string | null;
  name: string | null;
  path: string | null;
  type: string | null;
  size: number | null;
  download_url: string | null;
  text: string | null;
}

export class Content {
  id: string | null;
  name: string | null;
  path: string | null;
  type: string | null;
  size: number = 0;
  downloadURL: string | null = null;
  text: string | null;

  constructor(data?: Partial<ContentObject>) {
    // Get SHA from github as id
    this.id = data?.id ? data.id : null;
    this.name = data?.name ? data.name : null;
    this.path = data?.path ? data.path : null;
    this.type = data?.type ? data.type : null;
    this.size = data?.size ? data.size : 0;
    this.downloadURL = data?.download_url
      ? new ContentURL({ url: data.download_url }).url
      : null;
    this.text = typeof data?.text === 'string' && data.text.trim() ? data.text : null;
  }

  toContentObject(): ContentObject {
    return {
      id: this.id,
      name: this.name,
      path: this.path,
      type: this.type,
      size: this.size,
      download_url: this.downloadURL,
      text: this.text
    };
  }
}