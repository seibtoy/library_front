export interface CartItem {
  bookId: string;
  weeks: number;
}

export interface Cart {
  items: CartItem[];
  discount: number;
  totalPrice: number;
}

export interface User extends Document {
  name: string;
  surname: string;
  midname: string;
  phone: string;
  address: string;
  password: string;
  cart: Cart;
}

export interface BorrowedBook {
  _id: string;
  userId: string;
  books: BorrowedBookItem[];
  totalPrice: number;
  __v: number;
}

export interface BorrowedBookItem {
  bookId: string;
  userQuantity: number;
  weeks: number;
  rentalDate: string;
  returnDate: string;
  _id: string;
}
