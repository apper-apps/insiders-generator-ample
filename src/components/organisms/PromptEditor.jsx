import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/atoms/Button";
import TextArea from "@/components/atoms/TextArea";
import ApperIcon from "@/components/ApperIcon";

const PromptEditor = ({ isOpen, onClose, customPrompt, setCustomPrompt }) => {
  const [localPrompt, setLocalPrompt] = useState(customPrompt);

  const defaultPrompt = `You are an expert content creator and SEO specialist. Transform the provided video transcript into comprehensive, SEO-optimized content for multiple platforms. Analyze the transcript and generate:

1. VOICE ANALYSIS:
- Tone (professional, casual, enthusiastic, etc.)
- Style (conversational, authoritative, educational, etc.) 
- Personality traits (confident, approachable, expert, etc.)
- Language level (beginner, intermediate, advanced, expert)

2. CONTENT METRICS:
- Accurate word count of transcript
- Estimated video length
- Primary content category
- 8-12 relevant keywords/phrases

3. YOUTUBE DESCRIPTION:
- Compelling hook in first 125 characters
- Detailed description with timestamps
- Relevant hashtags and keywords
- Call-to-action and engagement prompts

4. TIMESTAMPS:
- 6-10 key moments with exact timestamps
- Descriptive titles for each section
- Natural chapter breaks

5. SEO TAGS:
- 15-20 relevant tags for discoverability
- Mix of broad and specific keywords
- Platform-optimized hashtags

6. FORUM POST:
- Engaging discussion starter
- Key insights and takeaways
- Questions to encourage engagement
- Community-appropriate tone

7. BLOG POST:
- SEO-optimized article (800-1200 words)
- Compelling headline and introduction
- Structured sections with subheadings
- Markdown formatting for easy copying
- Meta description and conclusion

Focus on creating authentic, valuable content that maintains the original voice while optimizing for each platform's best practices.`;

  const handleSave = () => {
    setCustomPrompt(localPrompt);
    onClose();
  };

  const handleReset = () => {
    setLocalPrompt(defaultPrompt);
  };

  const handleCancel = () => {
    setLocalPrompt(customPrompt);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col border border-white/50"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                  <ApperIcon name="Settings" size={18} />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Edit Generation Prompt</h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                icon="X"
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              />
            </div>

            {/* Content */}
            <div className="flex-1 p-6 overflow-hidden">
              <div className="h-full flex flex-col">
                <div className="mb-4">
                  <p className="text-sm text-gray-600">
                    Customize the AI prompt to tailor content generation to your specific needs.
                  </p>
                </div>
                <div className="flex-1">
                  <TextArea
                    value={localPrompt}
                    onChange={(e) => setLocalPrompt(e.target.value)}
                    className="h-full min-h-[400px] font-mono text-sm resize-none"
                    placeholder="Enter your custom prompt here..."
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50/50">
              <Button
                variant="outline"
                size="sm"
                icon="RefreshCw"
                onClick={handleReset}
              >
                Reset to Default
              </Button>
              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  icon="Check"
                  onClick={handleSave}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PromptEditor;