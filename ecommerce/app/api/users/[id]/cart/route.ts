import { NextRequest } from "next/server";
import { products } from "@/app/product-data";
import { connectToDB } from "../../../db";


type ShoppingCart = Record<string, string[]>;

const carts: ShoppingCart = {
  "1" : ['123','234'],
  "2" : ['345','456'],
  "3" : ['234'],
}

type Params = {
  id: string;
}

export async function GET(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { db } = await connectToDB();
  const userId = (await params).id;
  const userCart = await db.collection("carts").findOne({ userId });

  if(!userCart) {
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const cartProducts = await db.collection("products").find({ id: { $in: userCart.cartIds } }).toArray();

  return new Response(JSON.stringify(cartProducts), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

type CartBody = {
  productId: string;
}

export async function POST(req: NextRequest, { params }: { params: Promise<Params> }) {
const { db } = await connectToDB();
const userId = (await params).id;
const body: CartBody = await req.json();
const productId = body.productId;

const updateCart = await db.collection("carts").findOneAndUpdate(
  { userId },
  { $addToSet: { cartIds: productId } },
  { upsert: true, returnDocument: "after" }
);


const cartProducts = await db.collection("products").find({ id: { $in: updateCart?.cartIds } }).toArray();

return new Response(JSON.stringify(cartProducts), {
  status: 201,
  headers: {
    "Content-Type": "application/json",
  },
});
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { db } = await connectToDB();
  const userId = (await params).id;
  const body: CartBody = await req.json();
  const productId = body.productId;

  const updateCart = await db.collection("carts").findOneAndUpdate(
    { userId },
    { $pull: { cartIds: productId } },
    { returnDocument: "after" }
  );

  if (!updateCart) {
    return new Response(JSON.stringify([]), {
      status: 202,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const cartProducts = await db.collection("products").find({ id: { $in: updateCart?.cartIds } }).toArray();

  return new Response(JSON.stringify(cartProducts), {
    status: 202,
    headers: {
      "Content-Type": "application/json",
    },
  });
}