import React from "react";
import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";

const Loading = () => {
  return (
    <div className="space-y-6">
      {/* Header Loading */}
      <Card className="animate-pulse">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
          <div className="space-y-2 flex-1">
            <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/3"></div>
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-2/3"></div>
          </div>
        </div>
      </Card>

      {/* Content Grid Loading */}
      <div className="grid md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((item) => (
          <Card key={item} className="animate-pulse">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
                <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24"></div>
              </div>
              <div className="w-16 h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
            </div>
            <div className="space-y-3">
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-4/5"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/5"></div>
            </div>
          </Card>
        ))}
      </div>

      {/* Large Content Loading */}
      <Card className="animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
            <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-32"></div>
          </div>
          <div className="w-20 h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
        </div>
        <div className="h-48 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
      </Card>

      {/* Shimmer Animation */}
      <motion.div
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
        className="text-center py-8"
      >
        <div className="text-lg font-medium text-gray-600 mb-2">
          Generating your content...
        </div>
        <div className="text-sm text-gray-500">
          This may take a few moments while our AI analyzes your content
        </div>
      </motion.div>
    </div>
  );
};

export default Loading;