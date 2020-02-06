import { Role } from './role';

export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    role: Role;
    token?: string;
}

export class Member {
  username: string;
  password: string;
  tel: string;
  line: string;
  email: string;
  recomment: string;
  role: Role;
  status: string;
}
