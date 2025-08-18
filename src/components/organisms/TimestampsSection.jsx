import React from "react";
import ContentSection from "@/components/molecules/ContentSection";

const TimestampsSection = ({ timestamps }) => {
  if (!timestamps || timestamps.length === 0) return null;

  const formatTimestamps = () => {
    return timestamps.map(ts => `${ts.time} - ${ts.title}`).join("\n");
  };

  return (
    <ContentSection
      title="Timestamps"
      icon="Clock"
      copyText={formatTimestamps()}
      copyLabel="Copy Timestamps"
    >
      <div className="space-y-2 max-h-64 overflow-y-auto bg-gray-50 rounded-lg p-4">
        {timestamps.map((timestamp, index) => (
          <div key={index} className="flex items-start gap-3 p-2 bg-white rounded border hover:bg-blue-50 transition-colors">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-2 py-1 rounded text-sm font-mono font-medium">
              {timestamp.time}
            </div>
            <div className="flex-1 text-sm text-gray-700 font-medium leading-relaxed">
              {timestamp.title}
            </div>
          </div>
        ))}
      </div>
    </ContentSection>
  );
};

export default TimestampsSection;