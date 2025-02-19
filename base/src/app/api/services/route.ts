import { connectDB, ServiceModel } from "@/db/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const services = await ServiceModel.find();
    return NextResponse.json({ services }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}