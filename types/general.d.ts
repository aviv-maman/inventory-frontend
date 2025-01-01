export type Product = {
  id: string;
  name: string;
  description: string;
  price: {
    fullPrice: number;
    discountPrice: number;
    discountPercentage: number;
    discountFrom: string;
    discountUntil: string;
  };
  images: string[];
  categories: string[];
  stock: {
    general: number;
    stores: {
      id: string;
      name: string;
      quantity: number;
    }[];
  };
  createdAt: string;
  updatedAt: string;
};

export type Category = {
  id: string;
  name: string;
  image?: string;
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
