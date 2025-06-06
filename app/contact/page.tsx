"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Mail, 
  Phone, 
  Send,
  Linkedin,
  X,
  Instagram,
  Facebook,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const projectTypes = [
  { value: 'web-development', label: 'Web Development' },
  { value: 'mobile-app', label: 'Mobile App Development' },
  { value: 'ui-ux', label: 'UI/UX Design' },
  { value: 'data-analytics', label: 'Data Analytics' },
  { value: 'machine-learning', label: 'Machine Learning' },
  { value: 'cloud-services', label: 'Cloud Services' },
  { value: 'security', label: 'Cybersecurity Solutions' },
  { value: 'consulting', label: 'IT Consulting' },
  { value: 'other', label: 'Other Services' },
] as const;

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  projectType: z.enum(projectTypes.map(pt => pt.value) as [string, ...string[]], {
    required_error: "Please select a project type.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      projectType: "other",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you as soon as possible.",
      });
      
      form.reset();
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error sending message",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "codematesltd@gmail.com",
      href: "mailto:codematesltd@gmail.com"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 7348975886",
      href: "tel:+917348975886"
    }
  ];
  const socialLinks = [
    {
      icon: X,
      href: "https://x.com/codematesltd?t=cjXqpZcgoW9BV3Q7TNQUGg&s=09",
      label: "Twitter"
    },
    {
      icon: Facebook,
      href: "https://facebook.com",
      label: "Facebook"
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/codematesltd/profilecard/?igsh=MTNvb25iYWtiYzZjZA==",
      label: "Instagram"
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/company/codematesltd/",
      label: "LinkedIn"
    }
  ];

  return (
    <main className="flex-1 w-full min-h-screen">
      <section id="contact" ref={sectionRef} className="relative py-12 md:py-24 w-full">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />

        <div className="container relative z-10 mx-auto px-4 md:px-6 max-w-7xl">
          {/* Back button */}
          <Link href="/">
            <Button variant="ghost" className="group mb-6 md:mb-8">
              <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Button>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
                  <p className="text-lg text-muted-foreground">
                    Have a project in mind? We'd love to hear about it.
                  </p>
                </div>

                <Card className="p-6 md:p-8">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="Your email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="projectType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select the type of service you need" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {projectTypes.map((type) => (
                                  <SelectItem
                                    key={type.value}
                                    value={type.value}
                                    className="cursor-pointer"
                                  >
                                    {type.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Choose the service that best matches your project needs
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Tell us about your project..." 
                                className="min-h-[120px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full"
                        size="lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              />
                            </svg>
                            Sending...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center">
                            Send Message
                            <Send className="ml-2 h-4 w-4" />
                          </span>
                        )}
                      </Button>
                    </form>
                  </Form>
                </Card>
              </motion.div>
            </div>

            {/* Contact Information */}
            <Card className="p-6 md:p-8">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-3">Contact Information</h2>
                  <p className="text-muted-foreground">
                    Ready to start your project? Contact us using any of the following methods.
                  </p>
                </div>

                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={index}
                      href={info.href}
                      className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-grow">
                        <div className="font-medium">{info.label}</div>
                        <div className="text-muted-foreground text-sm">{info.value}</div>
                      </div>
                    </motion.a>
                  ))}
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    {socialLinks.map((link, index) => (
                      <motion.a
                        key={index}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.label}
                        className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 transition-all duration-300 hover:-translate-y-1"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      >
                        <link.icon className="h-5 w-5" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
