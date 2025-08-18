import React from "react";
import { cn } from "@/utils/cn";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import CopyButton from "@/components/molecules/CopyButton";

const ContentSection = ({ 
  title,
  icon,
  children,
  copyText,
  copyLabel = "Copy",
  className,
  headerClassName,
  contentClassName
}) => {
  return (
    <Card className={cn("space-y-4", className)}>
      <div className={cn("flex items-center justify-between", headerClassName)}>
        <div className="flex items-center gap-3">
          {icon && (
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
              <ApperIcon name={icon} size={18} />
            </div>
          )}
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        {copyText && (
          <CopyButton
            text={copyText}
            label={copyLabel}
            variant="outline"
            size="sm"
          />
        )}
      </div>
      <div className={cn("space-y-3", contentClassName)}>
        {children}
      </div>
    </Card>
  );
};

export default ContentSection;