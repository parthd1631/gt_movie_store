export interface Movie {
  id: number;
  title: string;
  price: number;
  genre: string;
  image: string;
  rating: number;
  topSeller: boolean;
}

export interface CartItem extends Movie {
  quantity: number;
}