import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const chapterId = searchParams.get('chapterId');

    if (!chapterId) {
        return NextResponse.json({ error: 'Chapter ID is required' }, { status: 400 });
    }

    try {
        const muxData = await db.muxData.findFirst({
        where: {
            chapterId: chapterId
        }
        });

        if (!muxData) {
            return NextResponse.json({ exists: false });
        }

        const response = await fetch(`https://api.mux.com/video/v1/assets/${muxData.assetId}/playback-ids/${muxData.playbackId}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + Buffer.from(`${process.env.MUX_TOKEN_ID}:${process.env.MUX_TOKEN_SECRET}`).toString('base64'),
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            if (response.status === 404) {
                console.log('Video not found : ', response.status);
                return NextResponse.json({ exists: false });
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
        }

        const data = await response.json();

        if (data.id === muxData.playbackId) {
            return NextResponse.json({ exists: true });
        } else {
            return NextResponse.json({ exists: false });
        }
    } catch (error) {
        console.error('Error checking Mux video status:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
