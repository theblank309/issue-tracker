"use client";

import { PieChart, Pie, ResponsiveContainer, Sector, Cell } from "recharts";
import React, { useState } from "react";
import { Box, Text } from "@radix-ui/themes";

interface Props {
  assigned: number;
  unassigned: number;
}

const AssignedChart = ({ assigned, unassigned }: Props) => {
  const data = [
    { name: "Assigned", value: assigned },
    { name: "Unassigned", value: unassigned },
  ];

  const [index, setIndex] = useState(0);
  const COLORS = ["#1C2541", "#3A506B", "#A9BDD6"];

  return (
    <Box
      width="100%"
      height="70dvh"
      className="bg-white border border-border-color rounded-md p-2"
    >
      <Text size="3" weight="medium" m="2">
        Issues Assigned Overview
      </Text>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            activeIndex={index}
            activeShape={renderActiveShape}
            cx="50%"
            cy="50%"
            data={data}
            name="name"
            dataKey="value"
            innerRadius={130}
            outerRadius={170}
            fill="#8884d8"
            onMouseEnter={(_, index) => setIndex(index)}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

const renderActiveShape = (props: any) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;

  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={0}
        textAnchor="middle"
        fill={fill}
        fontSize="22px"
        fontWeight="500"
      >
        {payload.name}
      </text>
      <text
        x={cx}
        y={cy}
        dy={20}
        textAnchor="middle"
        fill={fill}
        fontSize="15px"
        fontWeight="300"
      >
        {value + " Issues"}
      </text>
      <text
        x={cx}
        y={cy}
        dy={40}
        textAnchor="middle"
        fill={fill}
        fontSize="15px"
        fontWeight="300"
      >
        {(percent * 100).toFixed(2) + "%"}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  );
};

export default AssignedChart;
