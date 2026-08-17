import type { GalleryObject } from '../model/Gallery';
import { Gallery } from '../model/Gallery';
import type { CheckListObject } from '../model/CheckList';
import { CheckList } from '../model/CheckList';
import { ContentURL } from '../model/ContentURL';
import { Task } from '../model/Task';
import { Repo } from '../model/Repo';
import type { ProjectDataObject } from '../model/Project';
import { Tasks } from './Tasks';

export type ProjectDeliveryObject = {
  id: string | number | null;
  check_list: CheckListObject | null;
  gallery: GalleryObject | null;
  content_url: string | null;
};

export type ProjectDeliveryDataObject = {
  id: string | number | null;
  check_list: CheckListObject | null;
  gallery: GalleryObject | null;
  content_url: string | null;
};

export class ProjectDelivery {
  id: string | number | null;
  checkList: CheckList | null;
  gallery: Gallery | null;
  contentURL: ContentURL | null;

  constructor(data?: ProjectDeliveryObject | Partial<ProjectDeliveryObject>) {
    this.id = data?.id ? data.id : null;
    this.checkList = data?.check_list ? new CheckList(data.check_list) : null;
    this.gallery = data?.gallery ? new Gallery(data.gallery) : null;
    this.contentURL = data?.content_url
      ? new ContentURL({ url: data.content_url })
      : null;
  }

  setID(id: string | number) {
    this.id = id;
  }

  setCheckList(checkList: CheckList) {
    this.checkList = checkList;
  }

  setGallery(gallery: Gallery) {
    this.gallery = gallery;
  }

  setContentURL(contentURL: ContentURL) {
    this.contentURL = contentURL;
  }

  fromRepo(repo: Repo) {
    if (repo.contents?.delivery?.downloadURL) {
      this.setContentURL(new ContentURL({ url: repo.contents.delivery.downloadURL }));
    }

    if (repo?.issues && repo.issues?.delivery) {
      const tasks = new Tasks();
      tasks.setList(new Set(repo.issues.delivery));

      const checkList = new CheckList();
      checkList.setTasks(tasks);
      this.setCheckList(checkList);
    }

    return this;
  }

  fromDocumentData(data: ProjectDataObject) {
    if (data.process?.delivery) {
      if (
        data.process.delivery.gallery &&
        ((data.process.delivery.gallery.animations &&
          data.process.delivery.gallery.animations?.length > 0) ||
          (data.process.delivery.gallery.icons &&
            data.process.delivery.gallery.icons.length > 0) ||
          (data.process.delivery.gallery.logos &&
            data.process.delivery.gallery.logos.length > 0) ||
          (data.process.delivery.gallery.previews &&
            data.process.delivery.gallery.previews.length > 0) ||
          (data.process.delivery.gallery.screenshots &&
            data.process.delivery.gallery.screenshots.length > 0) ||
          (data.process.delivery.gallery.uml_diagrams &&
            data.process.delivery.gallery.uml_diagrams.length > 0))
      ) {
        const gallery = new Gallery(data.process.delivery.gallery);
        this.setGallery(gallery);
      }
    }
  }

  toProjectDeliveryObject(): ProjectDeliveryObject {
    return {
      id: this.id,
      check_list: this.checkList ? this.checkList.toCheckListObject() : null,
      gallery: this.gallery ? this.gallery.toGalleryObject() : null,
      content_url: this.contentURL ? this.contentURL.url : null,
    };
  }

  toProjectDeliveryDataObject(): ProjectDeliveryDataObject {
    return {
      id: this.id,
      check_list: this.checkList ? this.checkList.toCheckListObject() : null,
      gallery: this.gallery ? this.gallery.toGalleryObject() : null,
      content_url: this.contentURL ? this.contentURL.url : null,
    };
  }
}
