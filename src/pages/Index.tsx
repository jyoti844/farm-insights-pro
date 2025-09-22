import Navbar from '@/components/Navbar';
import HeroSlider from '@/components/HeroSlider';
import FeatureCards from '@/components/FeatureCards';
import Feedback from '@/components/Feedback';
import ChatBot from '@/components/ChatBot';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSlider />
        <FeatureCards />
        <Feedback />
      </main>
      <ChatBot />
    </div>
  );
};

export default Index;