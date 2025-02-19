// 'use client'
// import { useState, useEffect } from "react";
// import { Service } from "@/schemas/schema";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { AlertCircle, Loader2, Trash2 } from "lucide-react";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import axios from "axios";
// import AddServiceModal from "@/components/forms/AddServiceModal";
// import { useToast } from "@/hooks/use-toast";
// import EditServiceModal from "@/components/forms/EditServiceModal";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";

// export default function page() {
//   const [services, setServices] = useState<Service[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { toast } = useToast();

//   useEffect(() => {
//     fetchServices();
//   }, []);

//   const fetchServices = async () => {
//     try {
//       const response = await axios.get("/api/services");
//       setServices(response.data.services);
//       setError(null);
//     } catch (error) {
//       setError("Failed to fetch services. Please try again later.");
//       console.error("Error fetching services:", error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   const deleteService = async (id: string) => {
//     try {
//       await axios.delete(`/api/services/${id}`);
//       fetchServices();
//     } catch (error) {
//       setError("Failed to delete service. Please try again.");
//       console.error("Error deleting service:", error);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex h-screen items-center justify-center">
//         <div className="flex items-center gap-2">
//           <Loader2 className="h-6 w-6 animate-spin" />
//           <span className="text-lg font-medium">Loading services...</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto py-8 px-4">
//       <div className="flex items-center justify-between mb-8">
//         <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
//           Services
//         </h1>
//         <AddServiceModal onServiceAdded={fetchServices} />
//       </div>

//       {error && (
//         <Alert variant="destructive" className="mb-6">
//           <AlertCircle className="h-4 w-4" />
//           <AlertTitle>Error</AlertTitle>
//           <AlertDescription>{error}</AlertDescription>
//         </Alert>
//       )}

//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {services.map((service) => (
//           <Card
//             key={service._id}
//             className="group relative overflow-hidden transition-all hover:shadow-lg"
//           >
//             <CardHeader>
//               <CardTitle className="flex items-start justify-between gap-4">
//                 <span className="text-xl">{service.category}</span>
//                 <div className="flex gap-2">
//                   <TooltipProvider>
//                     <Tooltip>
//                       <TooltipTrigger asChild>
//                         <div>
//                           <EditServiceModal
//                             service={service}
//                             onServiceUpdated={fetchServices}
//                           />
//                         </div>
//                       </TooltipTrigger>
//                       <TooltipContent>
//                         <p>Edit service</p>
//                       </TooltipContent>
//                     </Tooltip>
//                   </TooltipProvider>

//                   <TooltipProvider>
//                     <Tooltip>
//                       <TooltipTrigger asChild>
//                         <Button
//                           variant="destructive"
//                           size="icon"
//                           className="group-hover:opacity-100 transition-opacity"
//                           onClick={() =>
//                             service._id && deleteService(service._id)
//                           }
//                         >
//                           <Trash2 className="h-4 w-4 hover:text-destructive" />
//                         </Button>
//                       </TooltipTrigger>
//                       <TooltipContent>
//                         <p>Delete service</p>
//                       </TooltipContent>
//                     </Tooltip>
//                   </TooltipProvider>
//                 </div>
//               </CardTitle>
//               <p className="text-muted-foreground">{service.description}</p>
//             </CardHeader>
//             <Separator />
//             <CardContent className="pt-6">
//               <h4 className="font-medium mb-4">Sub Services</h4>
//               <ScrollArea className="h-[280px] pr-4">
//                 <div className="space-y-6">
//                   {service.sub_services.map((subService, index) => (
//                     <div
//                       key={index}
//                       className="space-y-2 rounded-lg bg-muted/50 p-4 transition-colors hover:bg-muted"
//                     >
//                       <h5 className="font-medium">{subService.name}</h5>
//                       <p className="text-sm text-muted-foreground">
//                         {subService.description}
//                       </p>
//                       {subService.technologies && (
//                         <div className="flex flex-wrap gap-2 mt-2">
//                           {subService.technologies.map((tech) => (
//                             <Badge
//                               key={tech}
//                               variant="secondary"
//                               className="text-xs"
//                             >
//                               {tech}
//                             </Badge>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </ScrollArea>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }
"use client";
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
import EditServiceModal from "@/components/forms/EditServiceModal";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Wrench } from "lucide-react";
import { ModeToggle } from "../theme";

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
      
      setTimeout(() => {
        setServices(response.data.services);
        setLoading(false);
      }, 1000);
      toast({
        description: "Services fetched successfully.",
      });
      setError(null);
    } catch (error) {
      setError("Failed to fetch services. Please try again later.");
      toast({
        variant: "destructive",
        description: "Failed to fetch services. Please try again later.",
      });
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteService = async (id: string) => {
    try {
      await axios.delete(`/api/services/${id}`);
      toast({
        description: "Service deleted successfully.",
      });
      fetchServices();
    } catch (error) {
      setError("Failed to delete service. Please try again.");
      toast({
        variant: "destructive",
        description: "Failed to delete service. Please try again.",
      });
      console.error("Error deleting service:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center animate-fadeIn">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="text-lg font-medium">Loading services...</span>
          
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-12 animate-fadeIn">
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        .animate-slideIn {
          animation: slideIn 0.5s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
        @keyframes floatAnimation {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        .animate-float {
          animation: floatAnimation 3s ease-in-out infinite;
        }
      `}</style>

      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 animate-slideInUp gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-3 mb-4 sm:mb-0">
            <Wrench className="h-8 w-8 text-primary animate-float mr-3" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Services
            </h1>
            <ModeToggle />
          </div>
        </div>
        <AddServiceModal onServiceAdded={fetchServices} />
      </div>
      {error && (
        <Alert variant="destructive" className="mb-6 animate-slideIn">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <Card
            key={service._id}
            className="group relative overflow-hidden transition-all hover:shadow-lg animate-scaleIn"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader>
              <CardTitle className="flex items-start justify-between gap-4">
                <span className="text-xl">{service.category}</span>
                <div className="flex gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="transform transition-transform hover:scale-105">
                          <EditServiceModal
                            service={service}
                            onServiceUpdated={fetchServices}
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Edit service</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="destructive"
                          size="icon"
                          className="group-hover:opacity-100 transition-all duration-300 transform hover:scale-105"
                          onClick={() =>
                            service._id && deleteService(service._id)
                          }
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Delete service</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
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
                      className="space-y-2 rounded-lg bg-muted/50 p-4 transition-all duration-300 hover:bg-muted hover:translate-x-1"
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
                              className="text-xs transform transition-transform hover:scale-105"
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
