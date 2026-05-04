/**
 * ArticleChart — Interactive data visualization for Insights articles
 * Supports: bar, line, area, pie charts via Recharts
 * Design: Assistants brand palette — Navy, Steel, Orange
 */
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { useLanguage } from "@/contexts/LanguageContext";

const BRAND_COLORS = [
  "#0B1F3A", // navy
  "#E8622A", // orange
  "#5C6B7A", // steel
  "#1A3A5C", // navy-light
  "#F0A07A", // orange-light
  "#8A9BAA", // steel-light
];

interface ArticleChartProps {
  chartData: string;   // JSON string
  chartType?: string;  // "bar" | "line" | "area" | "pie"
  chartTitle?: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-navy/10 px-4 py-3 shadow-lg">
        {label && <p className="text-xs font-semibold text-navy mb-2 uppercase tracking-wide">{label}</p>}
        {payload.map((entry: any, i: number) => (
          <p key={i} className="text-xs text-steel font-light">
            <span style={{ color: entry.color }} className="font-semibold">{entry.name}: </span>
            {typeof entry.value === "number" ? entry.value.toLocaleString("pt-BR") : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function ArticleChart({ chartData, chartType = "bar", chartTitle }: ArticleChartProps) {
  const { locale } = useLanguage();

  let data: any[] = [];
  try {
    data = JSON.parse(chartData);
  } catch {
    return null;
  }

  if (!data || data.length === 0) return null;

  // Detect data keys (exclude 'name' and 'label')
  const dataKeys = Object.keys(data[0] || {}).filter(k => k !== "name" && k !== "label");

  const commonProps = {
    data,
    margin: { top: 8, right: 16, left: 0, bottom: 8 },
  };

  const axisStyle = {
    tick: { fontSize: 11, fill: "#5C6B7A", fontFamily: "'DM Sans', sans-serif" },
    axisLine: { stroke: "#E8EDF2" },
    tickLine: false,
  };

  return (
    <div className="my-10 p-6 md:p-8 bg-white border border-navy/6 not-prose">
      {chartTitle && (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-steel mb-6">
          {chartTitle}
        </p>
      )}
      <ResponsiveContainer width="100%" height={280}>
        {chartType === "line" ? (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F0F2F5" />
            <XAxis dataKey="name" {...axisStyle} />
            <YAxis {...axisStyle} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 11, fontFamily: "'DM Sans', sans-serif" }} />
            {dataKeys.map((key, i) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={BRAND_COLORS[i % BRAND_COLORS.length]}
                strokeWidth={2}
                dot={{ r: 3, fill: BRAND_COLORS[i % BRAND_COLORS.length] }}
                activeDot={{ r: 5 }}
              />
            ))}
          </LineChart>
        ) : chartType === "area" ? (
          <AreaChart {...commonProps}>
            <defs>
              {dataKeys.map((key, i) => (
                <linearGradient key={key} id={`grad-${i}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={BRAND_COLORS[i % BRAND_COLORS.length]} stopOpacity={0.15} />
                  <stop offset="95%" stopColor={BRAND_COLORS[i % BRAND_COLORS.length]} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F0F2F5" />
            <XAxis dataKey="name" {...axisStyle} />
            <YAxis {...axisStyle} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 11, fontFamily: "'DM Sans', sans-serif" }} />
            {dataKeys.map((key, i) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stroke={BRAND_COLORS[i % BRAND_COLORS.length]}
                strokeWidth={2}
                fill={`url(#grad-${i})`}
              />
            ))}
          </AreaChart>
        ) : chartType === "pie" ? (
          <PieChart>
            <Pie
              data={data}
              dataKey={dataKeys[0] || "value"}
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              innerRadius={50}
              paddingAngle={2}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={BRAND_COLORS[i % BRAND_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 11, fontFamily: "'DM Sans', sans-serif" }} />
          </PieChart>
        ) : (
          // Default: bar chart
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F0F2F5" vertical={false} />
            <XAxis dataKey="name" {...axisStyle} />
            <YAxis {...axisStyle} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 11, fontFamily: "'DM Sans', sans-serif" }} />
            {dataKeys.map((key, i) => (
              <Bar
                key={key}
                dataKey={key}
                fill={BRAND_COLORS[i % BRAND_COLORS.length]}
                radius={[2, 2, 0, 0]}
                maxBarSize={48}
              />
            ))}
          </BarChart>
        )}
      </ResponsiveContainer>
      <p className="text-[10px] text-steel/60 mt-4 text-right font-light">
        {locale === "pt" ? "Fonte: Assistants Consulting" : "Source: Assistants Consulting"}
      </p>
    </div>
  );
}
