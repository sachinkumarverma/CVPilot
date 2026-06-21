import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt, type } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // Since we want this to work without any API keys, we'll build a robust 
    // local generator that produces realistic-looking professional text.
    await new Promise(resolve => setTimeout(resolve, 1500)); // simulate network latency

    let content = '';

    if (type === 'summary') {
      const keywords = ['Driven', 'Results-oriented', 'Innovative', 'Strategic', 'Dynamic'];
      const roles = ['Professional', 'Specialist', 'Leader', 'Expert', 'Contributor'];
      
      const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
      const randomRole = roles[Math.floor(Math.random() * roles.length)];
      
      content = `${randomKeyword} ${randomRole} with a proven track record of delivering high-quality results. Skilled in cross-functional collaboration, problem-solving, and driving continuous improvement. Adept at leveraging deep industry knowledge to streamline processes and exceed organizational goals.`;
    } else if (type === 'experience') {
      content = `- Spearheaded cross-functional initiatives that resulted in a 25% increase in operational efficiency within the first year.\n- Managed end-to-end project lifecycles, ensuring timely delivery and strict adherence to budget constraints.\n- Mentored and trained junior team members, fostering a culture of continuous learning and professional development.\n- Implemented data-driven strategies that optimized performance and enhanced client satisfaction scores by 15%.`;
    } else {
      content = `Generated professional content for your resume. Ensure you review and tweak it to best match your actual experience.`;
    }

    return NextResponse.json({ content });
  } catch (error: unknown) {
    console.error('Local Generation Error:', error);
    return NextResponse.json({ error: 'Failed to generate content' }, { status: 500 });
  }
}
