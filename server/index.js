// server/index.js
import express from 'express';
import cors from 'cors';
import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

let activities = []; // Replace with database integration in a real app

app.post('/api/saveActivity', (req, res) => {
  const { activity } = req.body;
  if (!activities.includes(activity)) {
    activities.push(activity);
  }
  res.status(200).send();
});

app.get('/api/getActivities', (req, res) => {
  res.json(activities);
});

app.post('/generate-summary', async (req, res) => {
  const { bulletPoints } = req.body;
  try {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: 
            `Turn the following bullet points into a cohesive session summary and narrative.
            Write an objective, concise summary of the session’s key activities and client behavior.
            Highlight responses to interventions, engagement levels, and any significant progress or challenges.
            Focus on goal achievement, describe specific interventions used, and summarize problem behaviors with ABCs (Antecedent-Behavior-Consequence) when applicable.
            Avoid subjective language:\n
            ${bulletPoints}`,
        },
      ],
      model: 'gpt-4-turbo', // or 'gpt-4' if you have access
      max_tokens: 500,
      temperature: 0.7,
    });

    const summary = response.choices[0].message.content.trim();
    res.json({ summary });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generating summary');
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});