"use client";

import { useState } from "react";
import { Plus, Search, MoreHorizontal, Edit, Ban, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuGroup } from "@/components/ui/dropdown-menu";

const MOCK_USERS = [
  { id: 1, name: "Kuldeep Gautam", email: "kuldeep@example.com", role: "Admin", joined: "Jul 15, 2026", status: "Active" },
  { id: 2, name: "Rahul Singh", email: "rahul@example.com", role: "Customer", joined: "Jul 10, 2026", status: "Active" },
  { id: 3, name: "Aman Gupta", email: "aman@example.com", role: "Customer", joined: "Jul 05, 2026", status: "Active" },
  { id: 4, name: "Priya Sharma", email: "priya@example.com", role: "Customer", joined: "Jun 28, 2026", status: "Banned" },
  { id: 5, name: "Deepak Kumar", email: "deepak@example.com", role: "Manager", joined: "Jun 12, 2026", status: "Active" },
];

export default function AdminUsers() {
  const [search, setSearch] = useState("");

  const filteredUsers = MOCK_USERS.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">Manage your store's customers and staff members.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Add User
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search users..." 
            className="pl-8 bg-background" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="border rounded-lg bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell className="text-muted-foreground">{user.email}</TableCell>
                <TableCell>
                  <Badge variant={user.role === "Admin" || user.role === "Manager" ? "default" : "outline"}>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{user.joined}</TableCell>
                <TableCell>
                  <Badge variant={user.status === "Active" ? "secondary" : "destructive"}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                      <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuGroup>
                        <DropdownMenuItem className="gap-2 cursor-pointer">
                          <Edit className="h-4 w-4" /> Edit Role
                        </DropdownMenuItem>
                        {user.status === "Active" ? (
                          <DropdownMenuItem className="gap-2 text-red-600 focus:text-red-600 cursor-pointer">
                            <Ban className="h-4 w-4" /> Ban User
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem className="gap-2 text-green-600 focus:text-green-600 cursor-pointer">
                            <UserCheck className="h-4 w-4" /> Unban User
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {filteredUsers.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
