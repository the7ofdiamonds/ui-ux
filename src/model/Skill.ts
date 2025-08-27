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

export class Software extends Skill {
  readonly type: string = 'software';
  path: string = this.id ? `/skill/software/${this.id}` : '/skill/software';

  constructor(data?: Partial<SkillObject>) {
    super({
      ...data,
      type: 'software',
      path: `/skill/software/${data?.id}`,
    });
    this.path = this.id ? `/skill/software/${this.id}` : '/skill/software';
  }
}

export class Database extends Skill {
  readonly type: string = 'database';
  path: string;

  constructor(data?: Partial<SkillObject>) {
    super({
      ...data,
      type: 'database',
      path: `/skill/database/${data?.id}`,
    });
    this.path = this.id ? `/skill/database/${this.id}` : '/skill/database';
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

export class Builder extends Skill {
  readonly type: string = 'builder';
  path: string;

  constructor(data?: Partial<SkillObject>) {
    super({
      ...data,
      type: 'builder',
      path: `/skill/builder/${data?.id}`,
    });
    this.path = this.id ? `/skill/builder/${this.id}` : '/skill/builder';
  }
}

export class Server extends Skill {
  readonly type: string = 'server';
  path: string;

  constructor(data?: Partial<SkillObject>) {
    super({
      ...data,
      type: 'server',
      path: `/skill/server/${data?.id}`,
    });
    this.path = this.id ? `/skill/server/${this.id}` : '/skill/server';
  }
}

export class CICD extends Skill {
  readonly type: string = 'cicd';
  path: string;

  constructor(data?: Partial<SkillObject>) {
    super({
      ...data,
      type: 'cicd',
      path: `/skill/cicd/${data?.id}`,
    });
    this.path = this.id ? `/skill/cicd/${this.id}` : '/skill/cicd';
  }
}

export class Platform extends Skill {
  readonly type: string = 'platform';
  path: string;

  constructor(data?: Partial<SkillObject>) {
    super({
      ...data,
      type: 'platform',
      path: `/skill/platform/${data?.id}`,
    });
    this.path = this.id ? `/skill/platform/${this.id}` : '/skill/platform';
  }
}

export class Cloud extends Skill {
  readonly type: string = 'cloud';
  path: string;

  constructor(data?: Partial<SkillObject>) {
    super({
      ...data,
      type: 'cloud',
      path: `/skill/cloud/${data?.id}`,
    });
    this.path = this.id ? `/skill/cloud/${this.id}` : '/skill/cloud';
  }
}
