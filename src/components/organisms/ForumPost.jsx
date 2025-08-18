import React from "react";
import ContentSection from "@/components/molecules/ContentSection";
import TextArea from "@/components/atoms/TextArea";

const ForumPost = ({ content }) => {
  if (!content) return null;

  return (
    <ContentSection
      title="Forum Post"
      icon="MessageSquare"
      copyText={content}
      copyLabel="Copy Forum Post"
    >
      <TextArea
        value={content}
        readOnly
        rows={10}
        className="font-mono text-sm bg-gray-50"
        placeholder="Generated forum post content will appear here..."
      />
    </ContentSection>
  );
};

export default ForumPost;