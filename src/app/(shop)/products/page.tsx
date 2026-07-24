"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function ProductImage({ src, alt }: { src?: string; alt: string }) {
  const [imgSrc, setImgSrc] = useState<string>(() => {
    if (!src) return `https://placehold.co/400x300/f1f5f9/475569?text=${encodeURIComponent(alt)}`;
    if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("/")) return src;
    return `/${src}`;
  });

  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!src) {
      setImgSrc(`https://placehold.co/400x300/f1f5f9/475569?text=${encodeURIComponent(alt)}`);
    } else if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("/")) {
      setImgSrc(src);
    } else {
      setImgSrc(`/${src}`);
    }
    setHasError(false);
  }, [src, alt]);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      // Fallback to high-quality generated product image card if the local file path 404s
      setImgSrc(`https://placehold.co/400x300/f1f5f9/475569?text=${encodeURIComponent(alt)}`);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className="h-full w-full object-cover"
      onError={handleError}
    />
  );
}

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  console.log("Products Data : ", products);

  useEffect(() => {
    async function fetchProductData() {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        if (Array.isArray(data)) {
          setProducts(data);
        } else if (data && Array.isArray(data.data)) {
          setProducts(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProductData();
  }, []);

  const handleAddCart = (productName: string) => {
    toast.success(`${productName} added to cart!`);
  };

  if (loading) {
    return <div className="col-span-full py-8 text-center text-sm text-muted-foreground">Loading products...</div>;
  }

  if (products.length === 0) {
    return <div className="col-span-full py-8 text-center text-sm text-muted-foreground">No products available.</div>;
  }

  return (
    <>
      {products.map((product: any) => {
        const title = product.product_name || product.title || product.name || "Product";
        const price = typeof product.price === "number" ? `₹${product.price}` : product.price ? `₹${product.price}` : "₹0";

        return (
          <Card key={product.id || product._id || product.product_name} className="flex flex-col overflow-hidden">
            <div className="h-32 bg-muted rounded-t-lg flex items-center justify-center text-xs text-muted-foreground overflow-hidden">
              <ProductImage src={product.image} alt={title} />
            </div>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-md line-clamp-1">{title}</CardTitle>
              <CardDescription>{price}</CardDescription>
            </CardHeader>
            <CardFooter className="p-4 pt-2 mt-auto">
              <Button onClick={() => handleAddCart(title)} className="w-full h-8 text-xs">
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </>
  );
}
