import Banner from '../components/Banner';
import StatsSection from '../components/StatsSection';
import FeaturesSection from '../components/FeaturesSection';
import ChatbotSection from '../components/ChatbotSection';
import IndustrySolutions from '../components/IndustrySolutions';
import AchievementsSection from '../components/AchievementsSection';
import NewsSection from '../components/NewsSection';
import CustomerCases from '../components/CustomerCases';

const HomePage = () => {
  return (
    <div className="w-full" style={{ paddingTop: '100px' }}>
      <Banner />
      <StatsSection />
      <FeaturesSection />
      <IndustrySolutions />
      <CustomerCases />
      {/* —— 客户精选案例下面增加组件信任背书 "超过 60 万+ 门店选择思迅！" —— */}
      <AchievementsSection />
      <NewsSection />
      <ChatbotSection />
    </div>
  );
};

export default HomePage;
