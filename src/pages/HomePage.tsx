import Banner from '../components/Banner';
import FeaturesSection from '../components/FeaturesSection';
import ChatbotSection from '../components/ChatbotSection';
import IndustrySolutions from '../components/IndustrySolutions';
import AchievementsSection from '../components/AchievementsSection';
import NewsSection from '../components/NewsSection';

const HomePage = () => {
  return (
    <div className="w-full">
      <div style={{ height: '100px' }}></div>
      <Banner />
      <FeaturesSection />
      <ChatbotSection />
      <IndustrySolutions />
      <AchievementsSection />
      <NewsSection />
    </div>
  );
};

export default HomePage;
