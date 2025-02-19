'use client';

import { useState, useEffect } from 'react';
import { Service } from '@/schemas/schema';
import { Button } from './ui/button';

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services');
      const data = await response.json();
      setServices(data.services);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching services:', error);
      setLoading(false);
    }
  };

  const deleteService = async (id: string) => {
    try {
      await fetch(`/api/services/${id}`, {
        method: 'DELETE',
      });
      fetchServices();
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  if (loading) return <div>Loading services...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Services</h2>
      <div className="grid gap-4">
        {services.map((service) => (
          <div key={service._id} className="border p-4 rounded-lg">
            <h3 className="text-xl font-semibold">{service.category}</h3>
            <p className="text-gray-600">{service.description}</p>
            <div className="mt-2">
              <h4 className="font-medium">Sub Services:</h4>
              {service.sub_services.map((subService, index) => (
                <div key={index} className="ml-4 mt-2">
                  <h5 className="font-medium">{subService.name}</h5>
                  <p className="text-sm text-gray-600">{subService.description}</p>
                  {subService.technologies && (
                    <div className="flex gap-2 mt-1">
                      {subService.technologies.map((tech) => (
                        <span key={tech} className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <Button
              variant="destructive"
              className="mt-4"
              onClick={() => deleteService(service._id)}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
} 