import { RolesBuilder } from 'nest-access-control';

export enum AppRoles {
  CONTACT = 'CONTACT',
  ADMIN = 'ADMIN',
}

export enum AppResource {
  USER = 'USER',
}

export const roles: RolesBuilder = new RolesBuilder();

roles
  // Users Roles
  .grant(AppRoles.CONTACT)
  .updateOwn([AppResource.USER])
  .deleteOwn([AppResource.USER])
  // Admin Roles
  .grant(AppRoles.ADMIN)
  .extend(AppRoles.CONTACT)
  .createAny([AppResource.USER])
  .updateAny([AppResource.USER])
  .deleteAny([AppResource.USER]);
