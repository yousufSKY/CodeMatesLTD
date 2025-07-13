import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Codemates LTD',
  description: 'Get in touch with Codemates LTD. We\'re here to help you with your digital transformation journey.',
  openGraph: {
    title: 'Contact Codemates LTD',
    description: 'Get in touch with Codemates LTD. We\'re here to help you with your digital transformation journey.',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
