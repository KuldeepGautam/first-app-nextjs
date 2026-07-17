"use client";

import { useState } from "react";
import { Star, Truck, ShieldCheck, ArrowLeft, Minus, Plus, ShoppingCart, Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function ProductDetails() {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("m");
  const [selectedColor, setSelectedColor] = useState("black");

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    if (quantity < 10) setQuantity(quantity + 1);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Breadcrumbs */}
      <div className="mb-6 flex items-center text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" /> Back to Shop
        </Link>
        <span className="mx-2">/</span>
        <Link href="/categories" className="hover:text-primary transition-colors">Electronics</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground font-medium">Premium Wireless Headphones</span>
      </div>

      <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
        {/* Left Column: Image Gallery */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-square bg-muted rounded-2xl overflow-hidden flex items-center justify-center relative">
            <span className="text-muted-foreground">Product Image Placeholder</span>
            <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">Best Seller</Badge>
          </div>
          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={`aspect-square bg-muted rounded-xl flex items-center justify-center cursor-pointer border-2 transition-all ${i === 1 ? 'border-primary' : 'border-transparent hover:border-primary/50'}`}>
                <span className="text-xs text-muted-foreground">Thumb {i}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Product Info */}
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Premium Wireless Headphones</h1>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center text-amber-500">
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 text-muted-foreground" />
              <span className="ml-2 text-sm text-muted-foreground">(128 reviews)</span>
            </div>
            <Badge variant="outline" className="text-green-600 bg-green-50 border-green-200">In Stock</Badge>
          </div>

          <div className="text-3xl font-bold mb-6">₹1,999 <span className="text-lg text-muted-foreground line-through font-normal ml-2">₹2,999</span></div>

          <p className="text-muted-foreground mb-8">
            Experience pristine audio quality with our premium wireless headphones. Features active noise cancellation, 40-hour battery life, and ultra-comfortable memory foam ear cushions for all-day listening.
          </p>

          <Separator className="mb-6" />

          {/* Color Selection */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">Color</h3>
            <RadioGroup defaultValue={selectedColor} onValueChange={setSelectedColor} className="flex gap-3">
              <div>
                <RadioGroupItem value="black" id="color-black" className="peer sr-only" />
                <Label htmlFor="color-black" className="w-8 h-8 rounded-full bg-slate-900 border-2 border-transparent peer-data-[state=checked]:border-primary peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-background cursor-pointer block"></Label>
              </div>
              <div>
                <RadioGroupItem value="white" id="color-white" className="peer sr-only" />
                <Label htmlFor="color-white" className="w-8 h-8 rounded-full bg-slate-100 border-2 border-slate-200 peer-data-[state=checked]:border-primary peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-background cursor-pointer block"></Label>
              </div>
              <div>
                <RadioGroupItem value="blue" id="color-blue" className="peer sr-only" />
                <Label htmlFor="color-blue" className="w-8 h-8 rounded-full bg-blue-600 border-2 border-transparent peer-data-[state=checked]:border-primary peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-background cursor-pointer block"></Label>
              </div>
            </RadioGroup>
          </div>

          {/* Size Selection */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-medium">Size</h3>
              <Link href="#" className="text-xs text-primary hover:underline">Size Guide</Link>
            </div>
            <RadioGroup defaultValue={selectedSize} onValueChange={setSelectedSize} className="grid grid-cols-3 gap-3">
              <div>
                <RadioGroupItem value="s" id="size-s" className="peer sr-only" />
                <Label htmlFor="size-s" className="flex items-center justify-center w-full p-3 border rounded-md cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:bg-muted transition-colors">S</Label>
              </div>
              <div>
                <RadioGroupItem value="m" id="size-m" className="peer sr-only" />
                <Label htmlFor="size-m" className="flex items-center justify-center w-full p-3 border rounded-md cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:bg-muted transition-colors">M</Label>
              </div>
              <div>
                <RadioGroupItem value="l" id="size-l" className="peer sr-only" />
                <Label htmlFor="size-l" className="flex items-center justify-center w-full p-3 border rounded-md cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:bg-muted transition-colors">L</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mb-8">
            {/* Quantity */}
            <div className="flex items-center border rounded-md">
              <Button variant="ghost" size="icon" onClick={decreaseQuantity} className="rounded-none h-12 w-12"><Minus className="h-4 w-4" /></Button>
              <div className="w-12 text-center font-medium">{quantity}</div>
              <Button variant="ghost" size="icon" onClick={increaseQuantity} className="rounded-none h-12 w-12"><Plus className="h-4 w-4" /></Button>
            </div>
            
            <Button size="lg" className="flex-1 h-12 text-md gap-2">
              <ShoppingCart className="h-5 w-5" /> Add to Cart
            </Button>
            
            <Button variant="outline" size="icon" className="h-12 w-12 shrink-0 text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-colors">
              <Heart className="h-5 w-5" />
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg mt-auto">
            <div className="flex items-center gap-3">
              <Truck className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Free Shipping</p>
                <p className="text-xs text-muted-foreground">Orders over ₹999</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">1 Year Warranty</p>
                <p className="text-xs text-muted-foreground">100% Secure Checkout</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Section: Tabs */}
      <div className="mt-16 pt-8 border-t">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent overflow-x-auto">
            <TabsTrigger value="details" className="data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent rounded-none px-8 py-3 text-base">Product Details</TabsTrigger>
            <TabsTrigger value="specs" className="data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent rounded-none px-8 py-3 text-base">Specifications</TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent rounded-none px-8 py-3 text-base">Reviews (128)</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="py-6 text-muted-foreground space-y-4">
            <p>Immerse yourself in your favorite music, podcasts, and calls with our Premium Wireless Headphones. Designed for audiophiles and everyday users alike, these headphones deliver crisp highs, balanced mids, and deep, punchy bass.</p>
            <p>The ergonomic design features memory foam ear cushions wrapped in premium synthetic leather, ensuring maximum comfort even during extended listening sessions. With active noise cancellation (ANC), you can block out the world and focus on what matters.</p>
            <ul className="list-disc pl-5 space-y-2 mt-4">
              <li>Industry-leading Active Noise Cancellation</li>
              <li>Up to 40 hours of battery life with ANC on</li>
              <li>Fast charging: 15 minutes gives 4 hours of playback</li>
              <li>Built-in microphones for crystal clear calls</li>
              <li>Multipoint connection to pair with two devices simultaneously</li>
            </ul>
          </TabsContent>
          
          <TabsContent value="specs" className="py-6">
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 text-sm max-w-3xl">
              <div className="grid grid-cols-2 py-2 border-b"><span className="text-muted-foreground font-medium">Bluetooth Version</span><span>5.2</span></div>
              <div className="grid grid-cols-2 py-2 border-b"><span className="text-muted-foreground font-medium">Driver Size</span><span>40mm Dynamic</span></div>
              <div className="grid grid-cols-2 py-2 border-b"><span className="text-muted-foreground font-medium">Weight</span><span>250g</span></div>
              <div className="grid grid-cols-2 py-2 border-b"><span className="text-muted-foreground font-medium">Battery Capacity</span><span>800mAh</span></div>
              <div className="grid grid-cols-2 py-2 border-b"><span className="text-muted-foreground font-medium">Charging Port</span><span>USB-C</span></div>
              <div className="grid grid-cols-2 py-2 border-b"><span className="text-muted-foreground font-medium">Water Resistance</span><span>IPX4</span></div>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="py-6">
            <div className="flex items-center gap-4 mb-8">
              <div className="text-5xl font-bold">4.8</div>
              <div>
                <div className="flex text-amber-500 mb-1">
                  <Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" />
                </div>
                <div className="text-sm text-muted-foreground">Based on 128 reviews</div>
              </div>
            </div>
            
            <div className="space-y-6 max-w-3xl">
              <div className="pb-6 border-b">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium">Kuldeep Gautam</p>
                    <div className="flex text-amber-500 mt-1"><Star className="h-3 w-3 fill-current" /><Star className="h-3 w-3 fill-current" /><Star className="h-3 w-3 fill-current" /><Star className="h-3 w-3 fill-current" /><Star className="h-3 w-3 fill-current" /></div>
                  </div>
                  <span className="text-xs text-muted-foreground">2 days ago</span>
                </div>
                <p className="text-sm text-muted-foreground">Absolutely love these headphones! The sound quality is incredible and the noise cancellation blocks out everything on my commute. Highly recommended.</p>
              </div>
              <div className="pb-6 border-b">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium">Rahul Singh</p>
                    <div className="flex text-amber-500 mt-1"><Star className="h-3 w-3 fill-current" /><Star className="h-3 w-3 fill-current" /><Star className="h-3 w-3 fill-current" /><Star className="h-3 w-3 fill-current" /><Star className="h-3 w-3 text-muted-foreground" /></div>
                  </div>
                  <span className="text-xs text-muted-foreground">1 week ago</span>
                </div>
                <p className="text-sm text-muted-foreground">Great build quality and very comfortable. The only downside is they get a bit warm after wearing them for 5+ hours straight.</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
