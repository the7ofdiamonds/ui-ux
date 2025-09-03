import { Gallery, GalleryObject } from '@/model/Gallery';
import { Color, ColorObject } from '@/model/Color';
import { Colors, ColorsObject } from '@/model/Colors';
import { CheckList, CheckListObject } from '@/model/CheckList';
import { ContentURL, ContentURLObject } from '@/model/ContentURL';
import { Task } from '@/model/Task';
import { Repo } from '@/model/Repo';
import { ProjectDataObject } from '@/model/Project';
import { Tasks } from './Tasks';

export type ProjectDesignObject = {
  gallery: GalleryObject | null;
  check_list: CheckListObject | null;
  colors: ColorsObject | null;
  content_url: string | null;
};

export type ProjectDesignDataObject = {
  gallery: GalleryObject | null;
  check_list: CheckListObject | null;
  colors: ColorsObject | null;
  content_url: string | null;
};

export class ProjectDesign {
  gallery: Gallery | null;
  checkList: CheckList | null;
  colors: Colors | null;
  contentURL: ContentURL | null;

  constructor(data?: Partial<ProjectDesignObject>) {
    this.gallery = data?.gallery ? new Gallery(data.gallery) : null;
    this.checkList = data?.check_list ? new CheckList(data.check_list) : null;
    this.colors =
      data?.colors &&
      data.colors?.list &&
      Array.isArray(data.colors.list) &&
      data.colors.list.length > 0
        ? new Colors(data.colors)
        : null;
    this.contentURL = data?.content_url
      ? new ContentURL(data.content_url)
      : null;
  }

  setGallery(gallery: Gallery) {
    this.gallery = gallery;
  }

  setCheckList(checkList: CheckList) {
    this.checkList = checkList;
  }

  setColors(colors: Colors) {
    this.colors = colors;
  }

  setContentURL(url: string) {
    this.contentURL = new ContentURL(url);
  }

  fromRepo(repo: Repo) {
    if (repo.contents?.design?.downloadURL) {
      this.setContentURL(repo.contents.design.downloadURL);
    }

    if (repo?.issues && repo.issues?.design) {
      const tasks = new Tasks();
      tasks.setList(new Set(repo.issues.design));

      const checkList = new CheckList();
      checkList.setTasks(tasks);
      this.setCheckList(checkList);
    }
  }

  fromDocumentData(data: ProjectDataObject) {
    if (data.process && data.process.design) {
      const design = data.process.design;

      if (
        design.gallery &&
        ((design.gallery.animations && design.gallery.animations?.length > 0) ||
          (design.gallery.icons && design.gallery.icons.length > 0) ||
          (design.gallery.logos && design.gallery.logos.length > 0) ||
          (design.gallery.previews && design.gallery.previews.length > 0) ||
          (design.gallery.screenshots &&
            design.gallery.screenshots.length > 0) ||
          (design.gallery.uml_diagrams &&
            design.gallery.uml_diagrams.length > 0))
      ) {
        const gallery = new Gallery(design.gallery);
        this.setGallery(gallery);
      }

      if (design.colors && design.colors.list) {
        const colors = new Colors();
        colors.setList(
          new Set(design.colors.list.map((color) => new Color(color)))
        );
        this.setColors(colors);
      }
    }
  }

  toProjectDesignObject(): ProjectDesignObject {
    return {
      gallery: this.gallery ? this.gallery.toGalleryObject() : null,
      check_list: this.checkList ? this.checkList.toCheckListObject() : null,
      colors: this.colors ? this.colors.toColorsObject() : null,
      content_url: this.contentURL ? this.contentURL.url : null,
    };
  }

  toProjectDesignDataObject(): ProjectDesignDataObject {
    return {
      gallery: this.gallery ? this.gallery.toGalleryObject() : null,
      check_list: this.checkList ? this.checkList.toCheckListObject() : null,
      colors: this.colors ? this.colors.toColorsObject() : null,
      content_url: this.contentURL?.url ? this.contentURL.url : null,
    };
  }
}
