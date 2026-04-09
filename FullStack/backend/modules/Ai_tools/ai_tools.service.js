import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "YOUR_OPENAI_API_KEY", // حط مفتاحك هنا
});

export const askLawLinkBot = async (userMessage) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "أنت مساعد قانوني ذكي لمشروع LawLink." },
                { role: "user", content: userMessage }
            ],
        });
        return response.choices[0].message.content;
    } catch (error) {
        throw new Error("نظام الـ AI غير متاح حالياً.");
    }
};