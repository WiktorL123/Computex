'use client';

import {useRouter} from 'next/navigation';
import { useProduct } from "@/app/context/ProductContext";
import {ClipLoader} from 'react-spinners'
import {useEffect} from "react";
import Product from "@/app/components/Product";



export default function Home() {
    const router = useRouter();
    const { loading, error, products, selectCategory, selectedCategory } = useProduct();
  useEffect(() => {
      selectCategory(null)
  },[selectCategory, selectedCategory]);
  if (loading) {
    return (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader color="#2b2d30" size={50} />
        </div>
    );
  }
  if (error) return <div className="text-red-400">{error.message}</div>;

  return (

    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
        {products.map((product) => (
            <div
                key={product.id}
                onClick={()=>router.push(`/products/${product.id}`)}
            >

            <Product product={product} />
            </div>
                ))}

    </div>
  );
}
