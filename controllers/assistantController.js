module.exports = {
    virtualAssistant: async (req, res) => {
        try {
            const { text } = req.body;
            console.log(`Recognized Text: ${text}`);
            res.status(200).send({
                success: true
            });
        } catch (error) {
            res.status(500).send({
                success: false,
                message: "Error!",
                error: error.message,
            });
        }
    }
};
