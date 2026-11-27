
// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { products } from "@/lib/products";

// export default function ProductDetails({ product }) {
//   const [selectedSize, setSelectedSize] = useState(product.sizes[1]);
//   const [selectedColor, setSelectedColor] = useState(product.colors[0]);
//   const [quantity, setQuantity] = useState(1);
//   const [message, setMessage] = useState("");

//   const relatedProducts = products.filter(
//     (item) =>
//       item.category === product.category &&
//       item.id !== product.id
//   );

//   function handleAddToCart() {
//     setMessage(
//       `${quantity} × ${product.name} selected. Cart functionality is our next step!`
//     );
//   }

//   return (
//     <main className="min-h-screen bg-[#f8f7f4] px-5 py-12">

//       {/* Breadcrumb */}
//       <div className="mx-auto mb-8 max-w-7xl text-sm text-gray-500">
//         <Link href="/" className="hover:text-black">
//           Home
//         </Link>
//         <span className="mx-2">/</span>
//         <Link href="/products" className="hover:text-black">
//           Products
//         </Link>
//         <span className="mx-2">/</span>
//         <span className="text-gray-900">{product.name}</span>
//       </div>

//       {/* Product Details */}
//       <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-2">

//         {/* Product Image */}
//         <div className="flex min-h-[400px] items-center justify-center rounded-2xl bg-white p-8 md:min-h-[600px]">
//           <Image
//             src={product.image}
//             alt={product.name}
//             width={600}
//             height={600}
//             priority
//             className="h-[350px] w-full object-contain md:h-[500px]"
//           />
//         </div>

//         {/* Product Information */}
//         <div className="flex flex-col justify-center">

//           <p className="text-sm font-semibold uppercase tracking-[4px] text-gray-500">
//             {product.category}
//           </p>

//           <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
//             {product.name}
//           </h1>

//           <p className="mt-5 text-2xl font-semibold text-gray-900">
//             PKR {product.price.toLocaleString("en-PK")}
//           </p>

//           <div className="my-7 h-px w-full bg-gray-200" />

//           <h2 className="text-lg font-semibold text-gray-900">
//             Product Description
//           </h2>

//           <p className="mt-3 leading-7 text-gray-600">
//             {product.description}
//           </p>

//           {/* Size Selection */}
//           <div className="mt-8">
//             <div className="mb-3 flex items-center justify-between">
//               <h3 className="font-semibold text-gray-900">
//                 Select Size
//               </h3>

//               <span className="text-sm text-gray-500">
//                 {selectedSize} selected
//               </span>
//             </div>

//             <div className="flex flex-wrap gap-3">
//               {product.sizes.map((size) => (
//                 <button
//                   key={size}
//                   onClick={() => setSelectedSize(size)}
//                   className={`h-12 w-12 rounded-lg border font-medium transition ${
//                     selectedSize === size
//                       ? "border-gray-900 bg-gray-900 text-white"
//                       : "border-gray-300 bg-white text-gray-800 hover:border-gray-900"
//                   }`}
//                 >
//                   {size}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Color Selection */}
//           <div className="mt-8">
//             <h3 className="mb-3 font-semibold text-gray-900">
//               Select Color
//             </h3>

//             <div className="flex flex-wrap gap-3">
//               {product.colors.map((color) => (
//                 <button
//                   key={color}
//                   onClick={() => setSelectedColor(color)}
//                   className={`rounded-lg border px-5 py-3 text-sm transition ${
//                     selectedColor === color
//                       ? "border-gray-900 bg-gray-900 text-white"
//                       : "border-gray-300 bg-white text-gray-800 hover:border-gray-900"
//                   }`}
//                 >
//                   {color}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Quantity */}
//           <div className="mt-8">
//             <h3 className="mb-3 font-semibold text-gray-900">
//               Quantity
//             </h3>

//             <div className="flex h-12 w-fit items-center overflow-hidden rounded-lg border border-gray-300 bg-white">
//               <button
//                 onClick={() =>
//                   setQuantity((current) => Math.max(1, current - 1))
//                 }
//                 className="h-full w-12 text-xl hover:bg-gray-100"
//                 aria-label="Decrease quantity"
//               >
//                 −
//               </button>

//               <span className="w-12 text-center font-medium">
//                 {quantity}
//               </span>

//               <button
//                 onClick={() => setQuantity((current) => current + 1)}
//                 className="h-full w-12 text-xl hover:bg-gray-100"
//                 aria-label="Increase quantity"
//               >
//                 +
//               </button>
//             </div>
//           </div>

//           {/* Add to Cart */}
//           <button
//             onClick={handleAddToCart}
//             className="mt-9 w-full rounded-xl bg-gray-900 px-8 py-4 font-semibold text-white transition hover:bg-gray-700"
//           >
//             Add to Cart
//           </button>

//           {message && (
//             <p className="mt-4 rounded-lg bg-gray-200 p-3 text-sm text-gray-700">
//               {message}
//             </p>
//           )}

//           <p className="mt-5 text-center text-xs text-gray-500">
//             STREETFORM — WEAR YOUR CONFIDENCE.
//           </p>
//         </div>
//       </div>

//       {/* Related Products */}
//       {relatedProducts.length > 0 && (
//         <section className="mx-auto mt-24 max-w-7xl">

//           <div className="mb-10 text-center">
//             <p className="text-xs font-semibold tracking-[4px] text-gray-500">
//               YOU MAY ALSO LIKE
//             </p>

//             <h2 className="mt-3 text-3xl font-bold text-gray-900">
//               Related Products
//             </h2>
//           </div>

//           <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
//             {relatedProducts.map((item) => (
//               <Link
//                 key={item.id}
//                 href={`/products/${item.id}`}
//                 className="group overflow-hidden rounded-xl bg-white transition hover:-translate-y-1 hover:shadow-lg"
//               >
//                 <div className="flex h-[280px] items-center justify-center bg-gray-50 p-5">
//                   <Image
//                     src={item.image}
//                     alt={item.name}
//                     width={350}
//                     height={350}
//                     className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
//                   />
//                 </div>

//                 <div className="p-5">
//                   <p className="text-xs uppercase tracking-widest text-gray-400">
//                     {item.category}
//                   </p>

//                   <h3 className="mt-2 font-semibold text-gray-900">
//                     {item.name}
//                   </h3>

//                   <p className="mt-2 font-semibold text-gray-700">
//                     PKR {item.price.toLocaleString("en-PK")}
//                   </p>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </section>
//       )}

//     </main>
//   );
// }
