import { ProjectSkillObject } from './ProjectSkill';
import { Skill, SkillObject } from './Skill';

export const getSkillsFrom = <
  T extends { type: string }
>(
  data: Array<SkillObject>|Array<ProjectSkillObject>,
  SkillClass: new (data: SkillObject) => T
): Set<T> => {
  const instance = new SkillClass({} as SkillObject);
  const matchPath = instance.type;

  const set = new Set<T>();

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
    const matchPath = newClass.type;
    
    if (skill.type === matchPath) {
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
