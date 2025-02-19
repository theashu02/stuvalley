import { connectDB, ProductModel } from "@/db/db";
import { NextResponse } from "next/server";
import { ProductsSchema } from "@/schemas/schema";

export async function GET() {
  try {
    await connectDB();
    const products = await ProductModel.find();
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
