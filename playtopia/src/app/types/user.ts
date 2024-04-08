export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface onRegisterData {
  username: string;
  email: string;
  password: string;
  accessToken: string;
  _id: string;
}

export interface LoginData {
  email: string;
  password: string;
}
