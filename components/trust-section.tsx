import Image from 'next/image';
import { cn } from '@/lib/utils';

const stats = [
  { label: 'Projects Delivered', value: '20+' },
  { label: 'Industries Served', value: '10+' },
  { label: 'Remote Team', value: '100%' },
];

const clients = [
  { name: 'Client 1', logo: '/images/clients/client1.png' },
  { name: 'Client 2', logo: '/images/clients/client2.png' },
  { name: 'Client 3', logo: '/images/clients/client3.png' },
  { name: 'Client 4', logo: '/images/clients/client4.png' },
];

export function TrustSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Trusted by Industry Leaders
        </h2>
        
        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Client Logos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
          {clients.map((client) => (
            <div
              key={client.name}
              className="relative w-32 h-20 group transition-opacity duration-300"
            >
              <Image
                src={client.logo}
                alt={client.name}
                fill
                className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
