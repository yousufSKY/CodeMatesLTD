export const siteConfig = {
  name: 'Codemates LTD',
  url: 'https://codemates.in',
  ogImage: 'https://codemates.in/og.jpg',
  description: 'Delivering scalable and cutting-edge digital solutions that help businesses thrive in the digital age.',
  links: {
    twitter: 'https://x.com/codematesltd',
    github: 'https://github.com/codematesltd',
    linkedin: 'https://www.linkedin.com/company/codematesltd/',
  },
  keywords: [
    'Web Development',
    'Software Development',
    'Mobile App Development',
    'UI/UX Design',
    'Digital Solutions',
    'IT Consulting',
    'Tech Services',
    'Software Company India',
    'Kalaburagi',
    'Karnataka',
  ],
  authors: [
    {
      name: 'Codemates LTD',
      url: 'https://codemates.in',
    },
  ],
  creator: 'Codemates LTD',
  metadataBase: new URL('https://codemates.in'),
}

export type PageMetadata = {
  title: string
  description: string
  path: string
  image?: string
}

export const pagesMetadata: Record<string, PageMetadata> = {
  home: {
    title: 'Codemates LTD - Leading Software Development Company in Karnataka',
    description: 'Transform your business with our cutting-edge software development services. We specialize in web development, mobile apps, and digital solutions that drive growth.',
    path: '/',
  },
  about: {
    title: 'About Us | Codemates LTD - Our Journey and Mission',
    description: 'Learn about Codemates LTD\'s mission to deliver innovative digital solutions. Meet our team of expert developers and designers committed to your success.',
    path: '/about',
  },
  services: {
    title: 'Our Services | Codemates LTD - Custom Software Solutions',
    description: 'Explore our comprehensive range of software development services including web development, mobile apps, UI/UX design, and IT consulting.',
    path: '/services',
  },
  projects: {
    title: 'Our Projects | Codemates LTD - Portfolio and Case Studies',
    description: 'View our portfolio of successful projects and case studies. See how we\'ve helped businesses achieve their digital transformation goals.',
    path: '/projects',
  },
  contact: {
    title: 'Contact Us | Codemates LTD - Get in Touch',
    description: 'Contact Codemates LTD for your software development needs. Get a free consultation and quote for your project.',
    path: '/contact',
  },
}
