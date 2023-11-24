export interface TFullName {
  firstName: string;
  lastName: string;
}

export interface TAddress {
  street: string;
  city: string;
  country: string;
}

export interface TOrder {
  productName: string;
  price: number;
  quantity: number;
}

export interface TUser {
  userId: number;
  username: string;
  password: string;
  fullName: TFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TAddress;
  orders?: TOrder[];
}
export interface TUser {
  userId: number;
  username: string;
  password: string;
  fullName: TFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TAddress;
  orders?: TOrder[];
}
