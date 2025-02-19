"use client";

// import { useState, useEffect } from "react";
// import { ProductType } from "@/schemas/schema";
// import { Button } from "@/components/ui/button";

// export default function Products() {
//   const [products, setProducts] = useState<ProductType[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const response = await fetch("/api/products");
//       const data = await response.json();
//       setProducts(data.products);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       setLoading(false);
//     }
//   };

//   const deleteProduct = async (id: string) => {
//     try {
//       await fetch(`/api/products/${id}`, {
//         method: "DELETE",
//       });
//       fetchProducts();
//     } catch (error) {
//       console.error("Error deleting product:", error);
//     }
//   };

//   if (loading) return <div>Loading products...</div>;

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Products</h2>
//       <div className="grid gap-4">
//         {products.map((product) => (
//           <div key={product._id} className="border p-4 rounded-lg">
//             <h3 className="text-xl font-semibold">{product.name}</h3>
//             <p className="text-gray-600">{product.description}</p>
//             <a
//               href={product.link}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-500 hover:underline block mt-2"
//             >
//               Visit Website
//             </a>
//             <Button
//               variant="destructive"
//               className="mt-4"
//               onClick={() => deleteProduct(product._id)}
//             >
//               Delete
//             </Button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
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

export default function page() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-8">
        <div className="flex items-center gap-2 mb-8">
          <Package className="h-6 w-6" />
          <h2 className="text-3xl font-bold">Products</h2>
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
        <div className="flex items-center gap-2 mb-8">
          <Package className="h-6 w-6" />
          <h2 className="text-3xl font-bold">Products</h2>
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
      <div className="flex items-center gap-2 mb-8">
        <Package className="h-6 w-6" />
        <h2 className="text-3xl font-bold">Products</h2>
      </div>
      <ScrollArea className="h-[calc(100vh-12rem)]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card
              key={product._id}
              className="group hover:shadow-lg transition-all duration-300"
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{product.name}</span>
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
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => deleteProduct(product._id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}