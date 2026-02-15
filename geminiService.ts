
import { GoogleGenAI } from "@google/genai";

// Initialize GoogleGenAI client with the API key from environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIQuoteAdvice = async (userRequirement: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `User is looking for bus rental in Dubai/UAE. Their requirement: "${userRequirement}". 
      As a friendly representative for "Axis Passenger Transport Bus Rent LLC", recommend the best vehicle from our fleet (50-seater Luxury, 35-seater Coach, 30-seater Coaster, 15-seater Hiace, 9-seater H1, or 4x4) and explain why it fits. 
      Keep it professional, helpful, and concise (max 3 sentences). End with a friendly closing inviting them to fill the contact form.`,
      config: {
        temperature: 0.7,
        topP: 0.8,
      }
    });
    // Accessing text content directly via property.
    return response.text;
  } catch (error) {
    console.error("AI Assistant error:", error);
    return "Thank you for your interest! Please leave your details in our contact form and our transport specialists will provide a custom quote within 30 minutes.";
  }
};
