import { Link } from "react-router-dom";
import { CheckCircle, HelpCircle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

const RequestSuccess = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center animate-slide-up">
          {/* Success Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full gradient-warm shadow-soft mb-6">
            <CheckCircle className="h-10 w-10 text-accent-foreground" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Request Submitted Successfully!
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Your help request has been posted. You will be notified when someone responds to your request. 
            Thank you for using our platform.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/request-help">
              <Button variant="hero" size="lg">
                <HelpCircle className="h-5 w-5" />
                View All Requests
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" size="lg">
                <Home className="h-5 w-5" />
                Return to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RequestSuccess;
