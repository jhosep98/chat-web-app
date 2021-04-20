import { RolesBuilder } from 'nest-access-control';

export enum AppRoles {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export enum AppResource {
  USER = 'USER',
}

export const roles: RolesBuilder = new RolesBuilder();

roles
  // Users Roles
  .grant(AppRoles.USER)
  .updateOwn([AppResource.USER])
  .deleteOwn([AppResource.USER]);
