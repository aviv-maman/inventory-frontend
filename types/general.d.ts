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
