import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HelpCircle, MapPin, User, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Layout from "@/components/Layout";
import { toast } from "sonner";

const CATEGORIES = ["Clothing", "Electronics", "Education", "Food", "Services", "Other"];
const URGENCY_LEVELS = [
  { value: "low", label: "Low - Not urgent" },
  { value: "medium", label: "Medium - Needed soon" },
  { value: "high", label: "High - Urgent" },
];

const HelpRequestForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    location: "",
    name: "",
    urgency: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Help request submitted successfully!");
    navigate("/request-success");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 animate-slide-up">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-warm shadow-soft mb-4">
              <HelpCircle className="h-8 w-8 text-accent-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Request Help</h1>
            <p className="text-muted-foreground">
              Describe what you need and our community will try to help.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            {/* Request Details */}
            <div className="bg-card rounded-xl border border-border p-6 shadow-soft space-y-6">
              <h2 className="text-lg font-semibold text-foreground border-b border-border pb-3">
                Request Details
              </h2>
              
              <div className="space-y-2">
                <Label htmlFor="title">Request Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Need MCA CET Books"
                  className="h-12"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what you need in detail..."
                  className="min-h-[120px] resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="e.g., Pune, Maharashtra"
                    className="pl-10 h-12"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="Your name"
                    className="pl-10 h-12"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="urgency">Urgency Level</Label>
                <Select
                  value={formData.urgency}
                  onValueChange={(value) => setFormData({ ...formData, urgency: value })}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="How urgent is this?" />
                  </SelectTrigger>
                  <SelectContent>
                    {URGENCY_LEVELS.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Privacy Notice */}
            <div className="bg-muted/50 rounded-xl p-4 flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                Your name and location will be visible to other users. Please do not share sensitive personal information in the description field.
              </p>
            </div>

            <Button type="submit" variant="hero" size="xl" className="w-full">
              Submit Help Request
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default HelpRequestForm;
