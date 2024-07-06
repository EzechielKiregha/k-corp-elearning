// app/lib/muxApi.ts
import axios from 'axios';

interface PlaybackIdResponse {
  // Define the structure of the response from Mux API
  // This is an example, adjust according to the actual response
    data : {
        id: string;
        policy: string;
    }
  // ... other fields
}

export async function getPlaybackId(assetId: string, playbackId: string): Promise<PlaybackIdResponse> {
    const muxTokenId = process.env.MUX_TOKEN_ID;
    const muxTokenSecret = process.env.MUX_TOKEN_SECRET;

    if (!muxTokenId || !muxTokenSecret) {
        throw new Error('Mux credentials are not set');
    }

    try {
        const response = await axios.get<PlaybackIdResponse>(
        `https://api.mux.com/video/v1/assets/${assetId}/playback-ids/${playbackId}`,
        {
            headers: {
            'Content-Type': 'application/json'
            },
            auth: {
            username: muxTokenId,
            password: muxTokenSecret
            }
        }
        );

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data || error.message);
        } else {
        console.error('Unexpected error:', error);
        }
        throw error;
  }
}