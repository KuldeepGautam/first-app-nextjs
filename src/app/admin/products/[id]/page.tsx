"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { AdminProductForm } from "../ProductForm";

interface ProductEditPageProps {
  params: Promise<{ id: string }> | { id: string };
}

export default function EditProductPage({ params }: ProductEditPageProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const resolvedParams =
    typeof params === "object" && params !== null && "id" in params
      ? (params as { id: string })
      : use(params as Promise<{ id: string }>);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-product", resolvedParams.id],
    queryFn: async () => {
      const res = await fetch(`/api/products/${resolvedParams.id}`);
      if (!res.ok) {
        throw new Error("Failed to fetch product");
      }
      return res.json();
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: async (updatedProduct: any) => {
      const res = await fetch(`/api/products/${resolvedParams.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update product");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      router.push("/admin/products");
    },
  });

  const product = data?.data || data;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/products" className="rounded-md p-2 hover:bg-muted">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Product</h1>
          <p className="text-muted-foreground">Update the selected product information.</p>
        </div>
      </div>

      <div className="rounded-lg border bg-background p-6">
        {isLoading ? (
          <div className="flex items-center justify-center gap-2 py-10 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading product...
          </div>
        ) : isError ? (
          <div className="text-sm font-medium text-red-500">Unable to load this product.</div>
        ) : (
          <AdminProductForm
            mode="edit"
            defaultValues={{
              product_name: product?.product_name || "",
              category: product?.category || "",
              price: product?.price != null ? String(product.price) : "",
              stock: product?.stock != null ? String(product.stock) : "",
              status: product?.status || "In Stock",
              image: product?.image || "",
              description: product?.description || "",
            }}
            onSubmit={(values) =>
              updateProductMutation.mutate({
                ...values,
                price: Number(values.price),
                stock: Number(values.stock),
              })
            }
            isPending={updateProductMutation.isPending}
            error={updateProductMutation.error instanceof Error ? updateProductMutation.error.message : null}
            submitLabel="Update Product"
            onCancel={() => router.push("/admin/products")}
          />
        )}
      </div>
    </div>
  );
}
