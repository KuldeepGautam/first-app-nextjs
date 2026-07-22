"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { AdminProductForm } from "../ProductForm";

export default function NewProductPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const addProductMutation = useMutation({
    mutationFn: async (newProduct: any) => {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to add product");
      }

      return res.json();
    },
    onSuccess: () => {
      toast.success("Product created successfully!");
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      router.push("/admin/products");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to add product");
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/products" className="rounded-md p-2 hover:bg-muted">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add Product</h1>
          <p className="text-muted-foreground">Create a new product entry for your store.</p>
        </div>
      </div>

      <div className="rounded-lg border bg-background p-6">
        <AdminProductForm
          mode="create"
          onSubmit={(values) =>
            addProductMutation.mutate({
              ...values,
              price: Number(values.price),
              stock: Number(values.stock),
            })
          }
          isPending={addProductMutation.isPending}
          error={addProductMutation.error instanceof Error ? addProductMutation.error.message : null}
          submitLabel="Save Product"
        />
      </div>
    </div>
  );
}
