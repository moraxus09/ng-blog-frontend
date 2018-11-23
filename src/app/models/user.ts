export interface User {
  readonly _id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarSrc?: string;
}
