import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, CreditCard, CheckCircle2, Loader2 } from "lucide-react";

type Step = "form" | "processing" | "success";

const CheckoutPage = () => {
  const { items, totalPrice, currency, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("form");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");

  const formatCard = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 4);
    if (digits.length > 2) return digits.slice(0, 2) + "/" + digits.slice(2);
    return digits;
  };

  const isValid = cardNumber.replace(/\s/g, "").length === 16 && expiry.length === 5 && cvv.length >= 3 && name.length > 1;

  const handlePay = () => {
    setStep("processing");
    setTimeout(() => {
      setStep("success");
      clearCart();
    }, 2000);
  };

  if (step === "success") {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 p-6 text-center">
        <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center animate-fade-in">
          <CheckCircle2 className="w-10 h-10 text-accent" />
        </div>
        <h1 className="font-display text-2xl font-bold text-foreground">¡Pedido confirmado!</h1>
        <p className="text-muted-foreground">Tu pedido ha sido recibido y se está preparando.</p>
        <Button variant="outline" className="rounded-full mt-4" onClick={() => navigate(-3)}>
          Volver al menú
        </Button>
      </div>
    );
  }

  if (step === "processing") {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 p-6">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <p className="text-foreground font-semibold">Procesando pago...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      <div className="bg-card border-b border-border sticky top-0 z-30">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
          <Button size="icon" variant="ghost" className="rounded-full" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-display text-lg font-bold text-foreground">Pago</h1>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 pt-6 space-y-6">
        {/* Order summary */}
        <div className="bg-card rounded-xl border border-border p-4 space-y-2">
          <h2 className="font-body font-semibold text-foreground text-sm">Resumen del pedido</h2>
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex justify-between text-sm">
              <span className="text-muted-foreground">{quantity}x {product.name}</span>
              <span className="text-foreground font-medium">
                {((product.discountPrice ?? product.price) * quantity).toFixed(2)}{currency}
              </span>
            </div>
          ))}
          <div className="border-t border-border pt-2 flex justify-between">
            <span className="font-semibold text-foreground">Total</span>
            <span className="font-bold text-primary text-lg">{totalPrice.toFixed(2)}{currency}</span>
          </div>
        </div>

        {/* Card form */}
        <div className="space-y-4">
          <h2 className="font-body font-semibold text-foreground text-sm flex items-center gap-2">
            <CreditCard className="w-4 h-4" /> Datos de pago
          </h2>
          <Input
            placeholder="Nombre del titular"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-xl"
          />
          <Input
            placeholder="0000 0000 0000 0000"
            value={cardNumber}
            onChange={(e) => setCardNumber(formatCard(e.target.value))}
            className="rounded-xl tracking-wider"
            maxLength={19}
          />
          <div className="flex gap-3">
            <Input
              placeholder="MM/AA"
              value={expiry}
              onChange={(e) => setExpiry(formatExpiry(e.target.value))}
              className="rounded-xl"
              maxLength={5}
            />
            <Input
              placeholder="CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
              className="rounded-xl"
              maxLength={4}
              type="password"
            />
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Este es un pago simulado. No se realizará ningún cargo real.
          </p>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-40">
        <div className="max-w-lg mx-auto px-4 py-4">
          <Button
            className="w-full h-12 rounded-xl text-base font-semibold"
            disabled={!isValid}
            onClick={handlePay}
          >
            Pagar {totalPrice.toFixed(2)}{currency}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
