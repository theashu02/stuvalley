'use client'
import { useState, useEffect } from "react";
import { ResearchContribution } from "@/schemas/schema";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AlertCircle,
  Loader2,
  Trash2,
  ExternalLink,
  BookOpen,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import AddResearchModal from "@/components/forms/AddResearchModal";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import EditResearchModal from "@/components/forms/EditResearchModal";

export default function App() {
  const [research, setResearch] = useState<ResearchContribution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchResearch();
  }, []);

  const fetchResearch = async () => {
    try {
      const response = await axios.get("/api/research");
      setResearch(response.data.research_contributions);
      setError(null);
    } catch (error) {
      setError("Failed to fetch research contributions. Please try again later.");
      console.error("Error fetching research:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteResearch = async (id: string) => {
    try {
      await axios.delete(`/api/research/${id}`);
      toast({
        description: "Research deleted successfully",
      });
      fetchResearch();
    } catch (error) {
      setError("Failed to delete research contribution. Please try again.");
      console.error("Error deleting research:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="text-lg font-medium">
            Loading research contributions...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <BookOpen className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Research Contributions
          </h1>
        </div>
        <AddResearchModal onResearchAdded={fetchResearch} />
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <ScrollArea className="h-[calc(100vh-12rem)]">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 pb-6">
          {research.map((item) => (
            <Card
              key={item._id}
              className="group relative overflow-hidden transition-all hover:shadow-lg"
            >
              <CardHeader>
                <CardTitle className="flex items-start justify-between gap-4">
                  <span className="text-xl leading-tight">{item.title}</span>
                  <div className="flex gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div>
                            <EditResearchModal 
                              research={item} 
                              onResearchUpdated={fetchResearch} 
                            />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Edit research</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                            onClick={() => deleteResearch(item._id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Delete research</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </CardTitle>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="font-medium">
                    {item.year}
                  </Badge>
                  <Badge variant="outline" className="font-medium">
                    {item.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
              <CardFooter>
                <a
                  href={item.doi}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                >
                  <span>View Publication</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}