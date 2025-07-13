import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { BlogPost } from '@/types/blog';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="h-full block">
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
        <div className="relative aspect-video">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            loading="lazy"
          />
        </div>
        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="font-medium">{post.author.name}</div>
              <div className="text-sm text-muted-foreground">{post.author.role}</div>
            </div>
          </div>
          <h3 className="text-xl font-bold mb-2">{post.title}</h3>
          <p className="text-muted-foreground mb-4 flex-1 line-clamp-3">{post.summary}</p>
          <div className="flex items-center justify-between mt-auto">
            <div className="flex gap-2">
              {post.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="text-sm text-muted-foreground">
              {format(new Date(post.publishedAt), 'MMM d, yyyy')}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
