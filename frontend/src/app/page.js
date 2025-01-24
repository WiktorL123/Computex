'use client';

import Image from "next/image";
import { useProduct } from "@/app/context/ProductContext";
import {ClipLoader} from 'react-spinners'

export default function Home() {
  const { loading, error, products } = useProduct();

  if (loading) {
    return (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader color="#2b2d30" size={50} />
        </div>
    );
  }
  if (error) return <div className="text-red-400">{error.message}</div>;

  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {products.map((product) => (
            <div
                key={product.id}
                className="border border-gray-300 rounded-md p-4 shadow-sm dark:bg-darkSecondary dark:border-gray-700"
            >
              <Image
                  src={product.image || "/placeholder-image.png"}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="object-contain w-full h-48"
              />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {product.name}
              </h2>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {product.description}
              </p>
              <p className="text-md font-bold text-gray-900 dark:text-white">
                {product.price} zł
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Kategoria: {product.category}
              </p>
            </div>
        ))}
      </div>
  );
}
