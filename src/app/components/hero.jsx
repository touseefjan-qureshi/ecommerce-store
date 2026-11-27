
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const startX = useRef(0);
  const dragDistance = useRef(0);
  const didDrag = useRef(false);

  const totalProducts = products.length;

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(
          "http://localhost:5000/api/products"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
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


  function nextSlide() {
    if (totalProducts === 0) return;

    setActiveIndex((current) => (current + 1) % totalProducts);
  }


  function previousSlide() {
    if (totalProducts === 0) return;

    setActiveIndex(
      (current) => (current - 1 + totalProducts) % totalProducts
    );
  }

  function handlePointerDown(event) {
    if (event.button !== 0) return;

    startX.current = event.clientX;
    dragDistance.current = 0;
    didDrag.current = false;

    setDragging(true);
  }

  
  function handlePointerMove(event) {
    if (!dragging) return;

    dragDistance.current = event.clientX - startX.current;

    if (Math.abs(dragDistance.current) > 10) {
      didDrag.current = true;
    }
  }

 
  function handlePointerUp() {
    if (!dragging) return;

    const distance = dragDistance.current;

    if (distance < -50) {
      nextSlide();
    } else if (distance > 50) {
      previousSlide();
    }

    setDragging(false);
  }

 
  function handleProductClick(event) {
    event.stopPropagation();


    if (didDrag.current) {
      didDrag.current = false;
      return;
    }

    router.push("/products");
  }


  function getPosition(index) {
    let difference =
      (index - activeIndex + totalProducts) % totalProducts;

    if (difference > totalProducts / 2) {
      difference -= totalProducts;
    }

    return difference;
  }


  if (loading) {
    return (
      <section className="flex min-h-[500px] items-center justify-center bg-[#f8f7f4]">
        <p className="font-semibold text-gray-600">
          Loading collection...
        </p>
      </section>
    );
  }


  if (error) {
    return (
      <section className="flex min-h-[500px] items-center justify-center bg-[#f8f7f4]">
        <p className="text-red-600">
          Error: {error}
        </p>
      </section>
    );
  }


  if (totalProducts === 0) {
    return (
      <section className="flex min-h-[500px] items-center justify-center bg-[#f8f7f4]">
        <p>No products available.</p>
      </section>
    );
  }

  return (
    <section
      id="hero"
      className="w-full overflow-hidden bg-[#f8f7f4] py-16"
    >
  
      <div className="mb-8 px-4 text-center">
        <p className="mb-3 text-xs font-semibold tracking-[4px] text-gray-500">
          STREETFORM COLLECTION
        </p>

        <h1 className="text-4xl font-bold text-gray-900 md:text-6xl">
          Find Your Everyday Fit.
        </h1>

        <p className="mt-4 text-sm text-gray-500 md:text-base">
          Discover your style. Wear your confidence.
        </p>
      </div>

   
      <div
        className={`relative mx-auto flex h-[380px] w-full max-w-6xl items-center justify-center ${
          dragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{ touchAction: "pan-y" }}
      >
        {products.map((product, index) => {
          const position = getPosition(index);

          if (Math.abs(position) > 2) return null;

          const positionClasses = {
            0: "left-1/2 z-30 -translate-x-1/2 scale-110 opacity-100",
            1: "left-[85%] z-20 -translate-x-1/2 scale-75 opacity-70 sm:left-[75%]",
            2: "left-[110%] z-10 -translate-x-1/2 scale-50 opacity-30 sm:left-[95%]",
            "-1": "left-[15%] z-20 -translate-x-1/2 scale-75 opacity-70 sm:left-[25%]",
            "-2": "left-[-10%] z-10 -translate-x-1/2 scale-50 opacity-30 sm:left-[5%]",
          };

          return (
            <div
              key={product.id}
              onClick={handleProductClick}
              role="link"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleProductClick(event);
                }
              }}
              aria-label={`View all products. Selected item: ${product.name}`}
              className={`absolute top-1/2 flex h-[280px] w-[220px] -translate-y-1/2 cursor-pointer items-center justify-center transition-all duration-700 ease-in-out sm:h-[400px] sm:w-[300px] ${
                positionClasses[position]
              }`}
            >
              <img
                src={product.image}
                alt={product.name}
                draggable="false"
                className="pointer-events-none h-full w-full select-none object-contain drop-shadow-2xl"
              />
            </div>
          );
        })}
      </div>

     
      <div className="mt-2 text-center">
        <h2 className="text-xl font-semibold text-gray-900">
          {products[activeIndex].name}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          PKR{" "}
          {Number(products[activeIndex].price).toLocaleString("en-PK")}
        </p>

        <p className="mt-3 text-xs font-medium tracking-wider text-gray-500">
          CLICK ANY PRODUCT TO VIEW ALL PRODUCTS
        </p>
      </div>

     
      <div className="mt-6 flex items-center justify-center gap-8">
        <button
          onClick={previousSlide}
          aria-label="Previous product"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-400 text-xl transition hover:bg-gray-900 hover:text-white"
        >
          ←
        </button>

        <span className="text-sm font-medium text-gray-600">
          {activeIndex + 1} / {totalProducts}
        </span>

        <button
          onClick={nextSlide}
          aria-label="Next product"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-400 text-xl transition hover:bg-gray-900 hover:text-white"
        >
          →
        </button>
      </div>


      <div className="mt-5 flex justify-center gap-2">
        {products.map((product, index) => (
          <button
            key={product.id}
            onClick={() => setActiveIndex(index)}
            aria-label={`Show ${product.name}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              activeIndex === index
                ? "w-7 bg-gray-900"
                : "w-2 bg-gray-300"
            }`}
          />
        ))}
      </div>

      <p className="mt-5 text-center text-[10px] font-medium tracking-[3px] text-gray-400 sm:text-xs">
        CLICK OR DRAG TO EXPLORE
      </p>
    </section>
  );
}
