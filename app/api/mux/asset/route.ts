// app/api/mux/asset/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

interface MuxAssetResponse {
    data: {
        id: string;
        playback_ids: Array<{ policy: string; id: string }>;
        status: string;
    };
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const assetId = searchParams.get('assetId');

    if (!assetId) {
        return NextResponse.json({ error: 'Missing assetId' }, { status: 400 });
    }

    const muxTokenId = process.env.MUX_TOKEN_ID;
    const muxTokenSecret = process.env.MUX_TOKEN_SECRET;

    if (!muxTokenId || !muxTokenSecret) {
        return NextResponse.json({ error: 'Mux credentials are not set' }, { status: 500 });
    }

    try {
        const response = await axios.get<MuxAssetResponse>(
            `https://api.mux.com/video/v1/assets/${assetId}`,
            {
                auth: {
                username: muxTokenId,
                password: muxTokenSecret
                }
            }
        );

        const asset = response.data.data;
        const exists = asset.status === 'ready' && asset.playback_ids.length > 0;

        return NextResponse.json({ 
            exists,
            assetId: asset.id,
            playbackIds: asset.playback_ids.map(pid => pid.id),
            status: asset.status
        });
    } catch (error) {
        console.error('Error fetching Mux asset:', error);
        return NextResponse.json({ error: 'Failed to fetch Mux asset' }, { status: 500 });
    }
}