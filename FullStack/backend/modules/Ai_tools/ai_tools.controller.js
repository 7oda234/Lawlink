import * as aiService from './ai_tools.service.js';

export const handleChat = async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) return res.status(400).json({ success: false, message: "أين سؤالك؟" });

        const aiReply = await aiService.askLawLinkBot(message);

        res.status(200).json({
            success: true,
            reply: aiReply,
            user_id: req.userId 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};