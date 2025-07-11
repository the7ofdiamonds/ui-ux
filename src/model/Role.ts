export type Capability = Record<string, boolean>;

export type RoleObject = {
  id: number | string | null;
  name: string | null;
  title: string | null;
  capabilities: Array<Capability> | null;
};

export class Role {
  id: number | string | null;
  name: string | null;
  title: string | null;
  capabilities: Array<Capability> | null;

  constructor(role: RoleObject | Partial<RoleObject>) {
    this.id = role.id ? role.id : null;
    this.name = role.name ? role.name : null;
    this.title = role.title ? role.title : null;
    this.capabilities = role.capabilities ? role.capabilities : null;
  }

  toRoleObject(): RoleObject {
    return {
      id: this.id,
      name: this.name,
      title: this.title,
      capabilities: this.capabilities,
    };
  }
}
