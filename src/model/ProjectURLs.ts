import { Image } from '../model/Image';

import type { ProjectURLObject } from '../model/ProjectURL';
import { ProjectURL } from '../model/ProjectURL';

export type ProjectURLsObject = {
  id: string | number | null;
  homepage: Partial<ProjectURLObject> | null;
  ios: Partial<ProjectURLObject> | null;
  android: Partial<ProjectURLObject> | null;
};

export type ProjectURLsDataObject = {
  id: string | number | null;
  homepage: string | null;
  ios: string | null;
  android: string | null;
};

export class ProjectURLs {
  id: string | number | null;
  homepage: ProjectURL | null;
  ios: ProjectURL | null;
  android: ProjectURL | null;

  constructor(data?: Partial<ProjectURLsObject>) {
    this.id = data?.id ? data.id : null;
    this.homepage = data?.homepage?.url ? this.getHomepage(data.homepage.url) : null;
    this.ios = data?.ios?.url ? this.getIos(data.ios.url) : null;
    this.android = data?.android?.url ? this.getAndroid(data.android.url) : null;
  }

  setID(id: string | number) {
    this.id = id;
  }

  setHomepage(url: string) {
    try {
      let name = 'Homepage';
      const projectURL = new ProjectURL({
        id: name.toLowerCase(),
        name: name,
        description: 'Website of the project',
        image: new Image({
          id: name.toLowerCase(),
          class_name: 'fa-solid fa-house',
        }).toImageObject(),
      });

      projectURL.setUrl(url)

      this.homepage = projectURL;
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message);
    }
  }

  getHomepage(url: string) {
    let name = 'Homepage';

    return new ProjectURL({
      id: name.toLowerCase(),
      name: name,
      description: 'Website of the project',
      url: url,
      image: new Image({
        id: name.toLowerCase(),
        class_name: 'fa-solid fa-house',
      }).toImageObject(),
    });
  }

  setIos(url: string) {
    try {
      let name = 'Apple App Store';
      const projectURL = new ProjectURL({
        id: name.toLowerCase(),
        name: name,
        description: 'Link to iOS application',
        image: new Image({
          id: name.toLowerCase(),
          class_name: 'fa fa-brands fa-app-store-ios',
        }).toImageObject(),
      });

      projectURL.setUrl(url)

      this.ios = projectURL
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message);
    }
  }

  getIos(url: string) {
    let name = 'Apple App Store';

    return new ProjectURL({
      id: name.toLowerCase(),
      name: name,
      description: 'Link to iOS application',
      url: url,
      image: new Image({
        id: name.toLowerCase(),
        class_name: 'fa fa-brands fa-app-store-ios',
      }).toImageObject(),
    });
  }

  setAndroid(url: string) {
    try {
      let name = 'Google Play Store';
      const projectURL = new ProjectURL({
        id: name.toLowerCase(),
        name: name,
        description: 'Link to Android application',
        image: new Image({
          id: name.toLowerCase(),
          class_name: 'fa fa-brands fa-google-play',
        }).toImageObject(),
      });

      projectURL.setUrl(url)

      this.android = projectURL;
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message);
    }
  }

  getAndroid(url: string) {
    let name = 'Google Play Store';

    return new ProjectURL({
      id: name.toLowerCase(),
      name: name,
      description: 'Link to Android application',
      url: url,
      image: new Image({
        id: name.toLowerCase(),
        class_name: 'fa fa-brands fa-google-play',
      }).toImageObject(),
    });
  }

  hasData(): boolean {
    return !!(this.homepage) || !!(this.ios) || !!(this.android);
  }

  toProjectURLsObject(): ProjectURLsObject {
    return {
      id: this.id,
      homepage: this.homepage ? this.homepage.toProjectURLObject() : null,
      ios: this.ios ? this.ios.toProjectURLObject() : null,
      android: this.android ? this.android.toProjectURLObject() : null,
    };
  }

  toProjectURLsDataObject(): ProjectURLsDataObject {
    return {
      id: this.id,
      homepage: this.homepage?.url ? this.homepage.url : null,
      ios: this.ios?.url ? this.ios.url : null,
      android: this.android?.url ? this.android.url : null,
    };
  }
}