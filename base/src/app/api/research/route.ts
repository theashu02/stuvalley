import { connectDB, ResearchModel } from "@/db/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const research = await ResearchModel.find();
    return NextResponse.json({ research_contributions: research }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch research" }, { status: 500 });
  }
}