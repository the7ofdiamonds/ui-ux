import { User, UserObject } from './User';

export class Author extends User {
  constructor(data?: UserObject) {
    super(data);
  }
}