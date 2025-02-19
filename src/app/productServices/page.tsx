'use client'
import { useState, useEffect } from "react";
import { Service } from "@/schemas/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, Loader2, Trash2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import axios from "axios";
import AddServiceModal from "@/components/forms/AddServiceModal";
import { useToast } from "@/hooks/use-toast";

export default function page() {
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
      setServices(response.data.services);
      setError(null);
    } catch (error) {
      setError("Failed to fetch services. Please try again later.");
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };
  const deleteService = async (id: string) => {
    try {
      await axios.delete(`/api/services/${id}`);
      fetchServices();
    } catch (error) {
      setError("Failed to delete service. Please try again.");
      console.error("Error deleting service:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="text-lg font-medium">Loading services...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Services
        </h1>
        <AddServiceModal onServiceAdded={fetchServices} />
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Card
            key={service._id}
            className="group relative overflow-hidden transition-all hover:shadow-lg"
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-xl">{service.category}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => deleteService(service._id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </CardTitle>
              <p className="text-muted-foreground">{service.description}</p>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <h4 className="font-medium mb-4">Sub Services</h4>
              <ScrollArea className="h-[280px] pr-4">
                <div className="space-y-6">
                  {service.sub_services.map((subService, index) => (
                    <div
                      key={index}
                      className="space-y-2 rounded-lg bg-muted/50 p-4 transition-colors hover:bg-muted"
                    >
                      <h5 className="font-medium">{subService.name}</h5>
                      <p className="text-sm text-muted-foreground">
                        {subService.description}
                      </p>
                      {subService.technologies && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {subService.technologies.map((tech) => (
                            <Badge
                              key={tech}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}