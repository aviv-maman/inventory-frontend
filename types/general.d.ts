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
  stock: number;
  createdAt: string;
  updatedAt: string;
};

export type Category = {
  _id: string;
  name: string;
  image?: string | null;
  ancestors: { _id: string; name: string }[] | [] | null;
  parent: string | null;
  createdAt: string;
  updatedAt: string;
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
  createdAt: string;
  updatedAt: string;
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
  count: { children: undefined; ancestors: undefined };
};

export type GetUsersRes = {
  success: true;
  data: User[];
  currentCount: number;
  totalCount: number;
  totalPages: number;
};

export type Store = {
  _id: string;
  name: string;
  location: string;
  active: boolean;
  products: { product: Product['_id']; stock: number }[] | [];
  createdAt: string;
  updatedAt: string;
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

export type GetStoresRes = {
  success: true;
  data: Store[];
  currentCount: number;
  totalCount: number;
  totalPages: number;
};

export type GetUserRes = {
  success: true;
  data: User;
};

export type GetProductsByStoresIdsRes = {
  success: true;
  data: { product: Product; stock: number }[];
  currentCount: number;
  totalCount: number;
  totalPages: number;
};

export type GetProductRes = {
  success: true;
  data: Product;
};

export type GetCategoriesRes = {
  success: true;
  data: Category[];
  currentCount: number;
  totalCount: number;
  totalPages: number;
};

export type GetCategoriesWithAncestorsRes = {
  success: true;
  data: { children: Category[] | null; ancestors: Category[] | null };
  count: { children: number | null; ancestors: number | null };
};
