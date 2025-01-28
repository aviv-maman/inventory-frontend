export type Product = {
  _id: string;
  name: string;
  description: string;
  price: {
    fullPrice: number;
    discountPercentage: number;
    discountPrice: number;
    //discountFrom: string;
    //discountUntil: string;
  };
  images: string[];
  categories: string[];
  createdAt: string;
  updatedAt: string;
};

export type Category = {
  _id: string;
  name: string;
  image?: string | null;
  ancestors: { _id: string; name: string }[] | [] | null;
  parent: { _id: string; name: string } | null;
};

export type Cart = {
  lines: {
    product: Product;
    quantity: number;
  }[];
  totalAmount: number;
  totalItems: number;
};

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'customer' | 'employee' | 'admin';
  active: boolean;
  updatedAt: string;
  createdAt: string;
};

export type ServerError = {
  success: false;
  data: null;
  error: {
    statusCode: number;
    code?: string | number;
    name: string;
    message: string;
    stack?: string;
  };
  currentCount: undefined;
  totalCount: undefined;
  totalPages: undefined;
};

export type GetUsersRes = {
  success: true;
  data: User[];
  currentCount: number;
  totalCount: number;
  totalPages: number;
};

export type Store = {
  id: string;
  name: string;
  location: string;
  inventory: { productRef: Product; quantity: number }[] | [];
};

export type CheckoutRes = {
  success: true;
  //data: Order;
};

export type GetProductsRes = {
  success: true;
  data: Product[];
  currentCount: number;
  totalCount: number;
  totalPages: number;
};
