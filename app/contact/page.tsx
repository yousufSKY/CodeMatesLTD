import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Contact Us | Codemates LTD",
  description: "Get in touch with us for all your digital needs. We deliver scalable and cutting-edge solutions that help businesses thrive.",
};

const ContactPageContent = dynamic(
  () => import("@/components/contact-page-content"),
  {
    loading: () => (
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="flex-1 animate-pulse space-y-4">
              <div className="h-8 bg-muted rounded w-64" />
              <div className="h-4 bg-muted rounded w-96" />
              <div className="space-y-4 mt-8">
                <div className="h-12 bg-muted rounded" />
                <div className="h-12 bg-muted rounded" />
                <div className="h-32 bg-muted rounded" />
              </div>
            </div>
            <div className="lg:w-96">
              <div className="bg-muted/50 p-8 rounded-2xl animate-pulse space-y-4">
                <div className="h-6 bg-muted rounded w-32" />
                <div className="space-y-4">
                  <div className="h-4 bg-muted rounded w-full" />
                  <div className="h-4 bg-muted rounded w-full" />
                  <div className="h-4 bg-muted rounded w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  }
);

export default function Page() {
  return <ContactPageContent />;
}
