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
      
      if (type === 'experience') {
        systemPrompt = 'You are an expert resume writer. The user will provide their job title, company, and raw notes/descriptions. Extract and enhance ONLY the description into professional, impactful, and action-oriented bullet points (each starting with a strong action verb). Always try to improve the vocabulary and impact, even if the original text looks good. Output ONLY the final bullet points. DO NOT output the job title, company name, or headers.';
      } else if (type === 'achievement') {
        systemPrompt = 'You are an expert resume writer. Convert the provided input into a strong, measurable achievement bullet point (e.g., using numbers or percentages). Output ONLY the enhanced text without any quotes or explanations.';
      } else if (type === 'summary') {
        systemPrompt = 'You are an expert resume writer. The user will provide raw notes or their current skills/experience. Write a highly professional, engaging 2-3 sentence summary paragraph summarizing their background. NEVER output conversational filler, templates, or apologies like "Here is a summary" or "This user\'s profile is incomplete". Just write the best summary possible based on the info provided. Do not list their name or contact info. Output ONLY the summary paragraph. If the user provides absolutely no skills or experience, output exactly this fallback: "Results-driven Full Stack Software Engineer with 6+ years of experience designing, developing, and deploying scalable web applications. Skilled in React, Node.js, TypeScript, and cloud technologies with a strong focus on performance, user experience, and maintainable code. Passionate about solving complex technical challenges and delivering high-quality software solutions." Do not output anything else.';
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

  } catch (error: unknown) {
    console.error('AI API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
