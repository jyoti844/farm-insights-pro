import { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import atalImage from '@/assets/atal-bihari-vajpayee.jpg';

const quotes = [
  {
    text: "The farmer is the backbone of our nation. Without agriculture, there is no civilization.",
    author: "Atal Bihari Vajpayee"
  },
  {
    text: "A prosperous agriculture is the foundation of a strong nation. Our farmers deserve our respect and support.",
    author: "Atal Bihari Vajpayee"
  },
  {
    text: "Technology should reach every village, every field, to empower our farmers with knowledge and innovation.",
    author: "Atal Bihari Vajpayee"
  },
  {
    text: "The soil of India is sacred, and those who till it are the true guardians of our motherland.",
    author: "Atal Bihari Vajpayee"
  },
  {
    text: "Agriculture is not just about farming; it's about feeding the nation and nurturing our future.",
    author: "Atal Bihari Vajpayee"
  }
];

const InspirationalQuotes = () => {
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Inspired By
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
        </div>
        
        <Card className="max-w-4xl mx-auto shadow-large border-primary/20 bg-background/80 backdrop-blur-sm">
          <CardContent className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Image Section */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-gradient-primary shadow-glow">
                    <img
                      src={atalImage}
                      alt="Atal Bihari Vajpayee"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-medium">
                    <Quote className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
              
              {/* Quote Section */}
              <div className="flex-1 text-center md:text-left">
                <div className="relative min-h-[120px] flex items-center">
                  {quotes.map((quote, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-all duration-1000 ${
                        index === currentQuote 
                          ? 'opacity-100 transform translate-y-0' 
                          : 'opacity-0 transform translate-y-4'
                      }`}
                    >
                      <blockquote className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6 italic">
                        "{quote.text}"
                      </blockquote>
                      <cite className="text-primary font-semibold text-lg">
                        — {quote.author}
                      </cite>
                    </div>
                  ))}
                </div>
                
                {/* Quote Indicators */}
                <div className="flex justify-center md:justify-start gap-2 mt-8">
                  {quotes.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentQuote 
                          ? 'bg-primary w-8' 
                          : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                      }`}
                      onClick={() => setCurrentQuote(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Decorative Elements */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-40 h-40 bg-accent/5 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default InspirationalQuotes;