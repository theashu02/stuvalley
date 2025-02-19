"use client";
import { useState, useEffect } from "react";
import { ProductType } from "@/schemas/schema";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ExternalLink, Trash2, Package } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import AddProductModal from "@/components/forms/AddProductModal";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import EditProductModal from "@/components/forms/EditProductModal";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/products");
      setTimeout(() => {
        setProducts(response.data.products);
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id: string) => {
    try {
      await axios.delete(`/api/products/${id}`);
      toast({
        description: "Deleted Successfully",
      });
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Package className="h-6 w-6" />
            <h2 className="text-3xl font-bold">Products</h2>
          </div>
          <AddProductModal onProductAdded={fetchProducts} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="container mx-auto p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Package className="h-6 w-6" />
            <h2 className="text-3xl font-bold">Products</h2>
          </div>
          <AddProductModal onProductAdded={fetchProducts} />
        </div>
        <Alert>
          <AlertDescription>
            No products found. Add some products to get started.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Package className="h-6 w-6" />
          <h2 className="text-3xl font-bold">Products</h2>
        </div>
        <AddProductModal onProductAdded={fetchProducts} />
      </div>
      <ScrollArea className="h-[calc(100vh-12rem)] custom-scrollbar">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card
              key={product._id}
              className="group hover:shadow-lg transition-all duration-300"
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{product.name}</span>
                  <div className="flex gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div>
                            <EditProductModal 
                              product={product} 
                              onProductUpdated={fetchProducts} 
                            />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Edit product</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="destructive"
                            size="icon"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => deleteProduct(product._id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Delete product</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {product.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {product.description}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between gap-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.open(product.link, "_blank")}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Visit Website
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
