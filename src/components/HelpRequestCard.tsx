import { MapPin, Clock, User, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HelpRequestCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  userName: string;
  urgency: "low" | "medium" | "high";
  createdAt: string;
  onOffer?: () => void;
}

const HelpRequestCard = ({
  title,
  description,
  category,
  location,
  userName,
  urgency,
  createdAt,
  onOffer,
}: HelpRequestCardProps) => {
  const getCategoryColor = (cat: string) => {
    const colors: Record<string, string> = {
      Clothing: "bg-blue-100 text-blue-700",
      Electronics: "bg-purple-100 text-purple-700",
      Education: "bg-green-100 text-green-700",
      Food: "bg-orange-100 text-orange-700",
      Services: "bg-pink-100 text-pink-700",
      Other: "bg-gray-100 text-gray-700",
    };
    return colors[cat] || colors.Other;
  };

  const getUrgencyStyle = (urg: string) => {
    const styles: Record<string, { bg: string; text: string; label: string }> = {
      low: { bg: "bg-green-100", text: "text-green-700", label: "Low Priority" },
      medium: { bg: "bg-yellow-100", text: "text-yellow-700", label: "Medium Priority" },
      high: { bg: "bg-red-100", text: "text-red-700", label: "Urgent" },
    };
    return styles[urg] || styles.low;
  };

  const urgencyStyle = getUrgencyStyle(urgency);

  return (
    <div className="group bg-card rounded-xl border border-border p-5 shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
          {title}
        </h3>
        <Badge className={`${getCategoryColor(category)} border-0 text-xs font-medium`}>
          {category}
        </Badge>
      </div>

      {urgency === "high" && (
        <div className={`flex items-center gap-2 ${urgencyStyle.bg} ${urgencyStyle.text} rounded-lg px-3 py-1.5 text-xs font-medium mb-3`}>
          <AlertTriangle className="h-3 w-3" />
          {urgencyStyle.label}
        </div>
      )}
      
      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
        {description}
      </p>
      
      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-4">
        <span className="flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          {location}
        </span>
        <span className="flex items-center gap-1">
          <User className="h-3 w-3" />
          {userName}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {createdAt}
        </span>
      </div>
      
      <Button 
        variant="hero" 
        className="w-full"
        onClick={onOffer}
      >
        Offer to Help
      </Button>
    </div>
  );
};

export default HelpRequestCard;
