import { connectDB, ProductModel } from "@/db/db";
import { NextResponse } from "next/server";
import { ProductsSchema } from "@/schemas/schema";

export async function GET() {
  try {
    await connectDB();
    const products = await ProductModel.find();
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const validatedData = ProductsSchema.parse(body);
    const product = await ProductModel.create(validatedData.products[0]);
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create product" }, { status: 400 });
  }
} 