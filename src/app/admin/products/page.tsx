"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Search, MoreHorizontal, Edit, Trash, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuGroup } from "@/components/ui/dropdown-menu";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AdminProductForm } from "./ProductForm";

export default function AdminProducts() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    },
  });

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
      setIsAddOpen(false);
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to add product");
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: async (updatedProduct: any) => {
      if (!editingProduct) return;
      const res = await fetch(`/api/products/${editingProduct.id || editingProduct._id}`, {
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
      toast.success("Product updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      setEditingProduct(null);
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update product");
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: async (id: string | number) => {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete product");
      }

      return res.json();
    },
    onSuccess: () => {
      toast.success("Product deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete product");
    },
  });

  const filteredProducts = products.filter((product: any) =>
    (product.product_name || product.name || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">Manage your store's inventory and products.</p>
        </div>
        <Button onClick={() => setIsAddOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" /> Add Product
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-8 bg-background"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </div>

      <div className="border rounded-lg bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">S. No.</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    <p>Loading products...</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-red-500">
                  Failed to load products. Please try again.
                </TableCell>
              </TableRow>
            ) : filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No products found.
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product: any, index: number) => (
                <TableRow key={product.id}>
                  <TableCell className="text-muted-foreground font-medium">{index + 1}</TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded bg-muted flex items-center justify-center text-xs text-muted-foreground">Img</div>
                      {product.product_name || product.name}
                    </div>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{typeof product.price === "number" ? `₹${product.price}` : product.price || "₹0"}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        product.status === "In Stock" || product.stock > 10
                          ? "default"
                          : product.status === "Low Stock" || product.stock > 0
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {product.status || (product.stock > 10 ? "In Stock" : product.stock > 0 ? "Low Stock" : "Out of Stock")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                        <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuGroup>
                          <DropdownMenuItem
                            onClick={() => setEditingProduct(product)}
                            className="gap-2 cursor-pointer"
                          >
                            <Edit className="h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              if (confirm("Are you sure you want to delete this product?")) {
                                deleteProductMutation.mutate(product.id || product._id);
                              }
                            }}
                            className="gap-2 text-red-600 focus:text-red-600 cursor-pointer"
                          >
                            <Trash className="h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add Product Popup Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-xl border bg-background p-6 shadow-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b mb-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight">Add Product</h2>
                <p className="text-sm text-muted-foreground">Create a new product entry for your store.</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => setIsAddOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

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
              error={
                addProductMutation.error instanceof Error
                  ? addProductMutation.error.message
                  : null
              }
              submitLabel="Save Product"
              onCancel={() => setIsAddOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Edit Product Popup Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-xl border bg-background p-6 shadow-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b mb-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight">Edit Product</h2>
                <p className="text-sm text-muted-foreground">Update product details</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => setEditingProduct(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <AdminProductForm
              mode="edit"
              defaultValues={{
                product_name: editingProduct.product_name || editingProduct.name || "",
                category: editingProduct.category || "",
                price: editingProduct.price != null ? String(editingProduct.price) : "",
                stock: editingProduct.stock != null ? String(editingProduct.stock) : "",
                status: editingProduct.status || "In Stock",
                image: editingProduct.image || "",
                description: editingProduct.description || "",
              }}
              onSubmit={(values) =>
                updateProductMutation.mutate({
                  ...values,
                  price: Number(values.price),
                  stock: Number(values.stock),
                })
              }
              isPending={updateProductMutation.isPending}
              error={
                updateProductMutation.error instanceof Error
                  ? updateProductMutation.error.message
                  : null
              }
              submitLabel="Update Product"
              onCancel={() => setEditingProduct(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

