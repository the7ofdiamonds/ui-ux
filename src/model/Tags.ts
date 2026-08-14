import type { TagObject } from "./Tag";
import { Tag } from "./Tag";

export type TagsObject = Array<TagObject>;

export class Tags {
    list: Array<Tag>;

    constructor(tags: TagsObject) {
        this.list = tags.map((tag: TagObject) => new Tag(tag))
    }
}