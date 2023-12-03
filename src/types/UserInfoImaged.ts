export type UserInfoImageless = {
  name: string;
  age: number;
  email: string;
  password1: string;
  password2: string;
  gender: string;
  acceptTerms: boolean;
  country: string;
};

export type UserInfoImaged = {
  image: string;
} & UserInfoImageless;

export const DefaultUserInfo: UserInfoImaged = {
  name: '',
  age: 0,
  email: '',
  password1: '',
  password2: '',
  gender: '',
  acceptTerms: false,
  image: '',
  country: '',
};
