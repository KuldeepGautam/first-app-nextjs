"use client";

import { useEffect, useState } from "react";
import { Package, Heart, ShoppingCart, Tag, MapPin, CreditCard, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// Mock Data
const recentOrders = [
  { id: "#12345", date: "15 Jul", status: "Delivered", amount: "₹2,499" },
  { id: "#12344", date: "10 Jul", status: "Shipped", amount: "₹1,199" },
  { id: "#12343", date: "02 Jul", status: "Processing", amount: "₹799" },
];

const wishlist = ["Nike Shoes", "iPhone 16", "JBL Speaker"];

export default function CustomerDashboard() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Fetch username from localStorage when component mounts on client side
    const storedUsername = localStorage.getItem("Username");
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      setUsername("Guest");
    }
  }, []);

  const handleAddCart = ( ) => {
    alert("Item added to cart!");
    return ;
  }

  return (
    <div className="container mx-auto py-10 px-4 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Hello, {username} 👋</h1>
        <p className="text-muted-foreground mt-2">Welcome back! Here is an overview of your account.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wishlist</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cart</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Coupons</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
        
        {/* Main Content Area */}
        <div className="md:col-span-1 lg:col-span-5 space-y-8">
          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle>📦 Recent Orders</CardTitle>
              <CardDescription>Your most recent purchases.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.date}</TableCell>
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

          {/* Recommended Products Grid */}
          <div>
            <h3 className="text-xl font-bold mb-4">🛒 Recommended Products</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <Card key={item} className="flex flex-col">
                  <div className="h-32 bg-muted rounded-t-lg"></div>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-md">Product Card {item}</CardTitle>
                    <CardDescription>₹1,999</CardDescription>
                  </CardHeader>
                  <CardFooter className="p-4 pt-2 mt-auto">
                    <Button onClick={handleAddCart} className="w-full h-8 text-xs">Add to Cart</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="md:col-span-1 lg:col-span-2 space-y-6">
          
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-between">
                Continue Shopping <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="w-full justify-between">
                Track Order <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="w-full justify-between">
                View Wishlist <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="w-full justify-between">
                Edit Profile <ChevronRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Wishlist Summary */}
          <Card>
            <CardHeader>
              <CardTitle>❤️ Wishlist</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {wishlist.map((item, i) => (
                  <li key={i} className="text-sm flex items-center justify-between">
                    <span className="flex items-center gap-2"><Heart className="h-3 w-3" /> {item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Addresses & Payments */}
          <Card>
            <CardHeader>
              <CardTitle>📍 Saved Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2"><MapPin className="h-4 w-4" /> Addresses</h4>
                <p className="text-sm text-muted-foreground">Home Address</p>
                <p className="text-sm text-muted-foreground">Office Address</p>
              </div>
              <Separator />
              <div>
                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2"><CreditCard className="h-4 w-4" /> Payment Methods</h4>
                <p className="text-sm text-muted-foreground">Visa ****2345</p>
              </div>
              <Separator />
              <div>
                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2"><Tag className="h-4 w-4" /> Available Coupons</h4>
                <div className="flex gap-2">
                  <Badge variant="outline">SAVE20</Badge>
                  <Badge variant="outline">WELCOME100</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
