import React, { useState } from "react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import InitialState from "@/components/organisms/InitialState";
import VoiceAnalysis from "@/components/organisms/VoiceAnalysis";
import ContentMetrics from "@/components/organisms/ContentMetrics";
import YouTubeDescription from "@/components/organisms/YouTubeDescription";
import TimestampsSection from "@/components/organisms/TimestampsSection";
import SEOTags from "@/components/organisms/SEOTags";
import ForumPost from "@/components/organisms/ForumPost";
import BlogPost from "@/components/organisms/BlogPost";
import PromptEditor from "@/components/organisms/PromptEditor";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import contentService from "@/services/api/contentService";

const ContentGenerator = () => {
  const [generatedContent, setGeneratedContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPromptEditor, setShowPromptEditor] = useState(false);
  const [customPrompt, setCustomPrompt] = useState(`You are an expert content creator and SEO specialist. Transform the provided video transcript into comprehensive, SEO-optimized content for multiple platforms. Analyze the transcript and generate:

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

Focus on creating authentic, valuable content that maintains the original voice while optimizing for each platform's best practices.`);

  const handleGenerateContent = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const content = await contentService.generateContent("", customPrompt);
      setGeneratedContent(content);
      toast.success("Content generated successfully!");
    } catch (err) {
      setError(err.message);
      toast.error("Failed to generate content");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setGeneratedContent(null);
    setError(null);
    setLoading(false);
    toast.info("Content cleared");
  };

  const handleRetry = () => {
    setError(null);
    handleGenerateContent();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg">
                <ApperIcon name="Eye" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Insiders' Content Generator
                </h1>
                <p className="text-gray-600 text-sm">
                  Transform your video transcripts into SEO-optimized content instantly
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="sm"
                icon="Settings"
                onClick={() => setShowPromptEditor(true)}
              >
                EDIT PROMPT
              </Button>
              
              <AnimatePresence>
                {generatedContent && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <Button
                      variant="danger"
                      size="sm"
                      icon="RotateCcw"
                      onClick={handleReset}
                    >
                      RESET
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Loading />
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Error message={error} onRetry={handleRetry} />
            </motion.div>
          ) : !generatedContent ? (
            <motion.div
              key="initial"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <InitialState />
              <div className="mt-8 text-center">
                <Button
                  variant="primary"
                  size="lg"
                  icon="Sparkles"
                  onClick={handleGenerateContent}
                  className="shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
                >
                  Generate Demo Content
                </Button>
                <p className="mt-3 text-sm text-gray-500">
                  Click to see the content generation interface with sample data
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Top Row - Analysis and Metrics */}
              <div className="grid lg:grid-cols-2 gap-6">
                <VoiceAnalysis analysis={generatedContent.voiceAnalysis} />
                <ContentMetrics metrics={generatedContent.contentMetrics} />
              </div>

              {/* Middle Row - YouTube and Timestamps */}
              <div className="grid lg:grid-cols-2 gap-6">
                <YouTubeDescription description={generatedContent.youtubeDescription} />
                <TimestampsSection timestamps={generatedContent.timestamps} />
              </div>

              {/* SEO Tags */}
              <SEOTags tags={generatedContent.seoTags} />

              {/* Bottom Row - Forum and Blog Posts */}
              <div className="grid lg:grid-cols-2 gap-6">
                <ForumPost content={generatedContent.forumPost} />
                <BlogPost content={generatedContent.blogPost} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Prompt Editor Modal */}
      <PromptEditor
        isOpen={showPromptEditor}
        onClose={() => setShowPromptEditor(false)}
        customPrompt={customPrompt}
        setCustomPrompt={setCustomPrompt}
      />
    </div>
  );
};

export default ContentGenerator;