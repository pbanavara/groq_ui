import { Groq } from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: Request) {
    try {
        const { messages } = await request.json();

        const completion = await groq.chat.completions.create({
            messages,
            model: "mixtral-8x7b-32768",
            temperature: 0.7,
            max_tokens: 1024,
        });

        return NextResponse.json(completion.choices[0].message);
    } catch (error) {
        return NextResponse.json(
            { error: error },
            { status: 500 }
        );
    }
}
