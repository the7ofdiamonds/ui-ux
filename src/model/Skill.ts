import { Image } from '@/model/Image';
import { Taxonomy, TaxonomyObject } from '@/model/Taxonomy';

export type SkillObject = TaxonomyObject & {};

export interface ISkill {
  id: string | number | null;
  type: string | null;
  title: string | null;
  usage: number;
}

export class Skill extends Taxonomy implements ISkill {
  public id: string | number | null;
  public type: string;
  public title: string | null;
  public description: string | null;
  public path: string | null;
  public image: Image | null;
  public usage: number;

  constructor(data?: Partial<SkillObject>) {
    super({ ...data, type: data?.type ? data.type : 'skill' });
    this.id = data?.id ? data.id : null;
    this.type = data?.type ? data.type : 'skill';
    this.title = data?.title ? data.title : null;
    this.description = data?.description ? data.description : '';
    this.path =
      data?.id && data?.path
        ? `/skill/${data.path}/${data.id}`
        : `/skill/${data?.path}`;
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

  setID(id: string | number): void {
    this.id = id;
    this.path = this.type ? `/skill/${this.type}/${id}` : `/skill/${this.type}`;
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
  readonly type: string = 'project_type';
  path: string = this.id
    ? `/skill/project-type/${this.id}`
    : '/skill/project-type';

  constructor(data?: Partial<SkillObject>) {
    super({
      ...data,
      type: 'project_type',
      path: `/skill/project-type/${data?.id}`,
    });
    this.path = this.id
      ? `/skill/project-type/${this.id}`
      : '/skill/project-type';
  }
}

export class Language extends Skill {
  readonly type: string = 'language';
  path: string;

  constructor(data?: Partial<SkillObject>) {
    super({
      ...data,
      type: 'language',
      path: `/skill/language/${data?.id}`,
    });
    this.path = this.id ? `/skill/language/${this.id}` : '/skill/language';
  }
}

export class Framework extends Skill {
  readonly type: string = 'framework';
  path: string;

  constructor(data?: Partial<SkillObject>) {
    super({
      ...data,
      type: 'framework',
      path: `/skill/framework/${data?.id}`,
    });
    this.path = this.id ? `/skill/framework/${this.id}` : '/skill/framework';
  }
}

export class Technology extends Skill {
  readonly type: string = 'technology';
  path: string;

  constructor(data?: Partial<SkillObject>) {
    super({
      ...data,
      type: 'technology',
      path: `/skill/technology/${data?.id}`,
    });
    this.path = this.id ? `/skill/technology/${this.id}` : '/skill/technology';
  }
}
