import { NextResponse } from 'next/server';
import pool from '../../lib/db';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // Handle file upload
    let proofPath = null;
    const proofFile = formData.get('proof') as File;
    
    if (proofFile) {
      const bytes = await proofFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Create unique filename
      const filename = `${Date.now()}-${proofFile.name}`;
      const uploadDir = join(process.cwd(), 'public', 'uploads');
      const filepath = join(uploadDir, filename);
      
      await writeFile(filepath, buffer);
      proofPath = `/uploads/${filename}`;
    }

    // Extract other form data
    const feedbackData = {
      regNo: formData.get('regNo'),
      name: formData.get('name'),
      block: formData.get('block'),
      room: formData.get('room'),
      messName: formData.get('messName'),
      messType: formData.get('messType'),
      category: formData.get('category'),
      feedbackType: formData.get('feedbackType'),
      comments: formData.get('comments'),
      proofPath
    };

    const [result] = await pool.execute(
      `INSERT INTO feedback (
        regNo,
        name,
        block,
        room,
        messName,
        messType,
        category,
        feedbackType,
        comments,
        proof_path,
        created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        feedbackData.regNo,
        feedbackData.name,
        feedbackData.block,
        feedbackData.room,
        feedbackData.messName,
        feedbackData.messType,
        feedbackData.category,
        feedbackData.feedbackType,
        feedbackData.comments,
        feedbackData.proofPath
      ]
    );

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit feedback' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM feedback ORDER BY created_at DESC');
    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching feedback:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch feedback' },
      { status: 500 }
    );
  }
}
