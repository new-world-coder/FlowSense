const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateContract = async (req, res) => {
  try {
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({ error: 'Description is required' });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert Cadence smart contract developer for the Flow blockchain. Generate secure, well-documented Cadence smart contracts based on user descriptions. Always include proper access control, events, and follow Flow best practices."
        },
        {
          role: "user",
          content: `Generate a Cadence smart contract for the following dApp idea: ${description}`
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const generatedContract = completion.choices[0].message.content;

    res.json({
      success: true,
      contract: generatedContract,
      description: description
    });

  } catch (error) {
    console.error('Error generating contract:', error);
    res.status(500).json({ 
      error: 'Failed to generate contract',
      message: error.message 
    });
  }
};

const explainContract = async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'Contract code is required' });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert Cadence smart contract educator. Explain Cadence smart contracts in a clear, concise way that developers can understand. Focus on what the contract does, key functions, security considerations, and best practices. Use simple language and bullet points when helpful."
        },
        {
          role: "user",
          content: `Explain this Cadence smart contract:\n\n${code}`
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const explanation = completion.choices[0].message.content;

    res.json({
      success: true,
      explanation: explanation,
    });

  } catch (error) {
    console.error('Error explaining contract:', error);
    res.status(500).json({ 
      error: 'Failed to explain contract',
      message: error.message 
    });
  }
};

module.exports = {
  generateContract,
  explainContract
};

