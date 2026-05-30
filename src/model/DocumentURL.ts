export type DocumentURLObject = {
  url: string | null;
  isValid: boolean;
};

export class DocumentURL {
  url: string | null;
  isValid: boolean;

  constructor(url: string) {
    this.isValid = false;

    try {
      if (typeof url !== 'string') {
        throw new Error('URL must be a string.');
      }

      this.url = new URL(url).href;
    } catch (error) {
      const err = error as Error;
      console.error('Error fetching content:', err);
      this.url = null;
    }

    this.isValid = true;
  }

  toDocumentURLObject(): DocumentURLObject {
    return {
      url: this.url,
      isValid: this.isValid,
    };
  }
}
