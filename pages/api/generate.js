import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = 
`
Write a summary of the 10K file given in a way that explains in a list the top 3-5 risks of the company, and go into detail about them from research in the 10K report and any external ones. Then add a section and talk about competitors and alternatives for the business, and finally, a projected future of the company(successful or not successful) 
Also, have headlines for each section, such as "Risks", "Competition", "Projected Future" so the user knows which section is what. And go into some detail too. 


Link: 
`
;
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.7,
    max_tokens: 800,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;