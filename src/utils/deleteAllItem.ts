import { toast } from "react-hot-toast";

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  category: { name: string };
  categoryId: number;
  images: { url: string }[];
}

interface Cart {
  itemsDIY: CartItem[];
}

const deleteAllItem = (
  cartItems: CartItem[],
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>,
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>
) => {
  localStorage.removeItem("cartDIY");

  setCartItems([]);
  setTotalPrice(0);

  toast.success("ลบตะกร้าสินค้าทั้งหมดสำเร็จ");
};

export default deleteAllItem;