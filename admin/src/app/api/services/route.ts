import { connectDB, ServiceModel } from "@/db/db";
import { NextResponse } from "next/server";
import { ServicesSchema } from "@/schemas/schema";

export async function GET() {
  try {
    await connectDB();
    const services = await ServiceModel.find();
    return NextResponse.json({ services }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const validatedData = ServicesSchema.parse(body);
    const service = await ServiceModel.create(validatedData.services[0]);
    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create service" }, { status: 400 });
  }
} 