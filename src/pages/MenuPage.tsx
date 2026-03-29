import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchPublicMenu } from "@/lib/api";
import { ProductResponse } from "@/types/api";
import ProductCard from "@/components/ProductCard";
import ProductDetail from "@/components/ProductDetail";
import CartFloatingButton from "@/components/CartFloatingButton";
import { Skeleton } from "@/components/ui/skeleton";
import { UtensilsCrossed } from "lucide-react";

const MenuPage = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductResponse | null>(null);
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const tabsRef = useRef<HTMLDivElement | null>(null);

  const { data: menu, isLoading, error } = useQuery({
    queryKey: ["publicMenu", restaurantId],
    queryFn: () => fetchPublicMenu(restaurantId!),
    enabled: !!restaurantId,
  });

  useEffect(() => {
    if (menu?.categories?.length && !activeCategory) {
      setActiveCategory(menu.categories[0].id);
    }
  }, [menu, activeCategory]);

  const scrollToCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    const el = categoryRefs.current[categoryId];
    if (el) {
      const offset = 120;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-4 space-y-4 max-w-lg mx-auto">
        <Skeleton className="h-12 w-48 mx-auto" />
        <Skeleton className="h-10 w-full" />
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-28 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (error || !menu) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-3 p-4">
        <UtensilsCrossed className="w-12 h-12 text-muted-foreground" />
        <p className="text-muted-foreground text-center">No se pudo cargar el menú</p>
      </div>
    );
  }

  const sortedCategories = [...menu.categories].sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-30">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
          {menu.restaurantLogo && (
            <img src={menu.restaurantLogo} alt={menu.restaurantName} className="w-10 h-10 rounded-full object-cover" />
          )}
          <h1 className="font-display text-lg font-bold text-foreground truncate">{menu.restaurantName}</h1>
        </div>

        {/* Category Tabs */}
        <div
          ref={tabsRef}
          className="max-w-lg mx-auto px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-hide"
        >
          {sortedCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => scrollToCategory(cat.id)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Products */}
      <div className="max-w-lg mx-auto px-4 pt-4 space-y-6">
        {sortedCategories.map((cat) => {
          const sortedProducts = [...cat.products]
            .filter((p) => p.available)
            .sort((a, b) => a.displayOrder - b.displayOrder);

          return (
            <div
              key={cat.id}
              ref={(el) => { categoryRefs.current[cat.id] = el; }}
            >
              <h2 className="font-display text-lg font-bold text-foreground mb-3">{cat.name}</h2>
              <div className="space-y-2">
                {sortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    currency={menu.currency || "€"}
                    onSelect={setSelectedProduct}
                  />
                ))}
                {sortedProducts.length === 0 && (
                  <p className="text-sm text-muted-foreground py-4 text-center">No hay productos disponibles</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <CartFloatingButton />

      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          currency={menu.currency || "€"}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default MenuPage;
