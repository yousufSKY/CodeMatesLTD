import Image from 'next/image';
import { CaseStudy } from '@/types/case-study';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Card } from './ui/card';

interface CaseStudyPageProps {
  caseStudy: CaseStudy;
}

export function CaseStudyPage({ caseStudy }: CaseStudyPageProps) {
  return (
    <article className="max-w-4xl mx-auto py-12 px-4">
      {/* Hero Section */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">{caseStudy.title}</h1>
        <div className="flex flex-wrap gap-4 mb-8">
          <Badge variant="outline">{caseStudy.industry}</Badge>
          <Badge variant="outline">{caseStudy.duration}</Badge>
        </div>
        <div className="relative aspect-video w-full rounded-lg overflow-hidden mb-8">
          <Image
            src={caseStudy.thumbnailUrl}
            alt={caseStudy.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Overview */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4">Overview</h2>
        <p className="text-lg text-muted-foreground">{caseStudy.overview}</p>
      </section>

      {/* Problem & Solution */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <section>
          <h2 className="text-3xl font-bold mb-4">The Problem</h2>
          <p className="text-muted-foreground">{caseStudy.problem}</p>
        </section>
        <section>
          <h2 className="text-3xl font-bold mb-4">Our Solution</h2>
          <p className="text-muted-foreground">{caseStudy.solution}</p>
        </section>
      </div>

      {/* Tech Stack */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4">Technology Stack</h2>
        <div className="flex flex-wrap gap-2">
          {caseStudy.techStack.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
      </section>

      {/* Metrics */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Key Metrics</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudy.metrics.map((metric) => (
            <Card key={metric.label} className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">
                {metric.value}
              </div>
              <div className="font-medium mb-2">{metric.label}</div>
              {metric.description && (
                <p className="text-sm text-muted-foreground">{metric.description}</p>
              )}
            </Card>
          ))}
        </div>
      </section>

      {/* Client Quote */}
      {caseStudy.clientQuote && (
        <section className="mb-12">
          <Card className="p-8 bg-muted">
            <blockquote className="text-xl italic mb-4">
              "{caseStudy.clientQuote.text}"
            </blockquote>
            <footer>
              <div className="font-medium">{caseStudy.clientQuote.author}</div>
              <div className="text-sm text-muted-foreground">
                {caseStudy.clientQuote.position}
              </div>
            </footer>
          </Card>
        </section>
      )}

      {/* Project Gallery */}
      <section>
        <h2 className="text-3xl font-bold mb-6">Project Gallery</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {caseStudy.images.map((image) => (
            <figure key={image.url} className="space-y-2">
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              {image.caption && (
                <figcaption className="text-sm text-muted-foreground text-center">
                  {image.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </section>
    </article>
  );
}
