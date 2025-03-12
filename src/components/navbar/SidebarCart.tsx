import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const SidebarCart = ({ isOpen }: { isOpen: boolean }) => {
  const { data: session } = useSession();
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [cartItems, setCartItems] = useState<
    {
      id: number;
      quantity: number;
      title: string;
      price: number;
      images: any;
    }[]
  >([]);

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);

        if (parsedCart?.items && Array.isArray(parsedCart.items)) {
          const validItems = parsedCart.items.filter(
            (item: any) =>
              item && typeof item === "object" && item.quantity !== undefined
          );
          setCartItems(validItems);
        } else {
          setCartItems([]);
        }
      }
    } catch (error) {
      console.error("Error parsing cart from localStorage:", error);
      setCartItems([]);
    }
  }, [isOpen]);

  const updateQuantityMinus = (id: number, delta: number) => {
    const updatedCart = cartItems
      .map((item) => {
        if (item.id === id) {
          if (item.quantity + delta < 1) {
            return item;
          }
          return { ...item, quantity: item.quantity + delta };
        }
        return item;
      })
      .filter((item) => item !== null);

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify({ items: updatedCart }));
  };

  const updateQuantityPlus = (id: number, delta: number) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + delta };
      }
      return item;
    });

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify({ items: updatedCart }));
    const newTotalPrice = updatedCart.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
    setPrice(newTotalPrice);
  };

  const hdlDeleteProduct = (id: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);

    toast.success("ลบสินค้าสำเร็จ")
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify({ items: updatedCart }));
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );


  return (
    <div
      className={`fixed top-0 right-0 z-50 w-[360px] h-screen bg-white shadow-lg transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {cartItems.length > 0 ? (
        <>
          <div className="p-6 text-lg font-semibold flex gap-4 relative">
            <ShoppingBag /> {cartItems.length} ชิ้น
          </div>
          <hr />
          {cartItems.map((item) => (
            <div key={item.id}>
              <div className="p-6 flex">
                <div className="flex-col items-center justify-center">
                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => updateQuantityPlus(item.id, 1)}
                      className="border text-red-500 border-red-500 rounded-full hover:bg-red-500 hover:text-white"
                    >
                      <Plus fontSize={12} />
                    </button>
                  </div>

                  <div className="flex items-center justify-center">
                    <span>{item.quantity}</span>
                  </div>

                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => updateQuantityMinus(item.id, -1)}
                      className="border text-gray-500 bg-gray-300  rounded-full hover:bg-red-500 hover:text-white"
                    >
                      <Minus fontSize={12} />
                    </button>
                  </div>
                </div>

                <div>
                  <img
                    className="max-w-[76px] max-h-[76px]"
                    src={item.images?.[0].url}
                    alt=""
                  />
                </div>

                <div className="flex-col">
                  <div className="flex items-center justify-between">
                    <div className="text-[14px] w-[150px] truncate">
                      {item.title}
                    </div>

                    <div className="pl-3 flex">
                      <button
                        onClick={() => hdlDeleteProduct(item.id)}
                        className="border border-red-500 rounded-full"
                      >
                        <Trash2 className="w-[25px] p-1" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4  transition-all duration-300">
                    <div className="text-[14px] text-red-700 font-bold transition-all duration-300">
                      ฿{item.price * item.quantity} x {item.quantity}
                    </div>
                  </div>
                </div>
              </div>

              <hr className="w-full fixed  border-t border-gray-300 " />

              <footer className="absolute bottom-0 left-0 right-0 flex items-center justify-center w-full mb-5">
                <Link href={"/checkout"} className="w-[330px] bg-red-600 rounded-md">
                  <h1 className="text-white p-2 text-center">
                    สั่งซื้อ  ฿{new Intl.NumberFormat().format(cartTotal)}.00
                  </h1>
                </Link>
              </footer>
            </div>
          ))}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full gap-4">
          <img
            className="max-w-24 max-h-24"
            src="https://ihavecpu.com/assets/images/logos/shopping-bag.svg"
            alt="ตะกร้าสินค้าว่าง"
          />
          <p className="text-gray-500">ตะกร้าสินค้าว่าง</p>
        </div>
      )}
    </div>
  );
};

export default SidebarCart;
