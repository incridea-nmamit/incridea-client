import { useState, useEffect } from "react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { LineChartIcon, X } from "lucide-react";
import { useLazyQuery } from "@apollo/client";
import { GetRegistrationVsDateDocument } from "~/generated/generated";
import Spinner from "~/components/spinner";

interface RegistrationDataResponse {
  getRegistrationvsDate: {
    __typename: string;
    data?: RegistrationData[];
    message?: string;
  };
}
interface RegistrationData {
  date: string;
  internalRegistrations: number;
  externalRegistrations: number;
}
interface DateOption {
  value: string;
  label: string;
}

const formatDateShort = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } catch (e) {
    return dateString;
  }
};

const RegistrationChart = () => {
  const [selectedDate, setSelectedDate] = useState<string>("all");
  const [dateOptions, setDateOptions] = useState<DateOption[]>([{ value: "all", label: "All Dates" }]);
  const [chartData, setChartData] = useState<RegistrationData[]>([]);
  const [isHourlyView, setIsHourlyView] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [allDates, setAllDates] = useState<string[]>([]);
  const [dataFetched, setDataFetched] = useState<boolean>(false);

  const [fetchData, { data, loading, error }] = useLazyQuery<RegistrationDataResponse>(
    GetRegistrationVsDateDocument,
    {
      onCompleted: () => {
        setDataFetched(true);
      }
    }
  );

  const handleDrawerChange = (open: boolean) => {
    setIsOpen(open);
    if (open && !dataFetched) {
      fetchData({
        variables: selectedDate !== "all" ? { date: new Date(selectedDate).toISOString() } : {}
      });
    }
  };

  const handleDateChange = (value: string) => {
    setSelectedDate(value);
    fetchData({
      variables: value !== "all" ? { date: new Date(value).toISOString() } : {}
    });
  };

  useEffect(() => {
    if (data?.getRegistrationvsDate?.__typename === "QueryGetRegistrationvsDateSuccess") {
      const rawData = data.getRegistrationvsDate.data || [];

      if (selectedDate === "all") {
        const uniqueDates: string[] = [];
        rawData.forEach(item => {
          if (item && item.date) {
            const dateString = item.date.split("T")[0];
            if (dateString && !uniqueDates.includes(dateString)) {
              uniqueDates.push(dateString);
            }
          }
        });
        setAllDates(uniqueDates);
      }
    }
  }, [data, selectedDate]);

  useEffect(() => {
    const newDateOptions: DateOption[] = [
      { value: "all", label: "All Dates" },
      ...allDates.map((date: string) => ({ 
        value: date, 
        label: formatDateShort(date)
      }))
    ];
    
    setDateOptions(newDateOptions);
  }, [allDates]);

  useEffect(() => {
    setIsHourlyView(selectedDate !== "all");
  }, [selectedDate]);

  useEffect(() => {
    if (data?.getRegistrationvsDate?.__typename === "QueryGetRegistrationvsDateSuccess") {
      const rawData = data.getRegistrationvsDate.data || [];
      
      const formattedData: RegistrationData[] = rawData.map(item => {
        if (!item || !item.date) {
          throw new Error("Invalid data received");
        }
      
        const dateString = item.date;
      
        if (isHourlyView && dateString.includes("T")) {
          const parts = dateString.split("T");
          if (parts.length !== 2) {
            throw new Error(`Invalid time format: ${dateString}`);
          }
      
          const datePart = parts[0];
          let hourPart = parts[1] ?? "";
          const hourNum = parseInt(hourPart, 10);
      
          if (isNaN(hourNum)) {
            throw new Error(`Invalid hour value: ${hourPart}`);
          }
      
          const istHour = (hourNum + 5) % 24;
          const istMinuteText = "30";
          const formattedHour = istHour.toString().padStart(2, '0');
      
          return {
            internalRegistrations: item.internalRegistrations || 0,
            externalRegistrations: item.externalRegistrations || 0,
            date: `${formattedHour}:${istMinuteText}`
          };
        } else {
          return {
            internalRegistrations: item.internalRegistrations || 0,
            externalRegistrations: item.externalRegistrations || 0,
            date: formatDateShort(dateString)
          };
        }
      });        
      
      setChartData(formattedData);
    }
  }, [data, isHourlyView]);

  const formattedSelectedDate = selectedDate !== "all" 
    ? formatDateShort(selectedDate) 
    : "All Dates";

  return (
    <div className="flex justify-center">
      <Drawer open={isOpen} onOpenChange={handleDrawerChange}>
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
                <DrawerTitle className="text-xl font-semibold text-gray-800">
                  {isHourlyView ? `Hourly Registration Data for ${formattedSelectedDate}` : "Registrations By Day"}
                </DrawerTitle>
                <div className="relative z-10" onClick={(e) => e.stopPropagation()}>
                  <Select
                    value={selectedDate}
                    onValueChange={handleDateChange}
                  >
                    <SelectTrigger className="w-40 h-9 text-sm">
                      <SelectValue placeholder="Filter by date" />
                    </SelectTrigger>
                    <SelectContent>
                      {dateOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <DrawerClose asChild>
                  <Button variant="ghost" size="sm" className="rounded w-8 h-8 p-0 text-gray-500">
                    <X size={18} />
                  </Button>
                </DrawerClose>
              </div>
            </DrawerHeader>

            <div className="px-6 py-4">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                {loading ? (
                  <div className="h-80 flex items-center justify-center">
                    <Spinner />
                  </div>
                ) : error ? (
                  <div className="h-80 flex items-center justify-center">
                    <p>Error: {error.message}</p>
                  </div>
                ) : (
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                        <XAxis 
                          dataKey="date" 
                          tick={{ fill: "#6b7280" }} 
                          label={{ value: isHourlyView ? "Time" : "Date", position: "insideBottom", offset: -5 }} 
                        />
                        <YAxis 
                          tick={{ fill: "#6b7280" }} 
                          label={{ value: "Registrations", angle: -90, position: "insideLeft" }} 
                        />
                        <Tooltip 
                          labelFormatter={(label: string) => (isHourlyView ? `${label}` : `${label}`)} 
                        />
                        <Legend wrapperStyle={{ paddingTop: 20 }} iconType="circle" iconSize={8} />
                        <Line type="monotone" dataKey="internalRegistrations" name="Internal" stroke="#2563eb" strokeWidth={2} />
                        <Line type="monotone" dataKey="externalRegistrations" name= "External" stroke="#4b5563" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            </div>

            <DrawerFooter className="px-6 py-4">
              <p className="text-xs text-gray-500 text-center">
                Data refreshed {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} at {new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
              </p>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default RegistrationChart;