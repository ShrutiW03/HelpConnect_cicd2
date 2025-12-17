import { useState } from "react";
import { Edit, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const MOCK_USER_DONATIONS = [
  {
    id: "1",
    title: "MCA Books",
    description: "I want to donate books to needy students",
    category: "Education",
    createdAt: "Just now",
  },
  {
    id: "2",
    title: "20 Sweaters",
    description: "I want to donate 20 sweaters",
    category: "Clothing",
    createdAt: "Just now",
  },
  {
    id: "3",
    title: "Microwave",
    description: "I want to donate a microwave",
    category: "Electronics",
    createdAt: "Just now",
  },
];

const MOCK_USER_REQUESTS = [
  {
    id: "1",
    title: "Need Winter Blankets",
    description: "Looking for warm blankets for the upcoming winter",
    category: "Clothing",
    urgency: "medium",
    createdAt: "2 hours ago",
  },
];

const Profile = () => {
  const [donations, setDonations] = useState(MOCK_USER_DONATIONS);
  const [requests, setRequests] = useState(MOCK_USER_REQUESTS);

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

  const handleDeleteDonation = (id: string) => {
    setDonations(donations.filter((d) => d.id !== id));
    toast.success("Donation deleted successfully");
  };

  const handleDeleteRequest = (id: string) => {
    setRequests(requests.filter((r) => r.id !== id));
    toast.success("Request deleted successfully");
  };

  return (
    <Layout isLoggedIn={true} userName="Regular User">
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
              <TabsTrigger value="donations">My Donations</TabsTrigger>
              <TabsTrigger value="requests">My Help Requests</TabsTrigger>
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
                          Posted: {donation.createdAt}
                        </p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Edit className="h-3 w-3" />
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDeleteDonation(donation.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                            Delete
                          </Button>
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
                          Posted: {request.createdAt}
                        </p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Edit className="h-3 w-3" />
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDeleteRequest(request.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                            Delete
                          </Button>
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
