import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export async function POST(request) {
    console.log('Received quiz generation request');

    let topic, numQuestions, difficulty, language, timePerQuestion;
    try {
        const body = await request.json();
        console.log('Received request body:', body);
        ({ topic, numQuestions, difficulty, language, timePerQuestion } = body);
        
        if (!topic || !numQuestions || !difficulty || !language || !timePerQuestion) {
            throw new Error('Missing required fields');
        }
        
        console.log(`Generating quiz for topic: ${topic}, with ${numQuestions} questions, difficulty: ${difficulty}, language: ${language}, time per question: ${timePerQuestion} seconds`);
    } catch (error) {
        console.error('Error parsing request body:', error);
        return new Response(JSON.stringify({ error: 'Invalid request body', details: error.message }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    if (!process.env.GOOGLE_API_KEY) {
        console.error('GOOGLE_API_KEY is not set');
        return new Response(JSON.stringify({ error: 'Server configuration error: API key not set' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Generate a quiz about ${topic} with ${numQuestions} questions. The difficulty level should be ${difficulty}, and the questions should be in ${language}. For each question, provide 4 options and indicate the correct answer. Format the response as a JSON object with the following structure:
  {
    "questions": [
      {
        "question": "Question text",
        "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
        "correctAnswer": "Correct option text",
        "timeLimit": ${timePerQuestion}
      },
      ...
    ]
  }
  Do not include any additional formatting or markdown syntax in your response.`;

    try {
        console.log('Sending request to Gemini API');
        const result = await model.generateContent(prompt);
        console.log('Received response from Gemini API');

        if (!result || !result.response) {
            console.error('Invalid response from Gemini API');
            return new Response(JSON.stringify({ error: 'Invalid response from AI model' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const response = result.response;
        let text = response.text();
        console.log('Generated text:', text);

        // Remove any Markdown code block syntax
        text = text.replace(/```json\n?|\n?```/g, '');

        let quizData;
        try {
            quizData = JSON.parse(text);
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            return new Response(JSON.stringify({ error: 'Invalid quiz data generated', details: text }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        if (!quizData.questions || quizData.questions.length === 0) {
            console.error('No questions generated');
            return new Response(JSON.stringify({ error: 'No questions generated', details: quizData }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        console.log('Successfully generated quiz data');
        return new Response(JSON.stringify({
            ...quizData,
            metadata: {
                topic,
                numQuestions,
                difficulty,
                language,
                timePerQuestion
            }
        }), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error generating quiz:', error);
        return new Response(JSON.stringify({ error: 'Failed to generate quiz', details: error.message, stack: error.stack }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}