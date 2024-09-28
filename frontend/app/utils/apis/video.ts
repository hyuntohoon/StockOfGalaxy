// app/utils/apis/video.ts
import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
        return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // 여기서 비디오 파일 경로를 적절히 설정
    const videoPath = `./public${url}`; // 예를 들어, public/video/main_video.mp4

    try {
        const videoStream = await fetch(videoPath); // Fetching the video
        if (!videoStream.ok) {
            throw new Error('Video not found');
        }
        return NextResponse.json(videoStream.body);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 404 });
    }
}
