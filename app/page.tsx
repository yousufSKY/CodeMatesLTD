import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";
import ProjectsSection from "@/components/projects-section";
import AboutSection from "@/components/about-section";
import TeamSection from "@/components/team-section";
import ContactSection from "@/components/contact-section";
import FeedbackSection from "@/components/feedback-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <ProjectsSection />
      <AboutSection />
      <TeamSection />
      <FeedbackSection />
      <ContactSection />
    </>
  );
}