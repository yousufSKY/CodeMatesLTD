"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BlogCard } from "@/components/blog-card";
import { blogPosts } from "@/lib/blog-data";
import type { BlogPost } from "@/types/blog";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Error handling for blog data
  if (!Array.isArray(blogPosts)) {
    console.error("Blog posts data is not in the expected format");
    return (
      <div className="container mx-auto px-4 py-24 mt-16 text-center">
        <p className="text-lg text-muted-foreground">Unable to load blog posts. Please try again later.</p>
      </div>
    );
  }

  // Memoize unique tags from all blog posts
  const allTags = useMemo(() => 
    Array.from(new Set(blogPosts.flatMap((post: BlogPost) => post.tags))).sort(),
    [blogPosts]
  ) as string[];

  // Memoize filtered posts for better performance
  const filteredPosts = useMemo(() => blogPosts.filter((post: BlogPost) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  }), [searchQuery, selectedTag]);

  // Handle loading state
  useEffect(() => {
    // Simulate loading time for blog posts
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mx-auto px-4 py-24 mt-16">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Blog</h1>
        <p className="text-lg text-muted-foreground">
          Stay updated with our latest insights, tutorials, and tech discussions.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-4xl mx-auto mb-12 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" aria-hidden="true" />
          <Input
            type="search"
            placeholder="Search articles..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search articles"
          />
        </div>
        <div 
          className="flex flex-wrap gap-2" 
          role="radiogroup" 
          aria-label="Filter posts by tag"
        >
          <Badge
            variant={!selectedTag ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setSelectedTag(null)}
            role="radio"
            aria-checked={!selectedTag}
            tabIndex={!selectedTag ? 0 : -1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedTag(null);
              }
            }}
          >
            All
          </Badge>
          {allTags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTag === tag ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedTag(tag)}
              role="radio"
              aria-checked={selectedTag === tag}
              tabIndex={selectedTag === tag ? 0 : -1}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedTag(tag);
                }
              }}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {isLoading ? (
          // Loading skeleton placeholders
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-muted rounded-lg h-48 mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </div>
            </div>
          ))
        ) : filteredPosts.length > 0 ? (
          filteredPosts.map((post: BlogPost) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <BlogCard post={post} />
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-lg text-muted-foreground">
              No posts found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
