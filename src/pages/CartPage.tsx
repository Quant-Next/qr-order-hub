import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

const CartPage = () => {
  const { items, updateQuantity, removeItem, totalPrice, currency, clearCart } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 p-4">
        <ShoppingBag className="w-16 h-16 text-muted-foreground" />
        <p className="text-muted-foreground text-lg">Tu carrito está vacío</p>
        <Button variant="outline" onClick={() => navigate(-1)} className="rounded-full">
          <ArrowLeft className="w-4 h-4 mr-2" /> Volver al menú
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-30">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
          <Button size="icon" variant="ghost" className="rounded-full" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-display text-lg font-bold text-foreground">Tu pedido</h1>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 pt-4 space-y-3">
        {items.map(({ product, quantity }) => {
          const price = product.discountPrice ?? product.price;
          return (
            <div key={product.id} className="flex gap-3 p-3 rounded-lg bg-card border border-border/50 animate-fade-in">
              {product.imageUrl && (
                <img src={product.imageUrl} alt={product.name} className="w-16 h-16 rounded-md object-cover" />
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-body font-semibold text-foreground text-sm truncate">{product.name}</h3>
                <p className="text-primary font-semibold text-sm mt-0.5">
                  {(price * quantity).toFixed(2)}{currency}
                </p>
              </div>
              <div className="flex flex-col items-end justify-between">
                <button onClick={() => removeItem(product.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-1.5">
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-7 w-7 rounded-full"
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="text-sm font-semibold w-5 text-center text-foreground">{quantity}</span>
                  <Button
                    size="icon"
                    className="h-7 w-7 rounded-full"
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-40">
        <div className="max-w-lg mx-auto px-4 py-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-foreground font-semibold">Total</span>
            <span className="text-xl font-bold text-primary">{totalPrice.toFixed(2)}{currency}</span>
          </div>
          <Button
            className="w-full h-12 rounded-xl text-base font-semibold"
            onClick={() => navigate("/checkout")}
          >
            Ir a pagar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
