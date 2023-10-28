const OpenAI = require('openai');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

const configuration = {
    apiKey: "", // Replace with your actual API key
};

const openai = new OpenAI(configuration);

app.use(bodyParser.json());
app.use(cors());


app.post('/', async (req, res) => {
    const {message} = req.body;
    const response = await openai.completions.create({
        model: "text-davinci-003",
        prompt: `${message}`,
        max_tokens: 50,
        temperature: 0,
    });
    if(response.choices){

        res.json({
            message: response.choices[0].text
        });
        console.log(response.choices[0].text);
    }
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
