import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { Button } from "~/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { LineChart as LineChartIcon, X } from "lucide-react";
import { useQuery } from "@apollo/client";
import { GetRegistrationsVsDateDocument } from "~/generated/generated";
import Spinner from "~/components/spinner";

const RegistrationChart = () => {
  const { data, loading, error } = useQuery(GetRegistrationsVsDateDocument);

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error.message}</p>;

  const registrationData = data?.getRegistrationvsDate?.__typename === "QueryGetRegistrationvsDateSuccess" 
    ? data.getRegistrationvsDate.data 
    : [];

  const formattedData = registrationData.map(item => ({
    ...item,
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="flex justify-center">
      <Drawer>
        <DrawerTrigger asChild>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded flex items-center gap-2 shadow-sm">
            <LineChartIcon size={16} />
            <span>View Registrations</span>
          </Button>
        </DrawerTrigger>
        <DrawerContent className="bg-gray-50 p-0 rounded-t-lg">
          <div className="max-w-6xl mx-auto w-full">
            <DrawerHeader className="px-6 pt-6 pb-2">
              <div className="flex items-center justify-between">
                <DrawerTitle className="text-xl font-semibold text-gray-800">Registration Analytics</DrawerTitle>
                <DrawerClose asChild>
                  <Button variant="ghost" size="sm" className="rounded w-8 h-8 p-0 text-gray-500">
                    <X size={18} />
                  </Button>
                </DrawerClose>
              </div>
            </DrawerHeader>
            
            <div className="px-6 py-4">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={formattedData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                      <XAxis dataKey="date" axisLine={{ stroke: '#d1d5db' }} tickLine={false} tickMargin={10} fontSize={12} tick={{ fill: '#6b7280' }} />
                      <YAxis axisLine={{ stroke: '#d1d5db' }} tickLine={false} tickMargin={10} fontSize={12} tick={{ fill: '#6b7280' }} />
                      <Tooltip />
                      <Legend wrapperStyle={{ paddingTop: 20 }} iconType="circle" iconSize={8} />
                      <Line type="monotone" dataKey="internalRegistrations" name="Internal" stroke="#2563eb" strokeWidth={2} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6, strokeWidth: 2 }} />
                      <Line type="monotone" dataKey="externalRegistrations" name="External" stroke="#4b5563" strokeWidth={2} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6, strokeWidth: 2 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            <DrawerFooter className="px-6 py-4">
              <p className="text-xs text-gray-500 text-center">
                Data refreshed {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default RegistrationChart;
