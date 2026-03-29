import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { UtensilsCrossed, QrCode, ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [restaurantId, setRestaurantId] = useState("");

  const handleGo = () => {
    if (restaurantId.trim()) {
      navigate(`/menu/${restaurantId.trim()}`);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
        <UtensilsCrossed className="w-10 h-10 text-primary" />
      </div>
      <h1 className="font-display text-3xl font-bold text-foreground mb-2">e-dish</h1>
      <p className="text-muted-foreground mb-8 max-w-xs">
        Escanea el QR de tu mesa o introduce el código del restaurante para ver el menú.
      </p>
      <div className="w-full max-w-xs space-y-3">
        <div className="flex gap-2">
          <Input
            placeholder="ID del restaurante"
            value={restaurantId}
            onChange={(e) => setRestaurantId(e.target.value)}
            className="rounded-xl"
            onKeyDown={(e) => e.key === "Enter" && handleGo()}
          />
          <Button className="rounded-xl px-4" onClick={handleGo} disabled={!restaurantId.trim()}>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center">
          <QrCode className="w-3 h-3" /> Normalmente llegarás aquí escaneando un código QR
        </div>
      </div>
    </div>
  );
};

export default Index;
