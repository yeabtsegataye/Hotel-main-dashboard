import React, { PureComponent } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Legend,
  Bar,
} from "recharts";
import './graph.css'; // Assuming you have custom styles

const data = [
  { name: "Burger", uv: 4000, pv: 2400 },
  { name: "Pizza", uv: 3000, pv: 1398 },
  { name: "Sandwich", uv: 2000, pv: 9800 },
  { name: "Tea", uv: 2780, pv: 3908 },
  { name: "Kitfo", uv: 1890, pv: 4800 },
  { name: "Kurt", uv: 2390, pv: 3800 },
  { name: "Tibs", uv: 3490, pv: 4300 },
];

export class Graphs extends PureComponent {
  render() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Area Chart */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h4 className="text-lg font-bold mb-4">Sales Area Chart</h4>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h4 className="text-lg font-bold mb-4">Product Popularity</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}
