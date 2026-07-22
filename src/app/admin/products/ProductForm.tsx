"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ProductFormValues = {
  product_name: string;
  category: string;
  price: string;
  stock: string;
  status: string;
  image: string;
  description: string;
};

interface AdminProductFormProps {
  mode: "create" | "edit";
  defaultValues?: Partial<ProductFormValues>;
  onSubmit: (values: ProductFormValues) => void | Promise<void>;
  isPending?: boolean;
  error?: string | null;
  submitLabel?: string;
  onCancel?: () => void;
}

const emptyValues: ProductFormValues = {
  product_name: "",
  category: "",
  price: "",
  stock: "",
  status: "In Stock",
  image: "",
  description: "",
};

export function AdminProductForm({
  mode,
  defaultValues,
  onSubmit,
  isPending = false,
  error,
  submitLabel,
  onCancel,
}: AdminProductFormProps) {
  const [formData, setFormData] = useState<ProductFormValues>({
    ...emptyValues,
    ...defaultValues,
  });

  useEffect(() => {
    setFormData({
      ...emptyValues,
      ...defaultValues,
    });
  }, [defaultValues]);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit({
      ...formData,
      price: String(formData.price),
      stock: String(formData.stock),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="product_name" className="text-sm font-medium">
          Product Name
        </label>
        <Input
          id="product_name"
          name="product_name"
          value={formData.product_name}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="category" className="text-sm font-medium">
          Category
        </label>
        <Input
          id="category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="price" className="text-sm font-medium">
            Price (₹)
          </label>
          <Input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="stock" className="text-sm font-medium">
            Stock
          </label>
          <Input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="status" className="text-sm font-medium">
          Status
        </label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="In Stock">In Stock</option>
          <option value="Low Stock">Low Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="image" className="text-sm font-medium">
          Image URL
        </label>
        <Input id="image" name="image" value={formData.image} onChange={handleInputChange} />
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="flex min-h-[96px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      {error ? <div className="text-sm font-medium text-red-500">{error}</div> : null}

      <div className="flex flex-col gap-3 pt-2 sm:flex-row">
        {onCancel ? (
          <Button type="button" variant="outline" onClick={onCancel} className="sm:w-auto">
            Cancel
          </Button>
        ) : null}
        <Button type="submit" disabled={isPending} className="sm:flex-1">
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
            </>
          ) : (
            submitLabel || (mode === "edit" ? "Update Product" : "Save Product")
          )}
        </Button>
      </div>
    </form>
  );
}
