import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center min-h-[400px]"
    >
      <Card className="max-w-md mx-auto text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <ApperIcon name="AlertCircle" size={24} className="text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Content Generation Failed
        </h3>
        <p className="text-gray-600 mb-6 leading-relaxed">
          {message}
        </p>
        {onRetry && (
          <div className="flex gap-3 justify-center">
            <Button
              variant="primary"
              icon="RefreshCw"
              onClick={onRetry}
            >
              Try Again
            </Button>
            <Button
              variant="outline"
              icon="ArrowLeft"
              onClick={() => window.location.reload()}
            >
              Start Over
            </Button>
          </div>
        )}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-sm text-red-700">
              <ApperIcon name="Info" size={14} />
              <span>If the problem persists, please check your connection and try again.</span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default Error;