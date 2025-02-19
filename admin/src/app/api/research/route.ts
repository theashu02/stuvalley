import { connectDB, ResearchModel } from "@/db/db";
import { NextResponse } from "next/server";
import { ResearchSchema } from "@/schemas/schema";

export async function GET() {
  try {
    await connectDB();
    const research = await ResearchModel.find();
    return NextResponse.json({ research_contributions: research }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch research" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const validatedData = ResearchSchema.parse(body);
    const research = await ResearchModel.create(validatedData.research_contributions[0]);
    return NextResponse.json(research, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create research" }, { status: 400 });
  }
} 