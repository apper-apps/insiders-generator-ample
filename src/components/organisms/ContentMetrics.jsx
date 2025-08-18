import React from "react";
import ContentSection from "@/components/molecules/ContentSection";
import Badge from "@/components/atoms/Badge";

const ContentMetrics = ({ metrics }) => {
  if (!metrics) return null;

  const formatKeywords = (keywords) => {
    return keywords.join(", ");
  };

  const metricsText = `Word Count: ${metrics.wordCount}\nVideo Length: ${metrics.videoLength}\nCategory: ${metrics.category}\nKeywords: ${formatKeywords(metrics.keywords)}`;

  return (
    <ContentSection
      title="Content Metrics"
      icon="BarChart3"
      copyText={metricsText}
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg border">
          <div className="text-sm font-medium text-gray-500 mb-1">Word Count</div>
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {metrics.wordCount.toLocaleString()}
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-lg border">
          <div className="text-sm font-medium text-gray-500 mb-1">Video Length</div>
          <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            {metrics.videoLength}
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-lg border">
          <div className="text-sm font-medium text-gray-500 mb-1">Category</div>
          <div className="text-base font-semibold text-purple-600">{metrics.category}</div>
        </div>
        <div className="bg-gradient-to-r from-gray-50 to-slate-50 p-3 rounded-lg border">
          <div className="text-sm font-medium text-gray-500 mb-2">Keywords</div>
          <div className="flex flex-wrap gap-1">
            {metrics.keywords.slice(0, 3).map((keyword, index) => (
              <Badge key={index} variant="primary" size="xs">
                {keyword}
              </Badge>
            ))}
            {metrics.keywords.length > 3 && (
              <Badge variant="default" size="xs">
                +{metrics.keywords.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      </div>
    </ContentSection>
  );
};

export default ContentMetrics;