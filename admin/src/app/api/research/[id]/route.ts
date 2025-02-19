import { connectDB, ResearchModel } from "@/db/db";
import { NextResponse } from "next/server";
import { ResearchContributionSchema } from "@/schemas/schema";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const body = await request.json();
    const { id } = await params;
    const validatedData = ResearchContributionSchema.parse(body);
    const research = await ResearchModel.findByIdAndUpdate(id, validatedData, {
      new: true,
    });
    if (!research) {
      return NextResponse.json(
        { error: "Research not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(research, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update research" },
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
    const research = await ResearchModel.findByIdAndDelete(id);
    if (!research) {
      return NextResponse.json(
        { error: "Research not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: "Research deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete research" },
      { status: 400 }
    );
  }
}
