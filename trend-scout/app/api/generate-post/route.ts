process.env.GOOGLE_GENERATIVE_AI_API_KEY = "AQ.Ab8RN6ItLhX-hv5K096zMTxWRrYNOvBam1d89TVRdTpZHt7V_A"; // Paste your real key inside these quotes!
import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const SocialPostSchema = z.object({
  trendSummary: z.string(),
  suggestedPosts: z.array(
    z.object({
      angle: z.enum(['contrarian', 'educational', 'humorous']),
      hook: z.string(),
      bodyText: z.string(),
      visualPrompt: z.string(),
      suggestedHashtags: z.array(z.string())
    })
  )
});

export async function POST(req: Request) {
  try {
    const { niche, creatorTone, viralEventData } = await req.json();

    if (!niche || !viralEventData) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const { object } = await generateObject({
      model: google('gemini-2.5-flash'),
      schema: SocialPostSchema,
      system: `You are an elite social media strategist.`,
      prompt: `Analyze this trend: "${viralEventData}" for the niche: "${niche}" with tone: "${creatorTone}". Generate 3 post options (one contrarian, one educational, one humorous).`,
    });

    return NextResponse.json({ success: true, data: object }, { status: 200 });

  } catch (error: any) {
    console.error("Backend Error Details:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
