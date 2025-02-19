import { connectDB, ServiceModel } from "@/db/db";
import { NextResponse } from "next/server";
import { ServiceCategorySchema } from "@/schemas/schema";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
     const { id } = await params; 
    const body = await request.json();
    const validatedData = ServiceCategorySchema.parse(body);
    const service = await ServiceModel.findByIdAndUpdate(
      id,
      validatedData,
      { new: true }
    );
    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }
    return NextResponse.json(service, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update service" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
     const { id } = await params; 
    const service = await ServiceModel.findByIdAndDelete(id);
    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Service deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete service" },
      { status: 400 }
    );
  }
} 