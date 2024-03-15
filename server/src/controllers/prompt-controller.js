const inputPrompt = require("../models/input-prompt")
const openai = require("../config/openai");

module.exports = {
    async sendText(req, res) {

        const openaiApi = openai.configuration();
        const inputModel = new inputPrompt(req.body)

        try {
            // Aqui ouve uma alteração de '.createCompletion' para '.completions.create'
            const response = await openaiApi.completions.create(
                openai.textCompletion(inputModel)
            )

            return res.status(200).json({
                sucess:true,
                // aqui removemos '.data" que vinha antes do '.choices'
                data: response.choices[0].text
            })
        } catch (error) {
            
            return res.status(400).json({
                sucess: false,
                error: error.response 
                ? error.response.data 
                :"There was an inssue on the server"
            })
        }
    }
}