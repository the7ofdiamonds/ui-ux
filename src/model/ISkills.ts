import { ProjectSkillObject } from './ProjectSkill';
import { Skill, SkillObject } from './Skill';

export const getSkillsFrom = <
  T extends { type: string },
  U extends { path: string }
>(
  data: Array<T>,
  SkillClass: new (data: T) => U
): Set<U> => {
  const instance = new SkillClass({} as T);
  const matchPath = instance.path;

  const set = new Set<U>();

  data.forEach((item) => {
    if (item.type === matchPath) {
      set.add(new SkillClass(item));
    }
  });

  return set;
};

export const getSkillsOfType = <
  T extends Skill,
  D extends Partial<ProjectSkillObject> | Partial<SkillObject>
>(
  skills: Skill[],
  SkillClass: new (data: D) => T
): Set<T> => {
  const set = new Set<T>();

  skills.forEach((skill) => {
    const newClass = new SkillClass({} as D);
    const matchPath = newClass.path;
    
    if (skill.path === matchPath) {
      newClass.setID(skill.id ?? '');
      newClass.setType(skill.type ?? '');
      newClass.setTitle(skill.title ?? '');
      newClass.setDescription(skill.description ?? '');
      newClass.setPath(skill.path ?? '');
      skill.image ? newClass.setImage(skill.image) : null;
      newClass.setUsage(skill.usage ?? 0);

      set.add(newClass);
    }
  });

  return set;
};
