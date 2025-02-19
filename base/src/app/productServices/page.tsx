"use client";
import { useState, useEffect } from "react";
import { Service } from "@/schemas/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, Loader2, Boxes } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Package } from "lucide-react";
import { ModeToggle } from "@/app/theme";

const MotionCard = motion(Card);

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get("/api/services");
      setTimeout(() => {
        setServices(response.data.services);
        setError(null);
        setLoading(false);
      }, 2000);
      toast({
        description: "Services loaded successfully.",
      });
    } catch (error) {
      setError("Failed to fetch services. Please try again later.");
      console.error("Error fetching services:", error);
      toast({
        description: "Failed to fetch services. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

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
      },
    },
  };

  if (loading) {
    return (
      <div className="container mx-auto p-8 bg-gray-900">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-3">
            <Package className="h-7 w-7 text-primary" />
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Services
            </h2>
          </div>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {[...Array(6)].map((_, i) => (
            <motion.div key={i} variants={cardVariants}>
              <Card className="overflow-hidden backdrop-blur-sm bg-background/50">
                <CardHeader className="space-y-4">
                  <Skeleton className="h-8 w-1/2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </CardHeader>
                <Separator className="bg-primary/10" />
                <CardContent className="pt-6 space-y-6">
                  <Skeleton className="h-6 w-32" />
                  <div className="space-y-4">
                    {[...Array(3)].map((_, index) => (
                      <div
                        key={index}
                        className="space-y-3 rounded-lg bg-muted/50 p-4"
                      >
                        <Skeleton className="h-5 w-1/3" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                        <div className="flex gap-2 mt-2">
                          <Skeleton className="h-5 w-16" />
                          <Skeleton className="h-5 w-16" />
                          <Skeleton className="h-5 w-16" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-12">
      <div className="absolute right-8 top-8">
        <ModeToggle />
      </div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-12"
      >
        <Boxes className="h-8 w-8 text-primary" />
        <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Services
        </h1>
      </motion.div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-8"
          >
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        {services.map((service) => (
          <motion.div key={service._id} variants={cardVariants}>
            <MotionCard
              className="group relative overflow-hidden backdrop-blur-sm bg-background/50 border-primary/10 hover:border-primary/30"
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
            >
              <CardHeader className="pb-4">
                <CardTitle className="flex items-start justify-between gap-4">
                  <span className="text-2xl font-bold bg-gradient-to-r from-primary/80 to-primary/60 bg-clip-text text-transparent">
                    {service.category}
                  </span>
                </CardTitle>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </CardHeader>
              <Separator className="bg-primary/10" />
              <CardContent className="pt-6">
                <h4 className="text-lg font-semibold mb-4">Sub Services</h4>
                <ScrollArea className="h-[280px] pr-4">
                  <div className="space-y-4">
                    {service.sub_services.map((subService, index) => (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        key={index}
                        className="space-y-3 rounded-lg bg-muted/50 p-4 transition-all hover:bg-muted/80 hover:shadow-md"
                      >
                        <h5 className="font-semibold text-primary/80">
                          {subService.name}
                        </h5>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {subService.description}
                        </p>
                        {subService.technologies && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {subService.technologies.map((tech) => (
                              <Badge
                                key={tech}
                                variant="secondary"
                                className="text-xs bg-primary/10 hover:bg-primary/20 transition-colors"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </MotionCard>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}