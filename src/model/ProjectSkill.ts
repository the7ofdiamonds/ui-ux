import type { ISkill, SkillObject } from '../model/Skill';

export interface ProjectSkillObject
  extends Omit<SkillObject, 'description' | 'image'> {
  type: string | null;
}

export class ProjectSkill implements ISkill {
  id: string | number | null;
  type: string | null;
  title: string | null;
  usage: number;
  path: string | null;

  constructor(data?: Partial<ProjectSkillObject>) {
    this.id = data?.id ? data.id : null;
    this.type = data?.type ?? '';
    this.title = data?.title ? data.title : null;
    this.usage = data?.usage ? data.usage : 0;
    this.path = data?.path ? data.path : null;
  }

  setID(id: string) {
    this.id = id;
  }

  setType(type: string) {
    this.type = type;
  }

  setTitle(title: string) {
    this.title = title;
  }

  setUsage(usage: number) {
    this.usage = usage;
  }

  toProjectSkillObject(): ProjectSkillObject {
    return {
      id: this.id,
      type: this.type,
      title: this.title,
      usage: this.usage,
      path: this.path
    };
  }
}
