import React, { useState, useEffect } from "react";
import { useGetOrderStatsQuery } from "../Order/service/OrderServices";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Cell,
} from "recharts";

// Type for Orders by Status
interface OrderStatus {
    _id: string;
    count: number;
}

// Type for Monthly Sales
interface MonthlySales {
    _id: { year: number; month: number };
    totalSales: number;
    totalOrders: number;
}

// Stat Card
const StatCard = ({ title, value, color }: any) => (
    <div className="bg-white shadow-lg rounded-xl p-5 border border-gray-100">
        <p className="text-sm text-gray-400">{title}</p>
        <h2 className={`text-3xl font-bold mt-1 ${color}`}>{value}</h2>
    </div>
);

// --- Orders by Status Chart ---
const OrdersByStatusBarChart = ({ data }: { data: OrderStatus[] }) => {
    const COLORS = [
        "#4F46E5",
        "#10B981",
        "#F59E0B",
        "#EF4444",
        "#3B82F6",
        "#8B5CF6",
        "#0EA5E9",
        "#F472B6",
    ];

    return (
        <div className="bg-white shadow-lg rounded-xl p-5 h-[400px]">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Orders by Status</h3>
            <ResponsiveContainer width="100%" height="85%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="_id" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" barSize={40} radius={[4, 4, 0, 0]}>
                        {data.map((entry, index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

// --- Monthly Sales Chart ---
const SalesTrendBarChart = ({ data }: { data: MonthlySales[] }) => {
    // Convert API format → Chart format
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const chartData = data.map((m) => ({
        date: `${monthNames[m._id.month - 1]} ${m._id.year}`,
        sales: m.totalSales,
    }));

    return (
        <div className="bg-white shadow-lg rounded-xl p-5 h-[400px]">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Monthly Sales Trend</h3>
            <ResponsiveContainer width="100%" height="85%">
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="date" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" tickFormatter={(value) => `₹${value.toLocaleString()}`} />
                    <Tooltip formatter={(v) => [`₹${Number(v).toLocaleString()}`, "Sales"]} />
                    <Legend />
                    <Bar dataKey="sales" fill="#6366f1" barSize={35} radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

// --- MAIN DASHBOARD ---
const DashboardWrapper = () => {
    const [range, setRange] = useState("weekly");
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(new Date());

    // Date range auto-update
    useEffect(() => {
        const today = new Date();
        let start = new Date();

        switch (range) {
            case "daily":
                start.setHours(0, 0, 0, 0);
                break;
            case "weekly":
                start.setDate(today.getDate() - 7);
                break;
            case "monthly":
                start.setMonth(today.getMonth() - 1);
                break;
            case "3months":
                start.setMonth(today.getMonth() - 3);
                break;
            case "6months":
                start.setMonth(today.getMonth() - 6);
                break;
            case "1year":
                start.setFullYear(today.getFullYear() - 1);
                break;
        }

        setStartDate(start);
        setEndDate(today);
    }, [range]);

    const { data: stats, isLoading, isFetching }: any = useGetOrderStatsQuery(
        {
            startDate: startDate?.toISOString(),
            endDate: endDate?.toISOString(),
        },
        { skip: !startDate || !endDate }
    );

    const safeNumber = (num: any) => (num ? Number(num).toLocaleString() : "0");

    return (
        <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>

            {/* Range Filter */}
            <div>
                <select
                    value={range}
                    onChange={(e) => setRange(e.target.value)}
                    className="border rounded-lg p-3 bg-white shadow"
                >
                    <option value="daily">Today</option>
                    <option value="weekly">Last 7 Days</option>
                    <option value="monthly">Last 30 Days</option>
                    <option value="3months">Last 3 Months</option>
                    <option value="6months">Last 6 Months</option>
                    <option value="1year">Last 1 Year</option>
                </select>
            </div>

            {/* Loader */}
            {(isLoading || isFetching) && (
                <div className="flex justify-center py-20">
                    <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
                </div>
            )}

            {/* DATA DISPLAY */}
            {stats && !isLoading && (
                <>
                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard title="Total Sales" value={`₹${safeNumber(stats.totalSales)}`} color="text-green-600" />
                        <StatCard title="Total Orders" value={safeNumber(stats.totalOrders)} color="text-blue-600" />
                        <StatCard title="Total Expense" value={`₹${safeNumber(stats.totalExpense)}`} color="text-red-600" />
                        <StatCard title="Profit" value={`₹${safeNumber(stats.profit)}`} color="text-purple-600" />
                    </div>

                    {/* Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                        {/* Orders By Status */}
                        {stats.ordersByStatus?.length > 0 ? (
                            <OrdersByStatusBarChart data={stats.ordersByStatus} />
                        ) : (
                            <div className="bg-white h-[400px] rounded-xl shadow p-5 flex justify-center items-center">
                                No Order Status Data
                            </div>
                        )}

                        {/* Monthly Sales */}
                        {stats.monthlySales?.length > 0 ? (
                            <SalesTrendBarChart data={stats.monthlySales} />
                        ) : (
                            <div className="bg-white h-[400px] rounded-xl shadow p-5 flex justify-center items-center">
                                No Monthly Sales Data
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default DashboardWrapper;
