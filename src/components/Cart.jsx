import { useCart } from "../context/useCart";

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();
  console.log("CART:", cart);
  const cartSum = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div>
      {/* Show cart */}

      <div>
        <h2 className="text-xl text-center font-semibold mb-8">🛒 Cart</h2>
        {cart.length === 0 ? (
          <p className="text-l text-center font-semibold mb-20">
            Your cart is empty
          </p>
        ) : (
          <div>
            <ul className="space-y-2">
              {cart.map((item) => (
                <li
                  //key={item.cartItemId}
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b pb-2"
                >
                  <div className="flex justify-between sm:justify-end items-center space-x-6">
                    <h3 className="w-full sm:w-48 mb-2 sm:mb-0">
                      {item.title}
                    </h3>
                    <h4>{item.quantity}x</h4>
                  </div>

                  <div className="flex justify-between sm:justify-end items-center space-x-4">
                    <h4>{(item.price * item.quantity).toFixed(2)} €</h4>
                    <button
                      onClick={() => removeFromCart(item)}
                      className="bg-red-500 text-white text-sm px-2 py-1 rounded hover:bg-red-700 transition-all duration-300 ease-in-out"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-center">
              <button
                onClick={clearCart}
                className="bg-red-500 text-white text-sm px-2 py-1 rounded hover:bg-red-700 transition-all duration-300 ease-in-out"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
      {cart.length > 0 && (
        <div className="mt-8 flex justify-between">
          <h3>Total price:</h3>
          <h3>{cartSum.toFixed(2)} €</h3>
        </div>
      )}
    </div>
  );
}
