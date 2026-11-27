
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function ProductDetailsPage() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(
          `http://localhost:5000/api/products/${id}`
        );

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-20">Loading product...</p>;
  }

  if (error || !product) {
    return (
      <div className="text-center mt-20">
        <p className="text-red-600">{error || "Product not found"}</p>
        <Link href="/products" className="underline mt-4 inline-block">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f6f1] px-6 py-12">
      <div className="max-w-6xl mx-auto">

        <Link href="/products" className="text-gray-600 hover:text-black">
          ← Back to Products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-10">


          <div className="bg-white rounded-xl overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[500px] object-cover"
            />
          </div>

      
          <div className="flex flex-col justify-center">

            <p className="uppercase tracking-widest text-sm text-gray-500">
              {product.category}
            </p>

            <h1 className="text-4xl font-bold mt-3">
              {product.name}
            </h1>

            <p className="text-2xl font-bold mt-6">
              PKR {product.price}
            </p>

            <div className="mt-8 space-y-4">

              <p>
                <strong>Product ID:</strong> {product.id}
              </p>

              <p>
                <strong>Color:</strong> {product.color}
              </p>

              <p>
                <strong>Available Sizes:</strong>{" "}
                {Array.isArray(product.sizes)
                  ? product.sizes.join(", ")
                  : product.sizes}
              </p>

              <p>
                <strong>Stock:</strong> {product.stock}
              </p>

            </div>

            <button className="bg-black text-white py-4 rounded-lg mt-10 hover:bg-gray-800 transition">
              Add to Cart
            </button>

          </div>
        </div>
      </div>
    </main>
  );
}
