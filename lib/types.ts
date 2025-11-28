export type Product = {
  id: string;
  name: string;
  price: number;
  image_url: string;
  description: string;
  created_at?: string;
};

export type CartItem = Product & {
  quantity: number;
};

