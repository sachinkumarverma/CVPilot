import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// We'll use a fast, reliable model on Groq that supports JSON
const MODEL = 'llama-3.1-8b-instant';

export async function POST(req: NextRequest) {
  try {
    const groq = new OpenAI({
      apiKey: process.env.GROQ_API_KEY || 'dummy-key',
      baseURL: 'https://api.groq.com/openai/v1',
    });

    const body = await req.json();
    const { action, payload } = body;

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ 
        error: 'Groq API key is missing. Please add GROQ_API_KEY to your .env.local file. Get a free one at console.groq.com' 
      }, { status: 500 });
    }

    if (action === 'generate_resume') {
      const { jobTitle, experienceLevel, skills } = payload;
      
      const response = await groq.chat.completions.create({
        model: MODEL,
        response_format: { type: 'json_object' },
        messages: [
          {
            role: 'system',
            content: `You are an expert resume writer. Generate realistic, ATS-optimized resume content.
Return JSON strictly in this format:
{
  "summary": "Professional summary paragraph...",
  "skills": ["Skill 1", "Skill 2"],
  "experience": [
    {
      "position": "Job Title",
      "company": "Company Name",
      "startDate": "YYYY",
      "endDate": "YYYY or Present",
      "description": "Bullet 1\\nBullet 2\\nBullet 3"
    }
  ],
  "projects": [
    {
      "name": "Project Name",
      "description": "Project description..."
    }
  ]
}`
          },
          {
            role: 'user',
            content: `Create resume content for a ${experienceLevel} ${jobTitle} with skills in ${skills}.`
          }
        ],
      });

      const result = JSON.parse(response.choices[0].message.content || '{}');
      return NextResponse.json(result);
    }

    if (action === 'enhance_bullet') {
      const { text, type } = payload;
      
      let systemPrompt = 'You are an expert resume writer. Enhance the provided text to be professional, impactful, and action-oriented. Output ONLY the enhanced text without any quotes or explanations.';
      
      if (type === 'achievement') {
        systemPrompt = 'You are an expert resume writer. Convert the provided input into a strong, measurable achievement bullet point (e.g., using numbers or percentages). Output ONLY the enhanced text without any quotes or explanations.';
      } else if (type === 'grammar') {
        systemPrompt = 'You are an expert proofreader. Fix any grammar issues, remove weak phrases, and improve readability of the provided text while keeping its meaning. Output ONLY the fixed text without any quotes or explanations.';
      }

      const response = await groq.chat.completions.create({
        model: MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: text }
        ],
        temperature: 0.5,
      });

      const enhancedText = response.choices[0].message.content?.trim() || '';
      const cleanText = enhancedText.replace(/^["']|["']$/g, '').trim();
      return NextResponse.json({ result: cleanText });
    }

    if (action === 'score_resume') {
      const { resumeData } = payload;
      
      const response = await groq.chat.completions.create({
        model: MODEL,
        response_format: { type: 'json_object' },
        messages: [
          {
            role: 'system',
            content: `You are an expert ATS (Applicant Tracking System) software. Evaluate the provided resume JSON data.
Return JSON strictly in this format:
{
  "score": 85,
  "good": ["Good point 1", "Good point 2"],
  "improvements": ["Improvement 1", "Improvement 2"]
}`
          },
          {
            role: 'user',
            content: JSON.stringify(resumeData)
          }
        ],
      });

      const result = JSON.parse(response.choices[0].message.content || '{}');
      return NextResponse.json(result);
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

  } catch (error: any) {
    console.error('AI API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
