import { useState, useEffect } from "react";
import { Search, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import DonationCard from "@/components/DonationCard";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";

const CATEGORIES = ["All", "Clothing", "Electronics", "Education", "Food", "Services", "Other"];

interface Donation {
  id: string;
  title: string;
  description: string | null;
  category: string;
  location: string | null;
  created_at: string;
  user_id: string;
}

interface Profile {
  id: string;
  full_name: string | null;
}

const Donations = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [donations, setDonations] = useState<(Donation & { userName: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    setError(null);
    setLoading(true);

    try {
      // Fetch donations
      const { data: donationsData, error: donationsError } = await supabase
        .from("donations")
        .select("*")
        .eq("status", "available")
        .order("created_at", { ascending: false });

      if (donationsError) {
        console.error("Donations fetch error:", donationsError);
        throw new Error("Failed to load donations");
      }

      // Fetch profiles for the user names
      const userIds = [...new Set(donationsData?.map(d => d.user_id) || [])];
      
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

      const donationsWithNames = (donationsData || []).map(d => ({
        ...d,
        userName: profileMap.get(d.user_id) || "Anonymous"
      }));

      setDonations(donationsWithNames);
    } catch (err) {
      setError("Failed to load donations. Please try again.");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredDonations = donations.filter((donation) => {
    const matchesSearch = donation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (donation.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    const matchesCategory = selectedCategory === "All" || donation.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleRequest = (title: string) => {
    toast.success(`Request sent for "${title}"! The donor will contact you soon.`);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Available Donations</h1>
            <p className="text-muted-foreground">Browse items and services offered by our generous community</p>
          </div>
          <Link to="/donate/new">
            <Button variant="hero">Offer a Donation</Button>
          </Link>
        </div>

        {/* Search and Filter */}
        <div className="bg-card rounded-xl border border-border p-4 mb-8 shadow-soft">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search donations..."
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
            <Button variant="hero" onClick={fetchDonations}>Try Again</Button>
          </div>
        )}

        {/* Loading State */}
        {loading && !error && (
          <div className="text-center py-16">
            <div className="text-muted-foreground text-lg">Loading donations...</div>
          </div>
        )}

        {/* Donations Grid */}
        {!loading && !error && filteredDonations.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDonations.map((donation, index) => (
              <div 
                key={donation.id} 
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <DonationCard
                  id={donation.id}
                  title={donation.title}
                  description={donation.description || ""}
                  category={donation.category}
                  location={donation.location || "Not specified"}
                  userName={donation.userName}
                  createdAt={formatDistanceToNow(new Date(donation.created_at), { addSuffix: true })}
                  onRequest={() => handleRequest(donation.title)}
                />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredDonations.length === 0 && (
          <div className="text-center py-16">
            <div className="text-muted-foreground text-lg mb-4">No donations found</div>
            <p className="text-sm text-muted-foreground mb-6">
              {donations.length > 0 ? "Try adjusting your search or filters" : "Be the first to offer a donation!"}
            </p>
            <Link to="/donate/new">
              <Button variant="hero">Be the First to Donate</Button>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Donations;
