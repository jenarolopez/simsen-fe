"use client";

import { useState, useEffect } from "react";
import { Search, LogOut } from "lucide-react";

import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Input } from "../components/ui/input";

// Define the type for our user data
interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  experience: string;
  packageDate: string;
  status: "PENDING" | "APPROVED" | "DECLINED";
  attendees: number;
}

// Mock data for the dashboard
const initialUsers: User[] = [
  {
    id: "1",
    name: "christian s",
    email: "cs@test.com",
    phone: "639991234567",
    experience: "Amman Walking Tour4",
    packageDate: "2023-03-29",
    status: "DECLINED",
    attendees: 2,
  },
  {
    id: "2",
    name: "testfred",
    email: "testfred@test.com",
    phone: "639991233214",
    experience: "Dashur 6",
    packageDate: "2023-04-04",
    status: "APPROVED",
    attendees: 1,
  },
  {
    id: "3",
    name: "test",
    email: "test",
    phone: "1324234234",
    experience: "Dashur 6",
    packageDate: "2023-04-03",
    status: "PENDING",
    attendees: 1,
  },
  {
    id: "4",
    name: "tala",
    email: "tala@test.com",
    phone: "639993213215",
    experience: "Amman Walking Tour4",
    packageDate: "2023-04-03",
    status: "APPROVED",
    attendees: 2,
  },
  {
    id: "5",
    name: "Joram",
    email: "Joram@email.com",
    phone: "16363636363",
    experience: "Dashur 6",
    packageDate: "2023-04-23",
    status: "APPROVED",
    attendees: 1,
  },
  {
    id: "6",
    name: "123123123",
    email: "123123132",
    phone: "1231",
    experience: "Dashur 6",
    packageDate: "2023-04-03",
    status: "PENDING",
    attendees: 1,
  },
  {
    id: "7",
    name: "shyn",
    email: "shyn@test.com",
    phone: "639993213214",
    experience: "Dashur 6",
    packageDate: "2023-04-02",
    status: "APPROVED",
    attendees: 2,
  },
  {
    id: "8",
    name: "Wil Val",
    email: "wavallente@gmail.com",
    phone: "639997746666",
    experience: "Dashur 6",
    packageDate: "2023-03-30",
    status: "APPROVED",
    attendees: 2,
  },
  {
    id: "9",
    name: "fred",
    email: "fred3@test.com",
    phone: "639993213211",
    experience: "Dashur 6",
    packageDate: "2023-05-03",
    status: "PENDING",
    attendees: 1,
  },
  {
    id: "10",
    name: "wil",
    email: "fred@test.com",
    phone: "639993211234",
    experience: "Petra At Night Jordan 1",
    packageDate: "2023-04-01",
    status: "PENDING",
    attendees: 1,
  },
  {
    id: "11",
    name: "abc test",
    email: "abc@abc.com",
    phone: "639993211234",
    experience: "Dashur 6",
    packageDate: "2023-04-01",
    status: "APPROVED",
    attendees: 3,
  },
  {
    id: "12",
    name: "Jan Rhynshy",
    email: "janrhynsyn@test.com",
    phone: "63999999999",
    experience: "Petra At Night Jordan 1",
    packageDate: "2023-04-01",
    status: "APPROVED",
    attendees: 3,
  },
  {
    id: "13",
    name: "wilfredo vallente",
    email: "asdf@asdf",
    phone: "112341234",
    experience: "Amman Walking Tour4",
    packageDate: "2023-03-20",
    status: "APPROVED",
    attendees: 1,
  },
  {
    id: "14",
    name: "jason m",
    email: "jasonm@abc.com",
    phone: "639999999999",
    experience: "Petra At Night Jordan 1",
    packageDate: "2023-03-31",
    status: "PENDING",
    attendees: 5,
  },
  {
    id: "15",
    name: "Raf",
    email: "hello@seamotech.com",
    phone: "17373737373",
    experience: "Dashur 6",
    packageDate: "2023-04-10",
    status: "APPROVED",
    attendees: 1,
  },
  {
    id: "16",
    name: "RAF",
    email: "hello@mysimsem.com",
    phone: "13232323232",
    experience: "Petra At Night Jordan 1",
    packageDate: "2023-04-19",
    status: "APPROVED",
    attendees: 1,
  },
];

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(initialUsers);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Handle status change (approve/decline)
  const handleStatusChange = (
    id: string,
    newStatus: "APPROVED" | "DECLINED"
  ) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, status: newStatus } : user
    );
    setUsers(updatedUsers);
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
          user.name.toLowerCase().includes(query) ||
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
                    <a href="#">{user.name}</a>
                  </td>
                  <td className="px-4 py-3 text-sm">{user.email}</td>
                  <td className="px-4 py-3 text-sm">{user.phone}</td>
                  <td className="px-4 py-3 text-sm">{user.experience}</td>
                  <td className="px-4 py-3 text-sm">{user.packageDate}</td>
                  <td className="px-4 py-3 text-sm">{user.attendees}</td>
                  <td className="px-4 py-3 text-sm">
                    <StatusBadge status={user.status} />
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {user.status === "PENDING" && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="bg-orange-500 hover:bg-orange-600"
                          onClick={() =>
                            handleStatusChange(user.id, "APPROVED")
                          }
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          className="bg-orange-500 hover:bg-orange-600"
                          onClick={() =>
                            handleStatusChange(user.id, "DECLINED")
                          }
                        >
                          Decline
                        </Button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Status badge component
function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case "APPROVED":
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800">
          APPROVED
        </Badge>
      );
    case "PENDING":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 hover:text-yellow-800">
          PENDING
        </Badge>
      );
    case "DECLINED":
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100 hover:text-red-800">
          DECLINED
        </Badge>
      );
    default:
      return <Badge>{status}</Badge>;
  }
}
