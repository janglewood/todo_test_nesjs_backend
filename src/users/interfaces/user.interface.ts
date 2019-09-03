export interface User {
  readonly id: number;
  readonly firstname: string;
  readonly lastname: string;
  readonly email: string;
  readonly description: string;
  readonly username: string;
  readonly password: string;
  readonly role: string;
}