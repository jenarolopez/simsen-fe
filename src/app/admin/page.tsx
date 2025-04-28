"use client";

import { useState, useEffect } from "react";
import { Search, LogOut } from "lucide-react";
import TouristDialog from "@/app/admin/components/TouristDialog";

import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Input } from "../../components/ui/input";

// Define the type for our user data
export interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  experienceId: string;
  bookDate: string;
  status: "pending" | "approved" | "declined" | string;
  numberOfTourist: string;
  referral: string;
  createdAt: string;
  referenceId: string;
  tourist: {
    name: string;
    email: string;
  }[];
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = (user: User) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setSelectedUser(null);
    setIsDialogOpen(false);
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("/api/bookings");
        if (!response.ok) throw new Error("Failed to fetch bookings");
        const bookings = await response.json();
        setUsers(bookings);
        console.log(bookings, "");
      } catch (error) {
        console.error("Error:", error);
        return [];
      }
    };
    fetchBookings();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      // Update local state
      const updatedUsers = users.map((user) =>
        user.referenceId === id ? { ...user, status: newStatus.toLowerCase() } : user
      );
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Filter users based on active filter and search query
  useEffect(() => {
    let result = users;

    // Apply status filter
    if (activeFilter !== "all") {
      result = result.filter(
        (user) => user.status === activeFilter.toUpperCase()
      );
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (user) =>
          user.fullName.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query)
      );
    }

    setFilteredUsers(result);
  }, [users, activeFilter, searchQuery]);

  return (
    <div className="w-full h-full bg-white">
      <div className="container mx-auto px-4 py-6 bg-white text-black">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="font-medium">Raf</span>
            <Button
              variant="destructive"
              size="sm"
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Tabs
          defaultValue="all"
          className="mb-6"
          onValueChange={setActiveFilter}
        >
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="declined">Declined</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by name or email..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 border-b">
                  Full Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 border-b">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 border-b">
                  Phone
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 border-b">
                  Experience
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 border-b">
                  Pickup Date
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 border-b">
                  Attendees
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 border-b">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 border-b">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-blue-600 hover:underline">
                    <a href="#">{user.fullName}</a>
                  </td>
                  <td className="px-4 py-3 text-sm">{user.email}</td>
                  <td className="px-4 py-3 text-sm">{user.phoneNumber}</td>
                  <td className="px-4 py-3 text-sm">{user.experienceId}</td>
                  <td className="px-4 py-3 text-sm">{user.bookDate}</td>
                  <td className="px-4 py-3 text-sm">{user.numberOfTourist}</td>
                  <td className="px-4 py-3 text-sm">
                    <StatusBadge status={user.status} />
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {user.status === "pending" && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="bg-orange-500 hover:bg-orange-600"
                          onClick={() =>
                            handleStatusChange(user.referenceId, "approved")
                          }
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          className="bg-orange-500 hover:bg-orange-600"
                          onClick={() =>
                            handleStatusChange(user.referenceId, "declined")
                          }
                        >
                          Decline
                        </Button>
                      </div>
                    )}
                    <button
                      onClick={() => openDialog(user)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tourist Dialog */}
      <TouristDialog isOpen={isDialogOpen} onClose={closeDialog} user={selectedUser} />
    </div>
  );
}

// Status badge component
function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case "approved":
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800">
          APPROVED
        </Badge>
      );
    case "pending":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 hover:text-yellow-800">
          PENDING
        </Badge>
      );
    case "declined":
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100 hover:text-red-800">
          DECLINED
        </Badge>
      );
    default:
      return <Badge>{status}</Badge>;
  }
}
