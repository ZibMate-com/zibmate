import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const [rows] = await pool.execute(
      `SELECT * FROM survey_form ORDER BY created_at DESC`
    );

    return NextResponse.json(
      { success: true, data: rows },
      { status: 200 }
    );

  } catch (error) {
    console.error('Survey GET error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}