"use client";
import { useState } from "react";
import { products } from "@/app/product-data";
import Link from "next/link";


export default function CartPage() {
  const [cartItems] = useState(['123', '345']);
  const cartProducts = products.filter(p => cartItems.includes(p.id));
  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto py-8 w-full">
      <h1 className="text-4xl font-bold py-8">Shopping Cart</h1>
      {cartProducts.map((product) => (
        <Link key={product.id} href={"/products/" + product.id}>
          <div className="p-4 shadow-md flex flex-col gap-2 rounded-2xl">
            <h3 className="text-2xl font-bold">{product.name}</h3>
            <p>${product.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
  
}