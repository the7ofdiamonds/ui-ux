import { Image } from '@/model/Image';
import { Taxonomy, TaxonomyObject } from '@/model/Taxonomy';

export interface SkillObject extends Omit<TaxonomyObject, 'type'> {
  type?: string | null;
}

export class Skill extends Taxonomy {
  constructor(data?: Partial<SkillObject>) {
    super({ ...data, type: 'skill' });

    this.id = data?.id ? data.id : null;
    this.type = data?.type ? data.type : null;
    this.id = data?.id ? data.id : null;
    this.type = data?.type ? data.type : null;
    this.title = data?.title ? data.title : null;
    this.description = data?.description ? data.description : '';
    this.path =
      data?.path && data?.title ? this.createSlug(data.path, data.title) : null;
    this.usage = data?.usage ?? 0;
    this.image = data?.image
      ? new Image({
          id: this.id,
          title: this.title,
          url: data?.image?.url,
          class_name: data?.image?.class_name,
        })
      : null;
  }

  toSkillObject(): SkillObject {
    return {
      id: this.id,
      type: 'skill',
      title: this.title,
      description: this.description,
      path: this.path,
      image: this.image ? this.image.toImageObject() : null,
      usage: this.usage,
    };
  }
}

export class ProjectType extends Skill {
  readonly path: string = 'project-types';

  constructor(data?: SkillObject | Partial<SkillObject>) {
    super({ ...data, path: 'project-types' });
  }
}

export class Language extends Skill {
  readonly path: string = 'languages';

  constructor(data?: SkillObject | Partial<SkillObject>) {
    super({ ...data, path: 'languages' });
  }
}

export class Framework extends Skill {
  readonly path: string = 'frameworks';

  constructor(data?: SkillObject | Partial<SkillObject>) {
    super({ ...data, path: 'frameworks' });
  }
}

export class Technology extends Skill {
  readonly path: string = 'technologies';

  constructor(data?: SkillObject | Partial<SkillObject>) {
    super({ ...data, path: 'technologies' });
  }
}

export class Service extends Skill {
  readonly path: string = 'services';

  constructor(data?: SkillObject | Partial<SkillObject>) {
    super({ ...data, path: 'services' });
  }
}
