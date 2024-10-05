export class User {
  id: string;
  email: string;
  password?: string;
  firstName?: string;
  lastName?: string;
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export enum AccountType {
  GOOGLE = 'google',
  APPLE = 'apple',
  LOCAL = 'local'
}
