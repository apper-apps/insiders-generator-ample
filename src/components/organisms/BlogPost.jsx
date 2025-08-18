import React, { useState } from "react";
import { toast } from "react-toastify";
import ContentSection from "@/components/molecules/ContentSection";
import Button from "@/components/atoms/Button";
import TextArea from "@/components/atoms/TextArea";

const BlogPost = ({ content }) => {
  const [copiedType, setCopiedType] = useState(null);

  if (!content) return null;

  const stripMarkdown = (text) => {
    return text
      .replace(/#{1,6}\s?/g, "") // Headers
      .replace(/\*\*(.*?)\*\*/g, "$1") // Bold
      .replace(/\*(.*?)\*/g, "$1") // Italic
      .replace(/\[(.*?)\]\(.*?\)/g, "$1") // Links
      .replace(/`(.*?)`/g, "$1") // Code
      .replace(/>\s?/g, "") // Blockquotes
      .replace(/^\s*[-*+]\s+/gm, "• ") // Lists
      .replace(/^\s*\d+\.\s+/gm, "") // Numbered lists
      .trim();
  };

  const convertMarkdownToHtml = (text) => {
    return text
      .replace(/#{6}\s?(.*?)$/gm, "<h6>$1</h6>")
      .replace(/#{5}\s?(.*?)$/gm, "<h5>$1</h5>")
      .replace(/#{4}\s?(.*?)$/gm, "<h4>$1</h4>")
      .replace(/#{3}\s?(.*?)$/gm, "<h3>$1</h3>")
      .replace(/#{2}\s?(.*?)$/gm, "<h2>$1</h2>")
      .replace(/#{1}\s?(.*?)$/gm, "<h1>$1</h1>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
      .replace(/`(.*?)`/g, "<code>$1</code>")
      .replace(/^\s*[-*+]\s+(.*)$/gm, "<li>$1</li>")
      .replace(/(<li>.*<\/li>)/s, "<ul>$1</ul>")
      .replace(/^\s*\d+\.\s+(.*)$/gm, "<li>$1</li>")
      .replace(/^\s*>\s?(.*)$/gm, "<blockquote>$1</blockquote>")
      .replace(/\n\n/g, "</p><p>")
      .replace(/^(.*)$/gm, "<p>$1</p>")
      .replace(/<p><\/p>/g, "")
      .trim();
  };

const handleCopyPlainText = async () => {
    try {
      const plainText = stripMarkdown(content);
      
      // Try modern Clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(plainText);
      } else {
        // Fallback for older browsers or non-secure contexts
        const textarea = document.createElement('textarea');
        textarea.value = plainText;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      
      setCopiedType("plain");
      toast.success("Plain text copied to clipboard!");
      setTimeout(() => setCopiedType(null), 2000);
    } catch (err) {
      console.error("Failed to copy plain text: ", err);
      toast.error("Failed to copy to clipboard. Please try selecting and copying manually.");
    }
  };

const handleCopyRichText = async () => {
    try {
      const htmlContent = convertMarkdownToHtml(content);
      const plainText = stripMarkdown(content);
      
      // Try modern Clipboard API with rich text support
if (navigator.clipboard && window.isSecureContext) {
        if (navigator.clipboard.write && typeof window.ClipboardItem !== 'undefined') {
          const clipboardItem = new window.ClipboardItem({
            "text/html": new Blob([htmlContent], { type: "text/html" }),
            "text/plain": new Blob([plainText], { type: "text/plain" })
          });
          await navigator.clipboard.write([clipboardItem]);
        } else {
          // Fallback to plain text if rich text not supported
          await navigator.clipboard.writeText(plainText);
        }
      } else {
        // Fallback for older browsers or non-secure contexts
        const textarea = document.createElement('textarea');
        textarea.value = plainText;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      
      setCopiedType("rich");
      toast.success("Content copied to clipboard!");
      setTimeout(() => setCopiedType(null), 2000);
    } catch (err) {
      console.error("Failed to copy rich text: ", err);
      toast.error("Failed to copy to clipboard. Please try selecting and copying manually.");
    }
  };

  return (
    <ContentSection
      title="Blog Post"
      icon="BookOpen"
    >
      <TextArea
        value={content}
        readOnly
        rows={12}
        className="font-mono text-sm bg-gray-50"
        placeholder="Generated blog post content will appear here..."
      />
      <div className="flex gap-3 pt-2">
        <Button
          variant={copiedType === "plain" ? "success" : "outline"}
          size="sm"
          icon={copiedType === "plain" ? "Check" : "Copy"}
          onClick={handleCopyPlainText}
        >
          {copiedType === "plain" ? "Copied!" : "Copy Plain Text"}
        </Button>
        <Button
          variant={copiedType === "rich" ? "success" : "primary"}
          size="sm"
          icon={copiedType === "rich" ? "Check" : "Copy"}
          onClick={handleCopyRichText}
        >
          {copiedType === "rich" ? "Copied!" : "Copy Rich Text"}
        </Button>
      </div>
    </ContentSection>
  );
};

export default BlogPost;