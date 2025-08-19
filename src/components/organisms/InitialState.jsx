import React, { useState } from "react";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import TextArea from "@/components/atoms/TextArea";

const InitialState = ({ onSelectionChange, transcript, onTranscriptChange }) => {
  const steps = [
    "Upload your video transcript",
    "AI analyzes voice and content",
    "Generates optimized content",
    "Copy and use across platforms"
  ];

const contentTypes = [
    "Voice & tone analysis",
    "YouTube descriptions", 
    "Forum discussions",
    "SEO-optimized tags",
    "Timestamp breakdowns",
    "Blog post"
  ];

  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState(() => {
    // Initialize with database-compliant default states
    // All types checked except blog post (last item) which defaults to unchecked
    const defaultStates = contentTypes.map((_, index) => {
      // Blog post (last item) defaults to unchecked per default_checkbox_state_c field
      return index !== contentTypes.length - 1;
    });
    return defaultStates;
  });
  
  const toggleContentType = (index) => {
    const newSelected = [...selectedTypes];
    newSelected[index] = !newSelected[index];
    setSelectedTypes(newSelected);
    // Pass selections to parent if callback provided
    if (onSelectionChange) {
      onSelectionChange(newSelected);
    }
  };

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

{/* Top Section: Two Column Layout */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Left Column: How it works */}
        <Card className="space-y-4">
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
        </Card>

        {/* Right Column: What do you need? */}
        <Card className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <ApperIcon name="ArrowDown" size={18} className="text-green-600" />
            What do you need?
          </h3>
          <div className="space-y-3">
            {contentTypes.map((type, index) => {
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
        </Card>
      </div>

      {/* Bottom Section: Full Width Add your transcript - Horizontal Layout */}
      <div className="w-full">
        <Card className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <ApperIcon name="Upload" size={18} className="text-purple-600" />
            Add your transcript
          </h3>
          
          {/* Horizontal Layout for Transcript Input and File Upload */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left: Transcript Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Paste transcript or upload file
              </label>
              <TextArea
                value={transcript}
                onChange={(e) => onTranscriptChange?.(e.target.value)}
                placeholder="Paste your video transcript here..."
                rows={6}
                className="resize-none"
              />
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>{transcript.length} characters</span>
                {transcript.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onTranscriptChange?.('')}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    Clear
                  </Button>
                )}
              </div>
            </div>

            {/* Right: File Upload */}
            <div className="space-y-2">
              
              <div
                className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
                  isDragOver 
                    ? 'border-purple-400 bg-purple-50' 
                    : 'border-gray-300 hover:border-purple-400 hover:bg-purple-50'
                }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragOver(true);
                }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragOver(false);
                  const files = Array.from(e.dataTransfer.files);
                  handleFileUpload(files[0]);
                }}
              >
                <input
                  type="file"
                  id="transcript-upload"
                  accept=".srt,.vtt,.txt"
                  onChange={(e) => handleFileUpload(e.target.files[0])}
                  className="hidden"
                />
                <label htmlFor="transcript-upload" className="cursor-pointer">
                  <ApperIcon name="Upload" size={24} className="text-purple-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700">
                    Upload transcript file
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    SRT, VTT, or TXT files
                  </p>
                </label>
              </div>

            </div>
          </div>
        </Card>
      </div>

      {/* File Upload Handler */}
      <script dangerouslySetInnerHTML={{
        __html: `
          window.handleFileUpload = ${handleFileUpload.toString()};
        `
      }} />

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

  // File upload handler function
  function handleFileUpload(file) {
    if (!file) return;
    
    const validTypes = ['text/plain', 'application/x-subrip', 'text/vtt'];
    const validExtensions = ['.txt', '.srt', '.vtt'];
    const hasValidExtension = validExtensions.some(ext => 
      file.name.toLowerCase().endsWith(ext)
    );
    
    if (!validTypes.includes(file.type) && !hasValidExtension) {
      toast.error('Please upload a valid transcript file (SRT, VTT, or TXT)');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      let content = e.target.result;
      
      // Parse based on file type
if (file.name.toLowerCase().endsWith('.srt')) {
        content = parseSRT(content);
      } else if (file.name.toLowerCase().endsWith('.vtt')) {
        content = parseVTT(content);
      }
      
      onTranscriptChange?.(content);
      toast.success(`Transcript uploaded successfully (${file.name})`);
    };
    
    reader.onerror = () => {
      toast.error('Error reading file. Please try again.');
    };
    
    reader.readAsText(file);
  }

  // SRT parser
  function parseSRT(content) {
    return content
      .replace(/^\d+\s*$/gm, '')  // Remove subtitle numbers
      .replace(/\d{2}:\d{2}:\d{2},\d{3}\s*-->\s*\d{2}:\d{2}:\d{2},\d{3}/g, '') // Remove timestamps
      .replace(/\n\s*\n/g, '\n') // Remove empty lines
      .trim();
  }

  // VTT parser  
  function parseVTT(content) {
    return content
      .replace(/^WEBVTT\s*$/m, '') // Remove WEBVTT header
      .replace(/\d{2}:\d{2}:\d{2}\.\d{3}\s*-->\s*\d{2}:\d{2}:\d{2}\.\d{3}/g, '') // Remove timestamps
      .replace(/\n\s*\n/g, '\n') // Remove empty lines
      .trim();
  }
};

export default InitialState;