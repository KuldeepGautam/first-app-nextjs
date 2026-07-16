"use client";

import { 
  IndianRupee, 
  ShoppingCart, 
  Users, 
  Package, 
  TrendingUp, 
  Plus, 
  FolderTree, 
  Tag, 
  Settings,
  ChevronRight
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const recentOrders = [
  { id: "#12345", customer: "Rahul", status: "Delivered", amount: "₹2500" },
  { id: "#12346", customer: "Aman", status: "Pending", amount: "₹1900" },
  { id: "#12347", customer: "Deepak", status: "Shipped", amount: "₹6500" },
];

const lowStock = [
  { product: "Keyboard", stock: 4 },
  { product: "Mouse", stock: 2 },
  { product: "Laptop Bag", stock: 5 },
];

const recentCustomers = ["Rahul", "Ankit", "Neha", "Pooja"];
const topSelling = ["Nike Shoes", "iPhone 16", "Boat Headphones", "Samsung TV"];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Overview of your store's performance.</p>
      </div>

      {/* Main Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹12,54,300</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,245</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">987</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">315</div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Statistics */}
      <h2 className="text-xl font-bold mt-8 mb-4">Today's Statistics</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-primary text-primary-foreground">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹25,600</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">43</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-amber-600">Pending Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">8</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-red-600">Cancelled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">2</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
        
        {/* Main Content Area */}
        <div className="md:col-span-1 lg:col-span-5 space-y-8">
          
          {/* Chart Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] w-full bg-muted flex items-center justify-center rounded-md border border-dashed">
                <div className="flex flex-col items-center text-muted-foreground">
                  <TrendingUp className="h-8 w-8 mb-2" />
                  <span>Sales Chart (Line / Bar) Placeholder</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={order.status === "Delivered" ? "default" : "secondary"}
                          className={order.status === "Delivered" ? "bg-green-600 hover:bg-green-600" : ""}
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">{order.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
        </div>

        {/* Sidebar Widgets */}
        <div className="md:col-span-1 lg:col-span-2 space-y-6">

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="flex flex-col items-center justify-center h-20 gap-2">
                <Plus className="h-5 w-5" />
                <span className="text-xs">Add Product</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center justify-center h-20 gap-2">
                <Package className="h-5 w-5" />
                <span className="text-xs">Manage Orders</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center justify-center h-20 gap-2">
                <Users className="h-5 w-5" />
                <span className="text-xs">Customers</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center justify-center h-20 gap-2">
                <FolderTree className="h-5 w-5" />
                <span className="text-xs">Categories</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center justify-center h-20 gap-2">
                <Tag className="h-5 w-5" />
                <span className="text-xs">Coupons</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center justify-center h-20 gap-2">
                <Settings className="h-5 w-5" />
                <span className="text-xs">Settings</span>
              </Button>
            </CardContent>
          </Card>

          {/* Low Stock Products */}
          <Card>
            <CardHeader>
              <CardTitle className="text-red-600 flex items-center gap-2">
                Low Stock Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {lowStock.map((item, i) => (
                  <li key={i} className="text-sm flex items-center justify-between">
                    <span>{item.product}</span>
                    <Badge variant="destructive" className="rounded-full">{item.stock}</Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Top Selling Products */}
          <Card>
            <CardHeader>
              <CardTitle>Top Selling</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {topSelling.map((item, i) => (
                  <li key={i} className="text-sm flex items-center gap-3">
                    <span className="flex items-center justify-center h-6 w-6 bg-muted rounded-full text-xs font-bold text-muted-foreground">
                      {i + 1}
                    </span>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Recent Customers */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {recentCustomers.map((name, i) => (
                  <li key={i} className="text-sm flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-xs">
                      {name.charAt(0)}
                    </div>
                    <span>{name}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}