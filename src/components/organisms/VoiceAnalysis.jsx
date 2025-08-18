import React from "react";
import ContentSection from "@/components/molecules/ContentSection";

const VoiceAnalysis = ({ analysis }) => {
  if (!analysis) return null;

  const analysisItems = [
    { label: "Tone", value: analysis.tone, color: "text-blue-600" },
    { label: "Style", value: analysis.style, color: "text-indigo-600" },
    { label: "Personality", value: analysis.personality, color: "text-purple-600" },
    { label: "Language Level", value: analysis.languageLevel, color: "text-green-600" }
  ];

  return (
    <ContentSection
      title="Voice Analysis"
      icon="Mic"
      copyText={`Tone: ${analysis.tone}\nStyle: ${analysis.style}\nPersonality: ${analysis.personality}\nLanguage Level: ${analysis.languageLevel}`}
    >
      <div className="grid grid-cols-2 gap-4">
        {analysisItems.map((item, index) => (
          <div key={index} className="bg-gradient-to-r from-gray-50 to-white p-3 rounded-lg border">
            <div className="text-sm font-medium text-gray-500 mb-1">{item.label}</div>
            <div className={`text-base font-semibold ${item.color}`}>{item.value}</div>
          </div>
        ))}
      </div>
    </ContentSection>
  );
};

export default VoiceAnalysis;