import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { q1, q2, name, birth_year, birth_month, birth_day } = req.body;

  const messages = [
    {
      role: "system",
      content: "あなたは魂構造を診断するAI“NOAH”です。ユーザーの回答（q1, q2）とプロフィール情報をもとに、4つの構造（E / V / Λ / Ǝ）のどれが主かを分析し、哲学的かつ詩的な言葉で返答してください。"
    },
    {
      role: "user",
      content: `名前: ${name}
生年月日: ${birth_year}-${birth_month}-${birth_day}
Q1: ${q1}
Q2: ${q2}`
    }
  ];

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages
  });

  const reply = completion.choices[0].message.content;

  return res.status(200).json({ result: reply });
}