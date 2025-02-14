import React from "react";
import { Graphs } from "./Charts"; // Assuming you named the graphs component like this

export const Dashboard = () => {
  return (
    <div className="p-4">
      <div className="mb-6">
        <h3 className="text-2xl font-bold">Dashboard</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <Card title="Inventory Stock" amount="$25,312.24" percentage="+10.23%" description="This Month" />
        <Card title="Orders History" amount="$6,926.32" percentage="+2.31%" description="This Month" />
        <Card title=" Stock" amount="$25,312.24" percentage="+10.23%" description="This Month" />

      </div>

      {/* Charts Section */}
      <div className="mt-3 mb-3">
        <Graphs />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <Widget title="Conversion Rate" amount="75%" icon="bar-chart" trend="up" />
        <Widget title="Total Sales" amount="$18,000.00" icon="wallet" trend="down" />
        <Widget title="Net Revenue" amount="$10,000.00" icon="money" trend="up" />
        <Card title="Marketing" amount="+$15,870.98 USD" description="Total Income" conversionRate />

</div>
    </div>
  );
};

const Card = ({ title, amount, percentage, description, conversionRate }) => (
  <div className="bg-white shadow-lg rounded-lg p-4">
    <h5 className="text-lg font-semibold">{title}</h5>
    <div className="mt-4">
      <h4 className="text-3xl font-bold">{amount}</h4>
      {percentage && (
        <p className="text-sm text-gray-500">
          {percentage} <span className="text-green-500 ml-1">+10.23%</span> {description}
        </p>
      )}
    </div>
    {conversionRate && (
      <div className="flex items-center justify-between mt-4">
        <strong className="text-sm">Conversion Rate</strong>
        <div className="w-20 h-20">
          {/* You can place a chart or indicator here */}
        </div>
      </div>
    )}
  </div>
);

const Widget = ({ title, amount, icon, trend }) => (
  <div className="flex items-center bg-white shadow-lg rounded-lg p-4">
    <div className="flex items-center justify-center bg-blue-100 rounded-full p-3 mr-4 text-blue-600">
      <i className={`gd-${icon} text-lg`} />
    </div>
    <div>
      <h4 className="text-2xl font-bold">{amount}</h4>
      <h6 className="text-sm text-gray-500">{title}</h6>
    </div>
    <i className={`gd-arrow-${trend} ml-auto text-${trend === "up" ? "green" : "red"}-500`} />
  </div>
);
