import React, { useState } from "react";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const InitialState = () => {
  const steps = [
    "Upload your video transcript",
    "AI analyzes voice and content",
    "Generates optimized content",
    "Copy and use across platforms"
  ];

  const contentTypes = [
    "Voice & tone analysis",
    "YouTube descriptions", 
    "Blog post content",
    "Forum discussions",
    "SEO-optimized tags",
    "Timestamp breakdowns"
  ];

  return (
    <Card className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-4">
          <ApperIcon name="Upload" size={32} className="text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Ready to Generate Content</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Transform your video transcripts into SEO-optimized content across multiple formats instantly. 
          Simply upload your transcript and let our AI do the work.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <ApperIcon name="Sparkles" size={18} className="text-blue-600" />
            How it works
          </h3>
          <div className="space-y-3">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-gray-700 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>

<div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <ApperIcon name="ArrowDown" size={18} className="text-green-600" />
            What do you need?
          </h3>
          <div className="space-y-3">
            {contentTypes.map((type, index) => {
              const [selectedTypes, setSelectedTypes] = useState(new Array(contentTypes.length).fill(false));
              
              const toggleContentType = (index) => {
                const newSelected = [...selectedTypes];
                newSelected[index] = !newSelected[index];
                setSelectedTypes(newSelected);
              };

              return (
                <div 
                  key={index} 
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() => toggleContentType(index)}
                >
                  <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
                    selectedTypes[index] 
                      ? 'bg-green-100' 
                      : 'border-2 border-gray-300 bg-white'
                  }`}>
                    {selectedTypes[index] && (
                      <ApperIcon name="Check" size={14} className="text-green-600" />
                    )}
                  </div>
                  <p className="text-gray-700">{type}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <ApperIcon name="RefreshCw" size={18} className="text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Demo Mode Active</h4>
              <p className="text-sm text-gray-600">
                Click the "EDIT PROMPT" button above to see how the content generation interface works with sample data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default InitialState;