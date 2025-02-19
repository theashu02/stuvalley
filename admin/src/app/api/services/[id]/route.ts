import { connectDB, ServiceModel } from "@/db/db";
import { NextResponse } from "next/server";
import { ServiceCategorySchema } from "@/schemas/schema";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const body = await request.json();
    const validatedData = ServiceCategorySchema.parse(body);
    const service = await ServiceModel.findByIdAndUpdate(
      params.id,
      validatedData,
      { new: true }
    );
    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }
    return NextResponse.json(service, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update service" }, { status: 400 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const service = await ServiceModel.findByIdAndDelete(params.id);
    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Service deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete service" }, { status: 400 });
  }
} 