import { z } from "zod";

interface Technology {
  name: string;
  technologies?: string[];
  description: string;
}

interface SubService extends Technology {
  name: string;
  technologies?: string[];
  description: string;
}

interface ServiceCategory {
  _id?: string;
  category: string;
  description: string;
  sub_services: SubService[];
}

interface ProductInterface {
  _id?: string;
  name: string;
  description: string;
  link: string;
}

interface ResearchContributionInterface {
  _id?: string;
  title: string;
  year: number;
  type: string;
  description: string;
  doi: string;
}

// Zod Schemas
const SubServiceSchema = z.object({
  name: z.string(),
  technologies: z.array(z.string()).optional(),
  description: z.string(),
});

const ServiceCategorySchema = z.object({
   _id: z.string(),
  category: z.string(),
  description: z.string(),
  sub_services: z.array(SubServiceSchema),
});

const ServicesSchema = z.object({
  services: z.array(ServiceCategorySchema),
});

const ProductSchema = z.object({
   _id: z.string(),
  name: z.string(),
  description: z.string(),
  link: z.string().url(),
});

const ProductsSchema = z.object({
  products: z.array(ProductSchema),
});

const ResearchContributionSchema = z.object({
  _id: z.string(),
  title: z.string(),
  year: z
    .number()
    .int()
    .min(1900)
    .max(new Date().getFullYear() + 1),
  type: z.string(),
  description: z.string(),
  doi: z.string().url(),
});

const ResearchSchema = z.object({
  research_contributions: z.array(ResearchContributionSchema),
});

// Export types
export type Service = z.infer<typeof ServiceCategorySchema>;
export type Services = z.infer<typeof ServicesSchema>;
export type ProductType = z.infer<typeof ProductSchema>;
export type Products = z.infer<typeof ProductsSchema>;
export type Research = z.infer<typeof ResearchSchema>;
export type ResearchContribution = z.infer<typeof ResearchContributionSchema>;

// Export schemas
export {
  ServiceCategorySchema,
  ServicesSchema,
  ProductSchema,
  ProductsSchema,
  ResearchContributionSchema,
  ResearchSchema,
};
