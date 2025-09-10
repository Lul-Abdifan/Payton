/**
 * Cart page. In a full implementation this would read the checkoutId
 * from an HTTP‑only cookie, fetch the cart from Saleor and display
 * line items. For now it displays a placeholder.
 */
export default function CartPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Your Cart</h1>
      <p>Your cart is currently empty.</p>
    </div>
  );
}