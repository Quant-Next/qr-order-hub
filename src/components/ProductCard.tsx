import { ProductResponse } from "@/types/api";
import { useCart } from "@/contexts/CartContext";
import { Plus, Minus, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: ProductResponse;
  currency: string;
  onSelect: (product: ProductResponse) => void;
}

const ProductCard = ({ product, currency, onSelect }: ProductCardProps) => {
  const { items, addItem, updateQuantity } = useCart();
  const cartItem = items.find((i) => i.product.id === product.id);
  const effectivePrice = product.discountPrice ?? product.price;

  return (
    <div
      className="flex gap-3 p-3 rounded-lg bg-card border border-border/50 cursor-pointer hover:shadow-md transition-shadow animate-fade-in"
      onClick={() => onSelect(product)}
    >
      {product.imageUrl && (
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-24 h-24 rounded-md object-cover flex-shrink-0"
          loading="lazy"
        />
      )}
      <div className="flex-1 min-w-0">
        <h3 className="font-body font-semibold text-foreground text-sm leading-tight truncate">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-muted-foreground text-xs mt-0.5 line-clamp-2">{product.description}</p>
        )}
        <div className="flex items-center gap-2 mt-1.5">
          {product.discountPrice != null && (
            <span className="text-xs text-muted-foreground line-through">
              {product.price.toFixed(2)}{currency}
            </span>
          )}
          <span className="font-semibold text-sm text-primary">
            {effectivePrice.toFixed(2)}{currency}
          </span>
        </div>
        {product.preparationTime && (
          <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>{product.preparationTime} min</span>
          </div>
        )}
      </div>
      <div className="flex flex-col items-end justify-end flex-shrink-0" onClick={(e) => e.stopPropagation()}>
        {cartItem ? (
          <div className="flex items-center gap-1.5">
            <Button
              size="icon"
              variant="outline"
              className="h-7 w-7 rounded-full"
              onClick={() => updateQuantity(product.id, cartItem.quantity - 1)}
            >
              <Minus className="w-3 h-3" />
            </Button>
            <span className="text-sm font-semibold w-5 text-center text-foreground">{cartItem.quantity}</span>
            <Button
              size="icon"
              className="h-7 w-7 rounded-full"
              onClick={() => addItem(product)}
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>
        ) : (
          <Button
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => addItem(product)}
          >
            <Plus className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
