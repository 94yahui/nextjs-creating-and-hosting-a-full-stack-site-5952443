import Image from "next/image";
import Link from "next/link";
import { Product } from "./product-data";

export default function ProductsList({ products }: { products: Product[] }) {
  return (
    <div className="flex gap-5">
      {products.map((product) => (
        <Link key={product.id} href={"/products/" + product.id}>
          <div className="p-4 shadow-md rounded-2xl">
            <Image
              src={"/" + product.imageUrl}
              alt="Product Image"
              width={150}
              height={150}
              className="mb-4"
            />
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <p>${product.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
