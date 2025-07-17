import { Metadata } from 'next';
import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";
import ProjectsSection from "@/components/projects-section";
import AboutSection from "@/components/about-section";
import TeamSection from "@/components/team-section";
import ContactSection from "@/components/contact-section";
import FeedbackSection from "@/components/feedback-section";

import { pagesMetadata } from '@/lib/metadata';

export const metadata: Metadata = {
  title: pagesMetadata.home.title,
  description: pagesMetadata.home.description,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: pagesMetadata.home.title,
    description: pagesMetadata.home.description,
    url: '/',
    type: 'website',
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