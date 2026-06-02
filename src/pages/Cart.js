import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Cart() {
  const { cart, removeFromCart, updateTenure, totalAmount } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-8xl mb-6">🛒</div>
          <h2 className="text-3xl font-heading font-bold text-primary mb-4">Your Cart is Empty!</h2>
          <p className="text-gray-500 font-body mb-8">Add some products to get started!</p>
          <Link to="/products" className="bg-accent text-white px-8 py-3 rounded-lg font-heading font-bold hover:opacity-90 transition">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-heading font-bold text-primary mb-8">My Cart 🛒</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Cart Items */}
        <div className="md:col-span-2 flex flex-col gap-6">
          {cart.map(item => (
            <div key={item.id} className="bg-white rounded-xl shadow-md p-6 flex gap-4 items-center">
              <img src={item.image} alt={item.name} className="w-24 h-20 object-cover rounded-xl" />
              <div className="flex-1">
                <h3 className="text-lg font-heading font-bold text-primary mb-1">{item.name}</h3>
                <p className="text-gray-500 font-body text-sm mb-2">{item.category}</p>
                
                {/* Tenure */}
                <div className="flex gap-2">
                  {[1, 3, 6, 12].map(t => (
                    <button
                      key={t}
                      onClick={() => updateTenure(item.id, t)}
                      className={`px-3 py-1 rounded-lg text-sm font-semibold transition ${
                        item.tenure === t ? "bg-primary text-white" : "bg-background text-primary border border-primary"
                      }`}
                    >
                      {t}M
                    </button>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <p className="text-accent font-bold text-lg">₹{item.price * item.tenure}</p>
                <p className="text-gray-400 text-sm">+₹{item.deposit} deposit</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-400 text-sm mt-2 hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-xl shadow-md p-6 h-fit">
          <h3 className="text-xl font-heading font-bold text-primary mb-6">Order Summary</h3>
          
          {cart.map(item => (
            <div key={item.id} className="flex justify-between mb-2">
              <span className="text-gray-500 font-body text-sm">{item.name} x{item.tenure}M</span>
              <span className="font-semibold text-sm">₹{item.price * item.tenure + item.deposit}</span>
            </div>
          ))}
          
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between">
              <span className="font-bold text-dark">Total</span>
              <span className="font-bold text-accent text-xl">₹{totalAmount}</span>
            </div>
          </div>

          <Link to="/checkout" className="block bg-accent text-white text-center py-3 rounded-lg font-heading font-bold text-lg hover:opacity-90 transition mt-6">
            Proceed to Checkout 🚀
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;