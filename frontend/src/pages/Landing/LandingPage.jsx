import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import Hero from "./sections/Hero";
import Companies from "./sections/Companies";
import Features from "./sections/Features";
import HowItWorks from "./sections/HowItWorks";
import AISection from "./sections/AISection";
import Stats from "./sections/Stats";
import CTA from "./sections/CTA";

const LandingPage = () => {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Companies />
        <Features />
        <HowItWorks />
        <AISection />
        <Stats />
        <CTA />
      </main>

      <Footer />
    </>
  );
};

export default LandingPage;