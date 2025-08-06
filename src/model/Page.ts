import { ContentObject } from './Content';

export class Page {
  title: string | null;
  contentURL: string | null;
  documentURL: string | null;

  constructor(content: ContentObject) {
    this.title = content?.title ? content.title : null;
    this.contentURL = content?.content_url ? content.content_url : null;
    this.documentURL = content?.document_url ? content.document_url : null;
  }

  setTitle(title: string) {
    this.title = title;
  }

  setContentURL(contentURL: string) {
    this.contentURL = contentURL;
  }

  setDocumentURL(documentURL: string) {
    this.documentURL = documentURL;
  }
}
