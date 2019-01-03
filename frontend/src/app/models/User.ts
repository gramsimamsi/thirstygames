/*abstraction of User*/
export interface User
{
  user_name: string;
  user_password: string;
  user_role: number;
  user_refresh_token: string;
  _id: string;
}
