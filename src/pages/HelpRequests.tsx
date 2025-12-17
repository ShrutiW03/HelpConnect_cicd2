import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import HelpRequestCard from "@/components/HelpRequestCard";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const CATEGORIES = ["All", "Clothing", "Electronics", "Education", "Food", "Services", "Other"];

const MOCK_REQUESTS = [
  {
    id: "1",
    title: "Need MCA CET Books",
    description: "I need books for MCA CET preparation. Unable to afford new ones.",
    category: "Education",
    location: "Pune",
    userName: "Aarya",
    urgency: "medium" as const,
    createdAt: "Just now",
  },
  {
    id: "2",
    title: "Winter Clothes for Kids",
    description: "Looking for warm winter clothes for 3 kids aged 5-10 years.",
    category: "Clothing",
    location: "Delhi",
    userName: "Meera",
    urgency: "high" as const,
    createdAt: "1 hour ago",
  },
  {
    id: "3",
    title: "Food Supplies for Family",
    description: "Need food supplies for a family of 5. Any help would be greatly appreciated.",
    category: "Food",
    location: "Mumbai",
    userName: "Ramesh",
    urgency: "high" as const,
    createdAt: "2 hours ago",
  },
  {
    id: "4",
    title: "Laptop for Online Classes",
    description: "Student needs a working laptop for attending online classes.",
    category: "Electronics",
    location: "Bangalore",
    userName: "Sneha",
    urgency: "medium" as const,
    createdAt: "5 hours ago",
  },
  {
    id: "5",
    title: "Math Tutor for Class 10",
    description: "Looking for a volunteer math tutor for class 10 board preparation.",
    category: "Services",
    location: "Pune",
    userName: "Vikram",
    urgency: "low" as const,
    createdAt: "1 day ago",
  },
  {
    id: "6",
    title: "Medical Supplies",
    description: "Need basic medical supplies and medicines for elderly parents.",
    category: "Other",
    location: "Chennai",
    userName: "Lakshmi",
    urgency: "high" as const,
    createdAt: "2 days ago",
  },
];

const HelpRequests = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredRequests = MOCK_REQUESTS.filter((request) => {
    const matchesSearch = request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.description.toLowerCase().includes(searchQuery.toLowerCase());
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

        {/* Requests Grid */}
        {filteredRequests.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRequests.map((request, index) => (
              <div 
                key={request.id} 
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <HelpRequestCard
                  {...request}
                  onOffer={() => handleOffer(request.title)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-muted-foreground text-lg mb-4">No help requests found</div>
            <p className="text-sm text-muted-foreground mb-6">
              Try adjusting your search or filters
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
