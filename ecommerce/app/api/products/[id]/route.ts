import { products } from "@/app/product-data";
import { NextRequest } from "next/server";

type Params = {
  id : string;
}
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<Params> },
) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return new Response("Product not found", {
      status: 404,
    });
  }
  return new Response(JSON.stringify(product), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
