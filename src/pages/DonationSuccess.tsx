import { Link } from "react-router-dom";
import { CheckCircle, Gift, Eye, MessageSquare, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

const DonationSuccess = () => {
  const steps = [
    {
      icon: Eye,
      title: "Your donation is listed",
      description: "Your donation is now visible to those in need browsing the platform.",
    },
    {
      icon: MessageSquare,
      title: "Someone requests it",
      description: "When someone wants your donation, you'll receive a notification with their details.",
    },
    {
      icon: Gift,
      title: "Coordinate handover",
      description: "You'll arrange a convenient time and place to hand over your donation.",
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center animate-slide-up">
          {/* Success Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full gradient-hero shadow-glow mb-6">
            <CheckCircle className="h-10 w-10 text-primary-foreground" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Thank You for Your Donation!
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Your generous donation has been successfully submitted and is now listed in our available donations. 
            Someone in need will be able to request it soon.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link to="/donate">
              <Button variant="hero" size="lg">
                <Eye className="h-5 w-5" />
                View All Donations
              </Button>
            </Link>
            <Link to="/donate/new">
              <Button variant="outline" size="lg">
                <Gift className="h-5 w-5" />
                Offer Another Donation
              </Button>
            </Link>
          </div>

          {/* What Happens Next */}
          <div className="bg-card rounded-2xl border border-border p-8 shadow-soft text-left">
            <h2 className="text-xl font-semibold text-foreground mb-6 text-center">
              What happens next?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {steps.map((step, index) => (
                <div key={step.title} className="relative">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-xl gradient-warm flex items-center justify-center mb-4">
                      <step.icon className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold mb-3">
                      {index + 1}
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-12 -right-3 transform z-10">
                      <ArrowRight className="h-6 w-6 text-muted-foreground/50" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DonationSuccess;
