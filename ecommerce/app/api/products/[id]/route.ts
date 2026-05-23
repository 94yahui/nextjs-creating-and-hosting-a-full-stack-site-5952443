import { NextRequest } from "next/server";
import { connectToDB } from "../../db";

type Params = {
  id: string;
};
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<Params> },
) {
  const { db } = await connectToDB();
  const { id } = await params;

  const product = await db.collection("products").findOne({ id: id });

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
