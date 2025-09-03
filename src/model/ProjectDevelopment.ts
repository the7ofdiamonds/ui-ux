import { Gallery, GalleryObject } from '@/model/Gallery';

import { Task, TaskObject } from '@/model/Task';
import {
  ProjectVersions,
  ProjectVersionsObject,
} from '@/model/ProjectVersions';
import {
  isProjectSkillsObject,
  ProjectSkills,
  ProjectSkillsDataObject,
} from '@/model/ProjectSkills';
import { ProjectSkillsObject } from '@/model/ProjectSkills';
import { CheckList, CheckListObject } from '@/model/CheckList';
import { ContentURL } from '@/model/ContentURL';
import { RepoURL } from '@/model/RepoURL';
import { FeaturesRoadmap } from '@/model/FeaturesRoadmap';
import { Repo } from '@/model/Repo';
import { ProjectDataObject } from '@/model/Project';
import { Tasks } from './Tasks';

export type ProjectDevelopmentObject = {
  gallery: GalleryObject | null;
  repo_url: string | null;
  content_url: string | null;
  skills: ProjectSkillsObject | null;
  check_list: CheckListObject | null;
  versions_list: ProjectVersionsObject | null;
};

export type ProjectDevelopmentDataObject = {
  gallery: GalleryObject | null;
  repo_url: string | null;
  content_url: string | null;
  skills: ProjectSkillsDataObject | null;
  check_list: CheckListObject | null;
  versions_list: ProjectVersionsObject | null;
};

export class ProjectDevelopment {
  gallery: Gallery | null;
  repoURL: RepoURL | null;
  contentURL: ContentURL | null;
  skills: ProjectSkills | null;
  checkList: CheckList | null;
  versionsList: ProjectVersions = new ProjectVersions();
  roadmap: FeaturesRoadmap | null;

  constructor(data?: Partial<ProjectDevelopmentObject>) {
    this.gallery = data?.gallery ? new Gallery(data.gallery) : null;
    this.repoURL = data?.repo_url ? new RepoURL(data.repo_url) : null;
    this.contentURL = data?.content_url
      ? new ContentURL(data.content_url)
      : null;
    this.skills =
      data?.skills && isProjectSkillsObject(data.skills)
        ? new ProjectSkills(data.skills)
        : null;
    this.checkList = data?.check_list ? new CheckList(data.check_list) : null;
    this.versionsList = data?.versions_list
      ? new ProjectVersions(data.versions_list)
      : new ProjectVersions();
    this.roadmap = new FeaturesRoadmap();
  }

  setGallery(gallery: Gallery) {
    this.gallery = gallery;
  }

  toArrayTask(data: Array<TaskObject>) {
    const checkList: Array<Task> = [];

    data.forEach((task) => {
      checkList.push(new Task(task));
    });

    return checkList;
  }

  setContentURL(url: string) {
    this.contentURL = new ContentURL(url);
  }

  setSkills(skills: ProjectSkills) {
    this.skills = skills;
  }

  setCheckList(checkList: CheckList) {
    this.checkList = checkList;
  }

  setRepoURL(url: string) {
    this.repoURL = new RepoURL(url);
  }

  setVersionsList(versionsList: ProjectVersions) {
    this.versionsList = versionsList;
  }

  setRoadmap(roadmap: FeaturesRoadmap) {
    this.roadmap = roadmap;
  }

  fromRepo(repo: Repo) {
    if (repo.contents?.development?.downloadURL) {
      this.contentURL = new ContentURL(repo.contents.development.downloadURL);
    }

    if (repo.skills) {
      this.skills = repo.skills;
    }

    if (repo.repoURL) {
      this.repoURL = new RepoURL(repo.repoURL);
    }

    if (repo?.issues && repo.issues?.development) {
      const tasks = new Tasks();
      tasks.setList(new Set(repo.issues.development));

      const checkList = new CheckList();
      checkList.setTasks(tasks);
      this.setCheckList(checkList);
    }
  }

  fromDocumentData(data: ProjectDataObject) {
    if (data?.process?.development) {
      if (data.process.development?.skills) {
        this.skills ? this.skills : (this.skills = new ProjectSkills());

        if (this.skills instanceof ProjectSkills) {
          this.skills.fromDocumentData(data);
        }
      }

      if (
        data.process.development.gallery &&
        ((data.process.development.gallery.animations &&
          data.process.development.gallery.animations?.length > 0) ||
          (data.process.development.gallery.icons &&
            data.process.development.gallery.icons.length > 0) ||
          (data.process.development.gallery.logos &&
            data.process.development.gallery.logos.length > 0) ||
          (data.process.development.gallery.previews &&
            data.process.development.gallery.previews.length > 0) ||
          (data.process.development.gallery.screenshots &&
            data.process.development.gallery.screenshots.length > 0) ||
          (data.process.development.gallery.uml_diagrams &&
            data.process.development.gallery.uml_diagrams.length > 0))
      ) {
        const gallery = new Gallery(data?.process.development.gallery);
        this.setGallery(gallery);
      }
    }
  }

  toProjectDevelopmentObject(): ProjectDevelopmentObject {
    return {
      gallery: this.gallery ? this.gallery.toGalleryObject() : null,
      repo_url: this.repoURL ? this.repoURL.url : null,
      content_url: this.contentURL ? this.contentURL.url : null,
      skills:
        this.skills && this.skills instanceof ProjectSkills
          ? this.skills.toProjectSkillsObject()
          : null,
      check_list: this.checkList ? this.checkList.toCheckListObject() : null,
      versions_list: this.versionsList
        ? this.versionsList.toProjectVersionsObject()
        : null,
    };
  }

  toProjectDevelopmentDataObject(): ProjectDevelopmentDataObject {
    return {
      gallery: this.gallery ? this.gallery.toGalleryObject() : null,
      repo_url: this.repoURL ? this.repoURL.url : null,
      content_url: this.contentURL ? this.contentURL.url : null,
      skills: this.skills ? this.skills.toProjectSkillsDataObject() : null,
      check_list: this.checkList ? this.checkList.toCheckListObject() : null,
      versions_list: this.versionsList
        ? this.versionsList.toProjectVersionsObject()
        : null,
    };
  }
}
