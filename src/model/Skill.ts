import { Image } from '@/model/Image';
import { Taxonomy, TaxonomyObject } from '@/model/Taxonomy';

export interface SkillObject extends Omit<TaxonomyObject, 'type'> {
  type: string;
}

export interface ISkill {
  id: string | null;
  type: string;
  title: string | null;
  usage: number;
}

export class Skill extends Taxonomy implements ISkill {
  public id: string | null;
  public type: string = 'skill';
  public title: string | null;
  public description: string | null;
  public path: string | null;
  public image: Image | null;
  public usage: number;

  constructor(data?: Partial<SkillObject>) {
    super({ ...data, type: 'skill' });

    this.id = data?.id ? data.id : null;
    this.title = data?.title ? data.title : null;
    this.description = data?.description ? data.description : '';
    this.path = data?.path ? data.path : null;
    this.image = data?.image
      ? new Image({
          id: this.id,
          title: this.title,
          url: data?.image?.url,
          class_name: data?.image?.class_name,
        })
      : null;
    this.usage = data?.usage ?? 0;
  }

  toSkillObject(): SkillObject {
    return {
      id: this.id,
      type: this.type,
      title: this.title,
      description: this.description,
      path: this.path,
      image: this.image ? this.image.toImageObject() : null,
      usage: this.usage,
    };
  }
}

export class ProjectType extends Skill {
  readonly path: string = 'project-type';

  constructor(data?: SkillObject | Partial<SkillObject>) {
    super({ ...data, path: 'project-type' });
  }
}

export class Language extends Skill {
  readonly path: string = 'language';

  constructor(data?: SkillObject | Partial<SkillObject>) {
    super({ ...data, path: 'language' });
  }
}

export class Framework extends Skill {
  readonly path: string = 'framework';

  constructor(data?: SkillObject | Partial<SkillObject>) {
    super({ ...data, path: 'framework' });
  }
}

export class Technology extends Skill {
  readonly path: string = 'technology';

  constructor(data?: SkillObject | Partial<SkillObject>) {
    super({ ...data, path: 'technology' });
  }
}

export class Service extends Skill {
  readonly path: string = 'service';

  constructor(data?: SkillObject | Partial<SkillObject>) {
    super({ ...data, path: 'service' });
  }
}
