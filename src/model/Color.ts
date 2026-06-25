export type ColorObject = {
  id: string;
  name: string;
  value: string;
};

export class Color {
  id: string;
  name: string;
  value: string;

  constructor(data: Record<string, any> | ColorObject = {}) {
    this.id = data?.id ?? '';
    this.name = data?.name ?? '';
    this.value = data?.value ?? '#000';
  }

  setID(id: string) {
    this.id = id;
  }

  setName(name: string) {
    this.name = name;
  }

  setValue(value: string) {
    this.value = value;
  }

  toColorObject(): ColorObject {
    return {
      id: this.id,
      name: this.name,
      value: this.value,
    };
  }
}
