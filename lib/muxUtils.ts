import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { db } from '@/lib/db'; // Adjust the path to your db file

const MUX_API_URL = 'https://api.mux.com/video/v1/assets/';

const checkMuxVideoExists = async (chapterId: string): Promise<boolean> => {
    try {
        const existingMuxVideo = await db.muxData.findFirst({
            where: {
                chapterId: chapterId,
            },
        });

        if (existingMuxVideo) {
            const response = await axios.get(`${MUX_API_URL}${existingMuxVideo.assetId}/playback-ids/${existingMuxVideo.playbackId}`, {
                auth: {
                username: process.env['MUX_TOKEN_ID']!,
                password: process.env['MUX_TOKEN_SECRET']!,
                },
        });

        return response.data.data.id === existingMuxVideo.playbackId;
        }
        return false;
    } catch (error) {
        console.error('Error checking Mux video status:', error);
        return false;
    }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { chapterId } = req.query;

    if (!chapterId || typeof chapterId !== 'string') {
        res.status(400).json({ error: 'Invalid chapter ID' });
        return;
    }

    const exists = await checkMuxVideoExists(chapterId);
    res.status(200).json({ exists });
}
