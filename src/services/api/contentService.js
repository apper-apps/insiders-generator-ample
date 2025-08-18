import sampleContent from "@/services/mockData/sampleContent.json";

const contentService = {
  generateContent: async (transcript, customPrompt) => {
    // Simulate API delay for realistic loading state
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      // In a real application, this would make an API call
      // For demo purposes, we return the mock data
      const content = { ...sampleContent };
      
      // Add some variation to make it feel more dynamic
      const variations = {
        wordCount: Math.floor(Math.random() * 500) + 2500,
        videoLength: `${Math.floor(Math.random() * 10) + 15}:${Math.floor(Math.random() * 59).toString().padStart(2, '0')}`,
        category: ["Technology & Education", "Business & Marketing", "Creative & Design", "Health & Wellness"][Math.floor(Math.random() * 4)]
      };
      
      content.contentMetrics = {
        ...content.contentMetrics,
        ...variations
      };
      
      return content;
    } catch (error) {
      console.error("Content generation failed:", error);
      throw new Error("Failed to generate content. Please try again.");
    }
  }
};

export default contentService;