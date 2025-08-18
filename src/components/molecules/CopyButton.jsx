import React, { useState } from "react";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const CopyButton = ({ 
  text, 
  label = "Copy", 
  variant = "outline",
  size = "sm",
  onCopy,
  className
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success(`${label} copied to clipboard!`);
      
      if (onCopy) {
        onCopy();
      }

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      toast.error("Failed to copy to clipboard");
    }
  };

  return (
    <Button
      variant={copied ? "success" : variant}
      size={size}
      icon={copied ? "Check" : "Copy"}
      onClick={handleCopy}
      className={className}
    >
      {copied ? "Copied!" : label}
    </Button>
  );
};

export default CopyButton;