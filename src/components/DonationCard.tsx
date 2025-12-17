import { MapPin, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface DonationCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  userName: string;
  createdAt: string;
  onRequest?: () => void;
}

const DonationCard = ({
  title,
  description,
  category,
  location,
  userName,
  createdAt,
  onRequest,
}: DonationCardProps) => {
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
        variant="warm" 
        className="w-full"
        onClick={onRequest}
      >
        Request This Item
      </Button>
    </div>
  );
};

export default DonationCard;
