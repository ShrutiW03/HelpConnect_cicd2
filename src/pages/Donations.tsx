import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import DonationCard from "@/components/DonationCard";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const CATEGORIES = ["All", "Clothing", "Electronics", "Education", "Food", "Services", "Other"];

const MOCK_DONATIONS = [
  {
    id: "1",
    title: "20 Warm Sweaters",
    description: "I want to donate 20 sweaters in good condition. Perfect for the winter season.",
    category: "Clothing",
    location: "Pune",
    userName: "Datta",
    createdAt: "Just now",
  },
  {
    id: "2",
    title: "Working Microwave",
    description: "I want to donate a microwave in excellent working condition.",
    category: "Electronics",
    location: "Delhi",
    userName: "Aditya",
    createdAt: "Just now",
  },
  {
    id: "3",
    title: "Teaching Services",
    description: "I am a teacher. I want to teach something in the orphanage for 1 week.",
    category: "Services",
    location: "Pune",
    userName: "Arpita",
    createdAt: "Just now",
  },
  {
    id: "4",
    title: "MCA Books Collection",
    description: "I want to donate books to needy students preparing for competitive exams.",
    category: "Education",
    location: "Mumbai",
    userName: "Shruti",
    createdAt: "2 hours ago",
  },
  {
    id: "5",
    title: "Rice and Dal Packets",
    description: "50 packets of rice and dal ready for distribution to those in need.",
    category: "Food",
    location: "Pune",
    userName: "Ravi",
    createdAt: "5 hours ago",
  },
  {
    id: "6",
    title: "Kids Clothing Bundle",
    description: "Gently used kids clothing for ages 5-10. About 30 items.",
    category: "Clothing",
    location: "Bangalore",
    userName: "Priya",
    createdAt: "1 day ago",
  },
];

const Donations = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredDonations = MOCK_DONATIONS.filter((donation) => {
    const matchesSearch = donation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donation.description.toLowerCase().includes(searchQuery.toLowerCase());
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

        {/* Donations Grid */}
        {filteredDonations.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDonations.map((donation, index) => (
              <div 
                key={donation.id} 
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <DonationCard
                  {...donation}
                  onRequest={() => handleRequest(donation.title)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-muted-foreground text-lg mb-4">No donations found</div>
            <p className="text-sm text-muted-foreground mb-6">
              Try adjusting your search or filters
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
