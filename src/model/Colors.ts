import { Color, ColorObject } from '@/model/Color';

export type ColorsObject = {
  list: Array<ColorObject> | null;
};

export class Colors {
  list: Set<Color>;

  constructor(colors?: ColorsObject) {
    this.list =
      colors && colors.list && colors.list.length > 0
        ? new Set(colors.list.map((color) => new Color(color)))
        : new Set();
  }

  setList(list: Set<Color>) {
    this.list = list;
  }

  addColor(color: Color) {
    this.list.add(color);
  }

  removeColor(color: Color) {
    this.list.delete(color);
  }

  existsInSet(color: Color) {
    const map = new Map(
      Array.from(this.list).map((color) => [color.id, color])
    );

    return map.has(color.id);
  }

  toColorsObject(): ColorsObject {
    return {
      list:
        this.list.size > 0
          ? Array.from(this.list).map((color) => color.toColorObject())
          : null,
    };
  }
}
