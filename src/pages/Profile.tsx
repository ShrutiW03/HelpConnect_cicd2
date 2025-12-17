import { useState, useEffect } from "react";
import { Edit, Trash2, Plus, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/Layout";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { formatDistanceToNow } from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Donation {
  id: string;
  title: string;
  description: string | null;
  category: string;
  created_at: string;
}

interface HelpRequest {
  id: string;
  title: string;
  description: string | null;
  category: string;
  urgency: string;
  created_at: string;
}

const Profile = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [requests, setRequests] = useState<HelpRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
      return;
    }
    if (user) {
      fetchUserData();
    }
  }, [user, authLoading, navigate]);

  const fetchUserData = async () => {
    if (!user) return;

    setError(null);
    
    try {
      const [donationsRes, requestsRes] = await Promise.all([
        supabase
          .from("donations")
          .select("id, title, description, category, created_at")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false }),
        supabase
          .from("help_requests")
          .select("id, title, description, category, urgency, created_at")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false }),
      ]);

      if (donationsRes.error) {
        console.error("Donations fetch error:", donationsRes.error);
        throw new Error("Failed to load donations");
      }
      
      if (requestsRes.error) {
        console.error("Requests fetch error:", requestsRes.error);
        throw new Error("Failed to load help requests");
      }

      setDonations(donationsRes.data || []);
      setRequests(requestsRes.data || []);
    } catch (err) {
      setError("Failed to load your data. Please try refreshing the page.");
      console.error("Profile data fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

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

  const handleDeleteDonation = async (id: string) => {
    try {
      const { error } = await supabase.from("donations").delete().eq("id", id);
      if (error) {
        if (error.code === "42501") {
          toast.error("You don't have permission to delete this donation");
        } else {
          toast.error("Failed to delete donation");
        }
        console.error("Delete donation error:", error);
      } else {
        setDonations(donations.filter((d) => d.id !== id));
        toast.success("Donation deleted successfully");
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
      console.error("Unexpected delete error:", err);
    }
  };

  const handleDeleteRequest = async (id: string) => {
    try {
      const { error } = await supabase.from("help_requests").delete().eq("id", id);
      if (error) {
        if (error.code === "42501") {
          toast.error("You don't have permission to delete this request");
        } else {
          toast.error("Failed to delete request");
        }
        console.error("Delete request error:", error);
      } else {
        setRequests(requests.filter((r) => r.id !== id));
        toast.success("Request deleted successfully");
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
      console.error("Unexpected delete error:", err);
    }
  };

  if (authLoading || loading) {
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

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <div className="text-muted-foreground text-lg mb-4">{error}</div>
            <Button variant="hero" onClick={() => fetchUserData()}>Try Again</Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 animate-slide-up">
            <h1 className="text-3xl font-bold text-foreground mb-2">My Profile</h1>
            <p className="text-muted-foreground">
              Manage your donations and help requests
            </p>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="donations" className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="donations">My Donations ({donations.length})</TabsTrigger>
              <TabsTrigger value="requests">My Help Requests ({requests.length})</TabsTrigger>
            </TabsList>

            {/* Donations Tab */}
            <TabsContent value="donations">
              <div className="bg-card rounded-xl border border-border p-6 shadow-soft">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-foreground">Your Donations</h2>
                  <Link to="/donate/new">
                    <Button variant="hero" size="sm">
                      <Plus className="h-4 w-4" />
                      Add New Donation
                    </Button>
                  </Link>
                </div>

                {donations.length > 0 ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {donations.map((donation) => (
                      <div
                        key={donation.id}
                        className="bg-secondary/30 rounded-lg p-4 border border-border"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-medium text-foreground line-clamp-1">
                            {donation.title}
                          </h3>
                          <Badge className={`${getCategoryColor(donation.category)} border-0 text-xs`}>
                            {donation.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {donation.description}
                        </p>
                        <p className="text-xs text-muted-foreground mb-4">
                          Posted: {formatDistanceToNow(new Date(donation.created_at), { addSuffix: true })}
                        </p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Edit className="h-3 w-3" />
                            Edit
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-3 w-3" />
                                Delete
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Donation</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{donation.title}"? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteDonation(donation.id)}>
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">You haven't posted any donations yet</p>
                    <Link to="/donate/new">
                      <Button variant="hero">Post Your First Donation</Button>
                    </Link>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Requests Tab */}
            <TabsContent value="requests">
              <div className="bg-card rounded-xl border border-border p-6 shadow-soft">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-foreground">Your Help Requests</h2>
                  <Link to="/request-help/new">
                    <Button variant="hero" size="sm">
                      <Plus className="h-4 w-4" />
                      New Request
                    </Button>
                  </Link>
                </div>

                {requests.length > 0 ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {requests.map((request) => (
                      <div
                        key={request.id}
                        className="bg-secondary/30 rounded-lg p-4 border border-border"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-medium text-foreground line-clamp-1">
                            {request.title}
                          </h3>
                          <Badge className={`${getCategoryColor(request.category)} border-0 text-xs`}>
                            {request.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {request.description}
                        </p>
                        <p className="text-xs text-muted-foreground mb-4">
                          Posted: {formatDistanceToNow(new Date(request.created_at), { addSuffix: true })}
                        </p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Edit className="h-3 w-3" />
                            Edit
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-3 w-3" />
                                Delete
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Request</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{request.title}"? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteRequest(request.id)}>
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">You haven't posted any help requests yet</p>
                    <Link to="/request-help/new">
                      <Button variant="hero">Post Your First Request</Button>
                    </Link>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
