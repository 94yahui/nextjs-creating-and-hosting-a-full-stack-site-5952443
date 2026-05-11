import ProductsList from "../ProductsList";
import { products } from "../product-data";

export default function ProductsPage() {
  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto py-8">
      <h1 className="text-4xl font-bold">Products</h1>
      <ProductsList products={products} />
    </div>
  );
}
