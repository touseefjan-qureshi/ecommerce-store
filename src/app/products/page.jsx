
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(
          "http://localhost:5000/api/products"
        );

        if (!response.ok) {
          throw new Error("Failed to load products");
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading products...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f6f1] px-6 py-12">
      <div className="max-w-7xl mx-auto">

<div className="max-w-7xl mx-auto mb-10">
  <div className="flex flex-wrap justify-center gap-3">

    <Link
      href="/"
      className="px-6 py-3 rounded-full bg-black text-white font-semibold hover:bg-gray-700 transition shadow-md"
    >
      Home
    </Link>

    

  

  </div>
</div>

  
        <div className="text-center mb-12">
          <p className="uppercase tracking-[4px] text-gray-500 text-sm">
            STREETFORM COLLECTION
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mt-4 text-gray-900">
            All Products
          </h1>

          <p className="text-gray-500 mt-4">
            Discover our latest streetwear collection.
          </p>
        </div>

        <p className="text-gray-600 mb-6">
          Showing {products.length} products
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300"
            >

     
              <Link href={`/products/${product.id}`}>
                <div className="h-[300px] bg-gray-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                </div>
              </Link>

           
              <div className="p-5">

                <p className="text-xs uppercase tracking-widest text-gray-500">
                  {product.category}
                </p>

                <h2 className="text-lg font-semibold mt-2 text-gray-900">
                  {product.name}
                </h2>

                <p className="font-bold mt-3 text-gray-900">
                  PKR {product.price}
                </p>

                <Link
                  href={`/products/${product.id}`}
                  className="block text-center bg-black text-white py-3 rounded-lg mt-5 hover:bg-gray-800 transition"
                >
                  View Details
                </Link>

              </div>
            </div>
          ))}

        </div>
      </div>
    </main>
  );
}
