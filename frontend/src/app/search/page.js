'use client'
import React, {useEffect} from "react";
import {useProduct} from "@/app/context/ProductContext";
import {useSearchParams} from "next/navigation";
import {ClipLoader} from "react-spinners";
import Product from "@/app/components/Product";
import {useRouter} from "next/navigation";



export default function SearchPage(){
    const router = useRouter();


    const {products, loading, error, searchProducts} = useProduct()
    const searchParams = useSearchParams()

    useEffect(()=>{
        const query = searchParams.get('query')
        if(query){
            searchProducts(query)
        }
    }, [searchParams])

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <ClipLoader color="#2b2d30" size={50} />
            </div>
        );
    }



   return (
       <div className="p-4">
           <h1 className="text-2xl font-semibold mb-4">Wyniki wyszukiwania</h1>
           {error? (
               <div className="text-gray-500">Nie znaleziono produktów pasujących do wyszukiwania.</div>
           ) : (
               <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
                   {products.map((product) => (
                       <div
                           key={product.id}
                           onClick={() => router.push(`/products/${product.id}`)}

                       >

                           <Product product={product}/>
                       </div>
                   ))}

               </div>
           )}
       </div>
   )
}