import { Metadata } from 'next';
import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";
import ProjectsSection from "@/components/projects-section";
import AboutSection from "@/components/about-section";
import TeamSection from "@/components/team-section";
import ContactSection from "@/components/contact-section";
import FeedbackSection from "@/components/feedback-section";

export const metadata: Metadata = {
  title: 'Codemates LTD | Innovative Digital Solutions',
  description: 'Transform your business with cutting-edge web development, data analysis, machine learning, and UI/UX design solutions from Codemates LTD.',
  openGraph: {
    title: 'Codemates LTD | Innovative Digital Solutions',
    description: 'Transform your business with cutting-edge web development, data analysis, machine learning, and UI/UX design solutions.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Codemates LTD - Digital Solutions Provider',
      },
    ],
  },
};

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