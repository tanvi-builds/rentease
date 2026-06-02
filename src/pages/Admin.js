import React, { useState } from 'react';

const initialProducts = [
  { id: 1, name: "3-Seater Sofa", category: "Furniture", price: 599, deposit: 1000, available: true },
  { id: 2, name: "King Size Bed", category: "Furniture", price: 799, deposit: 1500, available: true },
  { id: 3, name: "Dining Table", category: "Furniture", price: 499, deposit: 800, available: false },
  { id: 4, name: "Wardrobe", category: "Furniture", price: 699, deposit: 1200, available: true },
  { id: 5, name: "Study Table", category: "Furniture", price: 399, deposit: 600, available: true },
  { id: 6, name: "Bookshelf", category: "Furniture", price: 299, deposit: 500, available: true },
  { id: 7, name: "Refrigerator", category: "Appliances", price: 699, deposit: 1200, available: true },
  { id: 8, name: "Washing Machine", category: "Appliances", price: 599, deposit: 1000, available: true },
  { id: 9, name: "Smart TV 43 inch", category: "Appliances", price: 799, deposit: 1500, available: false },
  { id: 10, name: "Air Conditioner", category: "Appliances", price: 899, deposit: 1800, available: true },
  { id: 11, name: "Microwave", category: "Appliances", price: 349, deposit: 600, available: true },
  { id: 12, name: "Water Purifier", category: "Appliances", price: 299, deposit: 500, available: true },
];

const orders = [
  { id: 1, user: "Tanvi Sonar", product: "King Size Bed", tenure: 1, total: 2299, status: "Active", date: "2026-06-03" },
  { id: 2, user: "Rahul Sharma", product: "Refrigerator", tenure: 3, total: 3297, status: "Active", date: "2026-05-20" },
  { id: 3, user: "Priya Patil", product: "3-Seater Sofa", tenure: 6, total: 4594, status: "Completed", date: "2026-04-01" },
];

function Admin() {
  const [products, setProducts] = useState(initialProducts);
  const [activeTab, setActiveTab] = useState("dashboard");

  const toggleAvailability = (id) => {
    setProducts(products.map(p => p.id === id ? { ...p, available: !p.available } : p));
  };

  return (
    <div className="py-12 px-6 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-primary">Admin Panel ⚙️</h1>
        <p className="text-gray-500 font-body mt-1">Manage your RentEase platform</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-md p-4 text-center">
          <div className="text-3xl mb-1">📦</div>
          <h3 className="text-2xl font-heading font-bold text-primary">12</h3>
          <p className="text-gray-500 text-sm">Total Products</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 text-center">
          <div className="text-3xl mb-1">✅</div>
          <h3 className="text-2xl font-heading font-bold text-primary">3</h3>
          <p className="text-gray-500 text-sm">Total Orders</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 text-center">
          <div className="text-3xl mb-1">👥</div>
          <h3 className="text-2xl font-heading font-bold text-primary">3</h3>
          <p className="text-gray-500 text-sm">Total Users</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 text-center">
          <div className="text-3xl mb-1">💰</div>
          <h3 className="text-2xl font-heading font-bold text-primary">₹10190</h3>
          <p className="text-gray-500 text-sm">Total Revenue</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveTab("products")}
          className={`px-6 py-2 rounded-full font-semibold transition ${activeTab === "products" ? "bg-primary text-white" : "bg-white text-primary border border-primary"}`}
        >
          Products
        </button>
        <button
          onClick={() => setActiveTab("orders")}
          className={`px-6 py-2 rounded-full font-semibold transition ${activeTab === "orders" ? "bg-primary text-white" : "bg-white text-primary border border-primary"}`}
        >
          Orders
        </button>
      </div>

      {/* Products Tab */}
      {activeTab === "products" && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-primary text-white">
              <tr>
                <th className="p-4 text-left font-heading">Product</th>
                <th className="p-4 text-left font-heading">Category</th>
                <th className="p-4 text-left font-heading">Price</th>
                <th className="p-4 text-left font-heading">Deposit</th>
                <th className="p-4 text-left font-heading">Status</th>
                <th className="p-4 text-left font-heading">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.id} className={index % 2 === 0 ? "bg-white" : "bg-background"}>
                  <td className="p-4 font-semibold text-dark">{product.name}</td>
                  <td className="p-4 text-gray-500">{product.category}</td>
                  <td className="p-4 text-accent font-bold">₹{product.price}</td>
                  <td className="p-4 text-gray-500">₹{product.deposit}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${product.available ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"}`}>
                      {product.available ? "Available" : "Unavailable"}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleAvailability(product.id)}
                      className="bg-primary text-white px-4 py-1 rounded-lg text-sm hover:opacity-90 transition"
                    >
                      Toggle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === "orders" && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-primary text-white">
              <tr>
                <th className="p-4 text-left font-heading">User</th>
                <th className="p-4 text-left font-heading">Product</th>
                <th className="p-4 text-left font-heading">Tenure</th>
                <th className="p-4 text-left font-heading">Total</th>
                <th className="p-4 text-left font-heading">Date</th>
                <th className="p-4 text-left font-heading">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order.id} className={index % 2 === 0 ? "bg-white" : "bg-background"}>
                  <td className="p-4 font-semibold text-dark">{order.user}</td>
                  <td className="p-4 text-gray-500">{order.product}</td>
                  <td className="p-4 text-gray-500">{order.tenure} month(s)</td>
                  <td className="p-4 text-accent font-bold">₹{order.total}</td>
                  <td className="p-4 text-gray-500">{order.date}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${order.status === "Active" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Admin;