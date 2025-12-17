import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Gift, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Layout from "@/components/Layout";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const CATEGORIES = ["Clothing", "Electronics", "Education", "Food", "Services", "Other"];

const DonationForm = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    location: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please sign in to submit a donation");
      navigate("/login");
      return;
    }

    if (!formData.title.trim()) {
      toast.error("Please enter a title");
      return;
    }

    if (!formData.category) {
      toast.error("Please select a category");
      return;
    }

    if (!formData.description.trim()) {
      toast.error("Please enter a description");
      return;
    }

    if (!formData.location.trim()) {
      toast.error("Please enter a location");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from("donations").insert({
        user_id: user.id,
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category,
        location: formData.location.trim(),
      });

      if (error) {
        if (error.code === "23503") {
          toast.error("User profile not found. Please try logging out and back in.");
        } else if (error.code === "42501") {
          toast.error("Permission denied. Please ensure you're logged in.");
        } else {
          toast.error("Failed to submit donation. Please try again.");
        }
        console.error("Donation error:", error);
      } else {
        toast.success("Donation submitted successfully!");
        navigate("/donation-success");
      }
    } catch (err) {
      toast.error("An unexpected error occurred. Please try again.");
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <div className="text-muted-foreground text-lg">Loading...</div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <div className="text-muted-foreground text-lg mb-4">Please sign in to offer a donation</div>
            <Button variant="hero" onClick={() => navigate("/login")}>Sign In</Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 animate-slide-up">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-hero shadow-glow mb-4">
              <Gift className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Offer a Donation</h1>
            <p className="text-muted-foreground">
              Fill out the form below to offer an item or service you'd like to donate.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            {/* Donation Details */}
            <div className="bg-card rounded-xl border border-border p-6 shadow-soft space-y-6">
              <h2 className="text-lg font-semibold text-foreground border-b border-border pb-3">
                Donation Details
              </h2>
              
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., 20 Warm Sweaters"
                  className="h-12"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  maxLength={100}
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
                  placeholder="Describe your donation in detail..."
                  className="min-h-[120px] resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  maxLength={1000}
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
                    maxLength={100}
                    required
                  />
                </div>
              </div>
            </div>

            <Button type="submit" variant="hero" size="xl" className="w-full" disabled={loading}>
              {loading ? "Submitting..." : "Submit Donation"}
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default DonationForm;
