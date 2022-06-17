export interface UserModel {
  id: number;
  first_name: string;
  last_name: string;
  age: number;
  role: 'Admin' | 'User'
  city: string;
}
