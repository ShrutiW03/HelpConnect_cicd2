import { useState, useEffect } from "react";
import { Search, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import HelpRequestCard from "@/components/HelpRequestCard";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";

const CATEGORIES = ["All", "Clothing", "Electronics", "Education", "Food", "Services", "Other"];

interface HelpRequest {
  id: string;
  title: string;
  description: string | null;
  category: string;
  location: string | null;
  urgency: string;
  created_at: string;
  user_id: string;
}

interface Profile {
  id: string;
  full_name: string | null;
}

const HelpRequests = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [requests, setRequests] = useState<(HelpRequest & { userName: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setError(null);
    setLoading(true);

    try {
      // Fetch help requests
      const { data: requestsData, error: requestsError } = await supabase
        .from("help_requests")
        .select("*")
        .eq("status", "open")
        .order("created_at", { ascending: false });

      if (requestsError) {
        console.error("Requests fetch error:", requestsError);
        throw new Error("Failed to load help requests");
      }

      // Fetch profiles for the user names
      const userIds = [...new Set(requestsData?.map(r => r.user_id) || [])];
      
      let profileMap = new Map<string, string>();
      
      if (userIds.length > 0) {
        const { data: profilesData, error: profilesError } = await supabase
          .from("profiles")
          .select("id, full_name")
          .in("id", userIds);

        if (profilesError) {
          console.error("Profiles fetch error:", profilesError);
        } else {
          profilesData?.forEach((p: Profile) => {
            profileMap.set(p.id, p.full_name || "Anonymous");
          });
        }
      }

      const requestsWithNames = (requestsData || []).map(r => ({
        ...r,
        userName: profileMap.get(r.user_id) || "Anonymous"
      }));

      setRequests(requestsWithNames);
    } catch (err) {
      setError("Failed to load help requests. Please try again.");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredRequests = requests.filter((request) => {
    const matchesSearch = request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (request.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    const matchesCategory = selectedCategory === "All" || request.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOffer = (title: string) => {
    toast.success(`Thank you for offering to help with "${title}"! The requester will be notified.`);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Help Requests</h1>
            <p className="text-muted-foreground">See who needs help and make a difference today</p>
          </div>
          <Link to="/request-help/new">
            <Button variant="hero">Submit a Request</Button>
          </Link>
        </div>

        {/* Search and Filter */}
        <div className="bg-card rounded-xl border border-border p-4 mb-8 shadow-soft">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search help requests..."
                className="pl-10 h-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="transition-all"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="text-center py-16">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <div className="text-muted-foreground text-lg mb-4">{error}</div>
            <Button variant="hero" onClick={fetchRequests}>Try Again</Button>
          </div>
        )}

        {/* Loading State */}
        {loading && !error && (
          <div className="text-center py-16">
            <div className="text-muted-foreground text-lg">Loading help requests...</div>
          </div>
        )}

        {/* Requests Grid */}
        {!loading && !error && filteredRequests.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRequests.map((request, index) => (
              <div 
                key={request.id} 
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <HelpRequestCard
                  id={request.id}
                  title={request.title}
                  description={request.description || ""}
                  category={request.category}
                  location={request.location || "Not specified"}
                  userName={request.userName}
                  urgency={request.urgency as "low" | "medium" | "high"}
                  createdAt={formatDistanceToNow(new Date(request.created_at), { addSuffix: true })}
                  onOffer={() => handleOffer(request.title)}
                />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredRequests.length === 0 && (
          <div className="text-center py-16">
            <div className="text-muted-foreground text-lg mb-4">No help requests found</div>
            <p className="text-sm text-muted-foreground mb-6">
              {requests.length > 0 ? "Try adjusting your search or filters" : "Be the first to submit a request!"}
            </p>
            <Link to="/request-help/new">
              <Button variant="hero">Submit a Request</Button>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default HelpRequests;
