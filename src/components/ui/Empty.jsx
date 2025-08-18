import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No Content Generated Yet",
  description = "Upload your video transcript to get started with AI-powered content generation.",
  actionText = "Generate Content",
  onAction,
  icon = "FileText"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center justify-center min-h-[400px]"
    >
      <Card className="max-w-md mx-auto text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <ApperIcon name={icon} size={32} className="text-white" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          {title}
        </h3>
        <p className="text-gray-600 mb-6 leading-relaxed">
          {description}
        </p>
        {onAction && (
          <Button
            variant="primary"
            size="lg"
            icon="Sparkles"
            onClick={onAction}
            className="w-full sm:w-auto"
          >
            {actionText}
          </Button>
        )}
        <div className="mt-8 grid grid-cols-2 gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <ApperIcon name="Zap" size={14} className="text-yellow-500" />
            <span>Fast Generation</span>
          </div>
          <div className="flex items-center gap-2">
            <ApperIcon name="Shield" size={14} className="text-green-500" />
            <span>SEO Optimized</span>
          </div>
          <div className="flex items-center gap-2">
            <ApperIcon name="Globe" size={14} className="text-blue-500" />
            <span>Multi-Platform</span>
          </div>
          <div className="flex items-center gap-2">
            <ApperIcon name="Target" size={14} className="text-purple-500" />
            <span>Voice Analysis</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default Empty;