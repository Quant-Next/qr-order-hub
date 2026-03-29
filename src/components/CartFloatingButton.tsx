import { useCart } from "@/contexts/CartContext";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CartFloatingButton = () => {
  const { totalItems, totalPrice, currency } = useCart();
  const navigate = useNavigate();

  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-40 max-w-lg mx-auto animate-slide-up">
      <Button
        className="w-full h-14 rounded-2xl text-base font-semibold shadow-lg flex items-center justify-between px-5"
        onClick={() => navigate("/cart")}
      >
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-5 h-5" />
          <span className="bg-primary-foreground/20 rounded-full px-2 py-0.5 text-sm">
            {totalItems}
          </span>
        </div>
        <span>Ver carrito · {totalPrice.toFixed(2)}{currency}</span>
      </Button>
    </div>
  );
};

export default CartFloatingButton;
