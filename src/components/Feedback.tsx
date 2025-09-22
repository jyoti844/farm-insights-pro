import { useState } from 'react';
import { MessageSquare, Star, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const { toast } = useToast();

  const handleSubmit = () => {
    if (rating === 0 || !feedback.trim()) {
      toast({
        title: "Please provide complete feedback",
        description: "Both rating and comments are required.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would submit to a backend
    toast({
      title: "Thank you for your feedback!",
      description: "Your feedback helps us improve our farming platform.",
    });
    
    setRating(0);
    setFeedback('');
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container max-w-2xl">
        <Card className="shadow-large">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl flex items-center justify-center gap-2">
              <MessageSquare className="h-6 w-6 text-primary" />
              Your Feedback Matters
            </CardTitle>
            <CardDescription className="text-base">
              Help us improve our platform to better serve the farming community
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Rating Section */}
            <div>
              <label className="text-sm font-medium mb-3 block">How would you rate your experience?</label>
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="transition-smooth hover:scale-110"
                  >
                    <Star
                      className={`h-8 w-8 ${
                        star <= rating
                          ? 'text-accent fill-accent'
                          : 'text-muted-foreground hover:text-accent'
                      }`}
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="text-center mt-2 text-sm text-muted-foreground">
                  {rating === 5 ? 'Excellent!' : rating === 4 ? 'Very Good!' : rating === 3 ? 'Good!' : rating === 2 ? 'Fair' : 'Needs Improvement'}
                </p>
              )}
            </div>

            {/* Feedback Text */}
            <div>
              <label className="text-sm font-medium mb-2 block">Share your thoughts</label>
              <Textarea
                placeholder="Tell us about your experience, suggestions for improvement, or any issues you faced..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={5}
                className="resize-none"
              />
            </div>

            {/* Quick Feedback Options */}
            <div>
              <label className="text-sm font-medium mb-3 block">What did you like most? (Optional)</label>
              <div className="flex flex-wrap gap-2">
                {[
                  'Easy to use interface',
                  'Accurate weather data',
                  'Helpful soil information',
                  'Market price updates',
                  'Pest management tips',
                  'Mobile-friendly design'
                ].map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      if (!feedback.includes(option)) {
                        setFeedback(prev => prev ? `${prev}\n• ${option}` : `• ${option}`);
                      }
                    }}
                    className="px-3 py-1 text-xs border border-border rounded-full hover:bg-muted transition-smooth"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <Button 
              onClick={handleSubmit}
              className="w-full bg-gradient-primary hover:opacity-90"
              size="lg"
            >
              <Send className="h-4 w-4 mr-2" />
              Submit Feedback
            </Button>

            {/* Contact Info */}
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Need immediate assistance? Contact our farmer support team at{' '}
                <a href="tel:+91-1800-123-4567" className="text-primary hover:underline font-medium">
                  1800-123-4567
                </a>
                {' '}or email{' '}
                <a href="mailto:support@farmtechpro.com" className="text-primary hover:underline font-medium">
                  support@farmtechpro.com
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Feedback;