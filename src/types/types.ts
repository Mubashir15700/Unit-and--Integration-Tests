export type searchData = {
  userName: string;
  phone: number;
};

export type userData = {
  id: number;
  name: string;
  username: string;
  phone: number;
};

export interface DisplayProps {
  userData: userData;
  loading: boolean;
  error: string;
}

export interface InputProps {
  type: string;
  placeholder: string;
  name: string;
  value: string | number;
  handleChange: (e: any) => void;
}

export interface ButtonProps {
  loading: boolean;
  handleClick: () => void;
}
