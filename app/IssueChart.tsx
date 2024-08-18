"use client";

import { Box } from "@radix-ui/themes";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Bar,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
} from "recharts";

interface Props {
  open: number;
  in_progress: number;
  closed: number;
}

const IssueChart = () => {
  const data = [
    {
      name: "01/05",
      open: 40,
      in_progress: 24,
      closed: 3,
    },
    {
      name: "02/05",
      open: 30,
      in_progress: 13,
      closed: 5,
    },
    {
      name: "03/05",
      open: 20,
      in_progress: 9,
      closed: 10,
    },
    {
      name: "04/05",
      open: 27,
      in_progress: 39,
      closed: 12,
    },
    {
      name: "05/05",
      open: 18,
      in_progress: 48,
      closed: 7,
    },
    {
      name: "06/05",
      open: 23,
      in_progress: 38,
      closed: 15,
    },
    {
      name: "07/05",
      open: 34,
      in_progress: 43,
      closed: 20,
    },
    {
      name: "08/05",
      open: 44,
      in_progress: 24,
      closed: 10,
    },
    {
      name: "09/05",
      open: 68,
      in_progress: 74,
      closed: 23,
    },
    {
      name: "10/05",
      open: 56,
      in_progress: 10,
      closed: 27,
    },
    {
      name: "11/05",
      open: 45,
      in_progress: 13,
      closed: 20,
    },
    {
      name: "12/05",
      open: 14,
      in_progress: 13,
      closed: 34,
    },
    {
      name: "13/05",
      open: 10,
      in_progress: 23,
      closed: 5,
    },
    {
      name: "14/05",
      open: 3,
      in_progress: 7,
      closed: 15,
    },
    {
      name: "15/05",
      open: 53,
      in_progress: 10,
      closed: 23,
    },
  ];

  const COLORS = ["#1C2541", "#3A506B", "#A9BDD6"];
  return (
    <Box
      width="100%"
      height="50%"
      className="bg-white border border-border-color rounded-md"
    >
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 10, right: 50, bottom: 20, left: 0 }}
        >
          <XAxis dataKey="name" tickMargin={10} style={{ fontSize: "12px" }} />
          <YAxis style={{ fontSize: "12px" }} />
          <Tooltip
            contentStyle={{ fontSize: "13px" }} // Adjust font size of the content
            labelStyle={{ fontSize: "15px" }}
          />
          <Legend
            iconType="circle"
            iconSize={10}
            verticalAlign="top"
            style={{ paddingBottom: "10px" }}
          />
          <Line
            type="linear"
            dataKey="open"
            stroke="#1C2541"
            name="Open"
            fontSize="10"
          />
          <Line
            type="linear"
            dataKey="in_progress"
            stroke="#55759d"
            name="In Progress"
          />
          <Line type="linear" dataKey="closed" stroke="#A9BDD6" name="Closed" />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default IssueChart;
