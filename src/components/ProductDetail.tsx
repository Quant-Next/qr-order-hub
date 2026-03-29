import { ProductResponse } from "@/types/api";
import { useCart } from "@/contexts/CartContext";
import { X, Plus, Minus, Clock, Flame, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductDetailProps {
  product: ProductResponse;
  currency: string;
  onClose: () => void;
}

const ProductDetail = ({ product, currency, onClose }: ProductDetailProps) => {
  const { items, addItem, updateQuantity } = useCart();
  const cartItem = items.find((i) => i.product.id === product.id);
  const effectivePrice = product.discountPrice ?? product.price;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-card rounded-t-2xl animate-slide-up max-h-[85vh] overflow-y-auto">
        {product.imageUrl && (
          <div className="relative">
            <img src={product.imageUrl} alt={product.name} className="w-full h-56 object-cover" />
            <Button
              size="icon"
              variant="secondary"
              className="absolute top-3 right-3 rounded-full h-9 w-9"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        )}
        {!product.imageUrl && (
          <div className="flex justify-end p-3">
            <Button size="icon" variant="ghost" className="rounded-full" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        )}
        <div className="p-5 space-y-4">
          <div>
            <h2 className="font-display text-xl font-bold text-foreground">{product.name}</h2>
            {product.description && (
              <p className="text-muted-foreground text-sm mt-1">{product.description}</p>
            )}
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {product.preparationTime && (
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" /> {product.preparationTime} min
              </span>
            )}
            {product.calories && (
              <span className="flex items-center gap-1">
                <Flame className="w-4 h-4" /> {product.calories} kcal
              </span>
            )}
          </div>

          {product.allergens && product.allergens.length > 0 && (
            <div>
              <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground mb-1.5">
                <AlertTriangle className="w-3 h-3" /> Alérgenos
              </div>
              <div className="flex flex-wrap gap-1.5">
                {product.allergens.map((a) => (
                  <span key={a.id} className="px-2 py-0.5 text-xs rounded-full bg-secondary text-secondary-foreground">
                    {a.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {product.tags.map((t) => (
                <span key={t} className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary font-medium">
                  {t}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between pt-3 border-t border-border">
            <div>
              {product.discountPrice != null && (
                <span className="text-sm text-muted-foreground line-through mr-2">
                  {product.price.toFixed(2)}{currency}
                </span>
              )}
              <span className="text-xl font-bold text-primary">
                {effectivePrice.toFixed(2)}{currency}
              </span>
            </div>
            {cartItem ? (
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  className="h-9 w-9 rounded-full"
                  onClick={() => updateQuantity(product.id, cartItem.quantity - 1)}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="text-lg font-semibold w-6 text-center text-foreground">{cartItem.quantity}</span>
                <Button
                  size="icon"
                  className="h-9 w-9 rounded-full"
                  onClick={() => addItem(product)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button className="rounded-full px-6" onClick={() => addItem(product)}>
                <Plus className="w-4 h-4 mr-1" /> Añadir
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
