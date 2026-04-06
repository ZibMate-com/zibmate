import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { basic_details, pg_details, problems, reviews } = await req.json();

    if (
      //   !basic_details?.fullName ||
      !basic_details?.email ||
      //   !basic_details?.phone ||
      !basic_details?.status ||
      !basic_details?.city ||
      !basic_details?.stayDuration ||
      !pg_details?.roomType ||
      !pg_details?.monthlyRent ||
      !pg_details?.referralSource ||
      !problems?.findingProblems?.length ||
      !problems?.currentProblems?.length ||
      !reviews?.topPriorities?.length
    ) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    await pool.execute(
      `INSERT INTO survey_form (
        full_name, email, phone, status, city, stay_duration,
        room_type, monthly_rent, food_quality, referral_source, other_source,
        finding_problems, current_problems, wish_i_knew, other_finding_problem,
        top_priorities, final_comments
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        basic_details.fullName,
        basic_details.email,
        basic_details.phone,
        basic_details.status,
        basic_details.city,
        basic_details.stayDuration,
        pg_details.roomType,
        pg_details.monthlyRent,
        pg_details.foodQuality || null,
        pg_details.referralSource,
        pg_details.otherSource || null,
        JSON.stringify(problems.findingProblems),
        JSON.stringify(problems.currentProblems),
        problems.wishIKnew || null,
        problems.otherFindingProblem || null,
        JSON.stringify(reviews.topPriorities),
        reviews.finalComments || null,
      ],
    );

    return NextResponse.json({ success: true, message: "Survey submitted successfully" }, { status: 201 });
  } catch (error) {
    const err = error as any;

    if (err?.code === "ER_DUP_ENTRY") {
      return NextResponse.json(
        { success: false, message: "You have already submitted the survey with this email" },
        { status: 409 },
      );
    }
    console.error("Survey POST error:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
