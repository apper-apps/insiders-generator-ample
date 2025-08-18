import React from "react";
import ContentSection from "@/components/molecules/ContentSection";
import TextArea from "@/components/atoms/TextArea";

const YouTubeDescription = ({ description }) => {
  if (!description) return null;

  return (
    <ContentSection
      title="YouTube Description"
      icon="Play"
      copyText={description}
      copyLabel="Copy Description"
    >
      <TextArea
        value={description}
        readOnly
        rows={8}
        className="font-mono text-sm bg-gray-50"
        placeholder="Generated YouTube description will appear here..."
      />
    </ContentSection>
  );
};

export default YouTubeDescription;