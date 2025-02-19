'use client'
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ResearchContribution } from "@/schemas/schema";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, Loader2, ExternalLink, BookOpen } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { ModeToggle } from "@/app/theme";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
  hover: {
    y: -5,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
};

const ResearchSkeleton = () => (
  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 pb-6">
    {[...Array(6)].map((_, index) => (
      <Card key={index} className="overflow-hidden">
        <CardHeader>
          <Skeleton className="h-8 w-3/4 mb-2" />
          <div className="flex gap-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-20" />
          </div>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-24 w-full" />
        </CardContent>
        <CardFooter>
          <Skeleton className="h-6 w-32" />
        </CardFooter>
      </Card>
    ))}
  </div>
);

export default function Research() {
  const [research, setResearch] = useState<ResearchContribution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchResearch();
  }, []);

  const fetchResearch = async () => {
    try {
      const response = await axios.get("/api/research");
      setResearch(response.data.research_contributions);
      setError(null);
    } catch (error) {
      setError(
        "Failed to fetch research contributions. Please try again later."
      );
      console.error("Error fetching research:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/50">
      <div className="absolute right-8 top-8">
        <ModeToggle />
      </div>
      <div className="container mx-auto py-8 px-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              <BookOpen className="h-8 w-8 text-primary" />
            </motion.div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Research Contributions
            </h1>
          </div>
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        <ScrollArea className="h-[calc(100vh-12rem)]">
          {loading ? (
            <ResearchSkeleton />
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 pb-6"
            >
              {research.map((item) => (
                <motion.div
                  key={item._id}
                  variants={cardVariants}
                  whileHover="hover"
                  layout
                >
                  <Card className="group relative overflow-hidden transition-all hover:shadow-lg dark:hover:shadow-primary/5">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <CardHeader>
                      <CardTitle className="flex items-start justify-between gap-4">
                        <motion.span
                          className="text-xl leading-tight"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          {item.title}
                        </motion.span>
                      </CardTitle>
                      <motion.div
                        className="flex flex-wrap gap-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Badge
                          variant="secondary"
                          className="font-medium bg-primary/10 text-primary"
                        >
                          {item.year}
                        </Badge>
                        <Badge variant="outline" className="font-medium">
                          {item.type}
                        </Badge>
                      </motion.div>
                    </CardHeader>

                    <CardContent>
                      <motion.p
                        className="text-muted-foreground leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        {item.description}
                      </motion.p>
                    </CardContent>

                    <CardFooter>
                      <motion.a
                        href={item.doi}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        <span>View Publication</span>
                        <ExternalLink className="h-4 w-4" />
                      </motion.a>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
}