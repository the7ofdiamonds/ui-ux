import { ISkill, SkillObject } from '@/model/Skill';

export interface ProjectSkillObject
  extends Omit<SkillObject, 'description' | 'path' | 'image'> {
  type: string;
}

export class ProjectSkill implements ISkill {
  id: string | number | null;
  type: string;
  title: string | null;
  usage: number;

  constructor(data?: Partial<ProjectSkillObject>) {
    this.id = data?.id ? data.id : null;
    this.type = data?.type ?? '';
    this.title = data?.title ? data.title : null;
    this.usage = data?.usage ? data.usage : 0;
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
    };
  }
}
