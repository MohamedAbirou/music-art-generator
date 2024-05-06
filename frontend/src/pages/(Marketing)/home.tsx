import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { Testimonials } from "@/components/testimonials";

const Home = () => {
  // const { isLoggedIn } = useAppContext();
  return (
    <>
      <div className="max-w-7xl mx-auto">
        <Hero />
        <HowItWorks />
      </div>
      <Testimonials />
    </>
  );
};

export default Home;
