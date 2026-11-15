import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { topic } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'API Key nahi mili' });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Tum ek Urdu shayar ho. Mozu: "${topic}". 
    4 misron ki khoobsurat Urdu shayari likho. Sirf shayari likho, koi extra baat nahi.`;

    const result = await model.generateContent(prompt);
    const shayari = result.response.text();

    res.status(200).json({ shayari });
  } catch (error) {
    res.status(500).json({ error: 'Shayari banane mein masla aa gaya' });
  }
}
