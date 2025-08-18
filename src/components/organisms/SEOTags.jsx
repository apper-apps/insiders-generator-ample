import React from "react";
import ContentSection from "@/components/molecules/ContentSection";
import Badge from "@/components/atoms/Badge";

const SEOTags = ({ tags }) => {
  if (!tags || tags.length === 0) return null;

  const formatTags = () => {
    return tags.join(", ");
  };

  const getTagVariant = (index) => {
    const variants = ["primary", "indigo", "purple", "pink", "success", "warning"];
    return variants[index % variants.length];
  };

  return (
    <ContentSection
      title="SEO Tags"
      icon="Hash"
      copyText={formatTags()}
      copyLabel="Copy Tags"
    >
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <Badge 
            key={index} 
            variant={getTagVariant(index)}
            size="md"
            className="font-medium"
          >
            #{tag}
          </Badge>
        ))}
      </div>
    </ContentSection>
  );
};

export default SEOTags;