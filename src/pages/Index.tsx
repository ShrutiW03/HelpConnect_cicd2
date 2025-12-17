import { Link } from "react-router-dom";
import { Heart, Gift, HelpCircle, Users, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import heroImage from "@/assets/hero-illustration.png";

const Index = () => {
  const features = [
    {
      icon: Gift,
      title: "Donate Items",
      description: "Share what you have - clothes, food, electronics, or services. Every contribution makes a difference.",
    },
    {
      icon: HelpCircle,
      title: "Request Help",
      description: "Post what you need and connect with generous community members ready to help.",
    },
    {
      icon: Users,
      title: "Build Community",
      description: "Join a network of compassionate individuals working together to support one another.",
    },
  ];

  const howItWorks = [
    { step: "1", title: "Sign Up", description: "Create your free account in seconds" },
    { step: "2", title: "Post or Browse", description: "Share donations or browse available help" },
    { step: "3", title: "Connect", description: "Match with helpers or seekers in your area" },
    { step: "4", title: "Make Impact", description: "Complete the exchange and spread kindness" },
  ];

  const stats = [
    { value: "1,200+", label: "Items Donated" },
    { value: "850+", label: "People Helped" },
    { value: "500+", label: "Active Members" },
    { value: "95%", label: "Success Rate" },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-secondary/30 to-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.1),transparent_50%)]" />
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide-up">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Heart className="h-4 w-4" />
                <span>Building a compassionate community</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Connect with those who
                <span className="text-primary"> care</span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-lg">
                HelpConnect bridges the gap between those willing to give and those in need. 
                Share resources, offer services, and build a stronger community together.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link to="/donate/new">
                  <Button variant="hero" size="xl">
                    <Gift className="h-5 w-5" />
                    Offer a Donation
                  </Button>
                </Link>
                <Link to="/request-help/new">
                  <Button variant="outline" size="xl">
                    <HelpCircle className="h-5 w-5" />
                    Request Help
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="relative z-10">
                <img
                  src={heroImage}
                  alt="Diverse hands coming together in support"
                  className="w-full rounded-2xl shadow-elevated"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute -top-6 -left-6 w-48 h-48 bg-accent/20 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-border bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={stat.label} 
                className="text-center animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How HelpConnect Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform makes it easy to give and receive help. Whether you have something to share or need assistance, we've got you covered.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group bg-card rounded-2xl p-8 border border-border shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-2 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-xl gradient-hero flex items-center justify-center mb-6 group-hover:shadow-glow transition-shadow">
                  <feature.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Simple Steps to Get Started
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join our community in four easy steps and start making a difference today.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {howItWorks.map((item, index) => (
              <div 
                key={item.step} 
                className="relative animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-card rounded-2xl p-6 border border-border shadow-soft h-full">
                  <div className="w-12 h-12 rounded-full gradient-warm flex items-center justify-center text-xl font-bold text-accent-foreground mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="h-6 w-6 text-muted-foreground/50" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl gradient-hero p-12 md:p-16 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,hsl(0_0%_100%/0.15),transparent_50%)]" />
            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">
                Ready to Make a Difference?
              </h2>
              <p className="text-primary-foreground/90 text-lg">
                Join thousands of community members who are already helping each other. 
                Start your journey today.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Link to="/signup">
                  <Button 
                    variant="secondary" 
                    size="xl"
                    className="bg-card text-primary hover:bg-card/90"
                  >
                    Get Started Free
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/donate">
                  <Button 
                    variant="outline" 
                    size="xl"
                    className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    Browse Donations
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
