import React from "react";
import Image from "next/image";

export default function Product({product}) {
    return (
        <div className={'dark:bg-darkProduct hover:border hover:border-gray-300 rounded-md p-2 hover: shadow-lg'}>

            <Image
                src={product.image || "/placeholder-image.png"}
                alt={product.name}
                width={200}
                height={200}
                className="object-contain w-full h-48"
            />
            <h1 className={'text-center my-2'}>{product.name}</h1>
            <p>{product.price} PLN</p>
            <p> {product.description}</p>
            <p>kategoria: {product.category}</p>
            <p>Specyfikacja:</p>
            {product.filters && (
                <ul>
                    {Object.entries(product.filters).map(([key, value]) => (
                        <li key={key}>
                            <span>{key}: </span>{value}
                        </li>
                    ))}
                </ul>
            )}

        </div>
    )
}