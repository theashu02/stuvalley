'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ServiceCategorySchema } from "@/schemas/schema";
import { Pencil, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { Service } from "@/schemas/schema";

interface EditServiceModalProps {
  service: Service;
  onServiceUpdated: () => void;
}

export default function EditServiceModal({ service, onServiceUpdated }: EditServiceModalProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  
  const form = useForm({
    resolver: zodResolver(ServiceCategorySchema),
    defaultValues: {
      _id: service._id,
      category: service.category,
      description: service.description,
      sub_services: service.sub_services,
    },
  });

  const onSubmit = async (data: any) => {
    try {
      await axios.put(`/api/services/${service._id}`, data);
      toast({
        description: "Service updated successfully",
      });
      setOpen(false);
      onServiceUpdated();
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to update service",
      });
      console.error("Error updating service:", error);
    }
  };

  const addSubService = () => {
    const currentSubServices = form.getValues("sub_services");
    form.setValue("sub_services", [
      ...currentSubServices,
      { name: "", technologies: [], description: "" },
    ]);
  };

  const removeSubService = (index: number) => {
    const currentSubServices = form.getValues("sub_services");
    form.setValue(
      "sub_services",
      currentSubServices.filter((_, i) => i !== index)
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="group-hover:opacity-100 transition-opacity"
        >
          <Pencil className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Service</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="Service category" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Service description"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Sub Services</h4>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addSubService}
                >
                  Add Sub Service
                </Button>
              </div>

              {form.watch("sub_services").map((_, index) => (
                <div key={index} className="space-y-4 p-4 border rounded-lg relative">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2"
                    onClick={() => removeSubService(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>

                  <FormField
                    control={form.control}
                    name={`sub_services.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Sub service name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`sub_services.${index}.technologies`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Technologies (comma-separated)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="React, Node.js, MongoDB"
                            value={field.value?.join(", ") || ""}
                            onChange={(e) => {
                              const technologies = e.target.value
                                .split(",")
                                .map((tech) => tech.trim())
                                .filter(Boolean);
                              field.onChange(technologies);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`sub_services.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Sub service description"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <Button type="submit">Update Service</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
} 