import React, { useState } from "react";
import { useAnalytics } from "../../hooks/useAnalytics";
import { MdAccountBalance } from "react-icons/md";
import { FiGlobe, FiImage, FiUsers } from "react-icons/fi";

const COLOR_LOCALS = "#1E4538";
const COLOR_FOREIGNERS = "#C9A84C";

// Visitor trend line chart

interface LineChartProps {
  months: string[];
  localsData: number[];
  foreignsData: number[];
}

const LineChart: React.FC<LineChartProps> = ({
  months,
  localsData,
  foreignsData,
}) => {
  const W = 860;
  const H = 200;
  const padL = 48;
  const padR = 20;
  const padT = 16;
  const padB = 28;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;

  const maxVal = 30000;
  const yTicks = [0, 6000, 12000, 18000, 24000, 30000];

  const toX = (i: number) => padL + (i / (months.length - 1)) * chartW;
  const toY = (v: number) => padT + chartH - (v / maxVal) * chartH;

  const polyline = (data: number[]) =>
    data.map((v, i) => `${toX(i)},${toY(v)}`).join(" ");

  const area = (data: number[]) =>
    `M${toX(0)},${toY(data[0])} ` +
    data
      .slice(1)
      .map((v, i) => `L${toX(i + 1)},${toY(v)}`)
      .join(" ") +
    ` L${toX(data.length - 1)},${padT + chartH} L${toX(0)},${padT + chartH} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
      <defs>
        <linearGradient id="localsGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLOR_LOCALS} stopOpacity="0.15" />
          <stop offset="100%" stopColor={COLOR_LOCALS} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="foreignsGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLOR_FOREIGNERS} stopOpacity="0.12" />
          <stop offset="100%" stopColor={COLOR_FOREIGNERS} stopOpacity="0" />
        </linearGradient>
      </defs>

      {yTicks.map((tick) => {
        const y = toY(tick);
        const label = tick === 0 ? "0k" : `${tick / 1000}k`;
        return (
          <g key={tick}>
            <line
              x1={padL}
              x2={W - padR}
              y1={y}
              y2={y}
              stroke="#e5e7eb"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <text
              x={padL - 6}
              y={y + 4}
              textAnchor="end"
              fontSize="9"
              fill="#9ca3af"
            >
              {label}
            </text>
          </g>
        );
      })}

      <path d={area(localsData)} fill="url(#localsGrad)" />
      <path d={area(foreignsData)} fill="url(#foreignsGrad)" />

      <polyline
        points={polyline(localsData)}
        fill="none"
        stroke={COLOR_LOCALS}
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <polyline
        points={polyline(foreignsData)}
        fill="none"
        stroke={COLOR_FOREIGNERS}
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {months.map((m, i) => (
        <text
          key={m}
          x={toX(i)}
          y={H - 4}
          textAnchor="middle"
          fontSize="9"
          fill="#9ca3af"
        >
          {m}
        </text>
      ))}
    </svg>
  );
};

// Provincial distribution bar chart

interface Province {
  province: string;
  locals: number;
  foreigners: number;
}

interface BarChartProps {
  provinces: Province[];
}

const BarChart: React.FC<BarChartProps> = ({ provinces }) => {
  const [hovered, setHovered] = useState<number | null>(null);

  if (provinces.length === 0) {
    return (
      <div className="flex items-center justify-center h-[200px] text-sm text-gray-400">
        No provincial data yet
      </div>
    );
  }

  const W = 860;
  const H = 200;
  const padL = 20;
  const padR = 20;
  const padT = 16;
  const padB = 36;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;

  const maxVal =
    Math.max(...provinces.flatMap((p) => [p.locals, p.foreigners])) * 1.2;
  const groupW = chartW / provinces.length;
  const barW = Math.max(groupW * 0.28, 18);
  const gap = 4;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
      {provinces.map((prov, i) => {
        const cx = padL + i * groupW + groupW / 2;
        const x1 = cx - gap / 2 - barW;
        const x2 = cx + gap / 2;

        const h1 = (prov.locals / maxVal) * chartH;
        const h2 = (prov.foreigners / maxVal) * chartH;

        const isHov = hovered === i;

        return (
          <g
            key={prov.province}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{ cursor: "pointer" }}
          >
            <rect
              x={x1}
              y={padT + chartH - h1}
              width={barW}
              height={h1}
              rx={3}
              fill={isHov ? "#16382c" : COLOR_LOCALS}
              style={{ transition: "fill 0.15s" }}
            />
            <rect
              x={x2}
              y={padT + chartH - h2}
              width={barW}
              height={h2}
              rx={3}
              fill={isHov ? "#b8922e" : COLOR_FOREIGNERS}
              style={{ transition: "fill 0.15s" }}
            />

            {isHov && (
              <g>
                <rect
                  x={cx - 44}
                  y={padT}
                  width={88}
                  height={40}
                  rx={6}
                  fill="#1a1a1a"
                  opacity={0.85}
                />
                <text
                  x={cx}
                  y={padT + 14}
                  textAnchor="middle"
                  fontSize="9"
                  fill="#fff"
                  fontWeight="600"
                >
                  {prov.province}
                </text>
                <text
                  x={cx}
                  y={padT + 26}
                  textAnchor="middle"
                  fontSize="8"
                  fill="#6ee7b7"
                >
                  L: {prov.locals.toLocaleString()}
                </text>
                <text
                  x={cx}
                  y={padT + 36}
                  textAnchor="middle"
                  fontSize="8"
                  fill="#fcd34d"
                >
                  F: {prov.foreigners.toLocaleString()}
                </text>
              </g>
            )}

            {prov.province.split(" ").map((word, wi) => (
              <text
                key={wi}
                x={cx}
                y={padT + chartH + 12 + wi * 10}
                textAnchor="middle"
                fontSize="9"
                fill="#9ca3af"
              >
                {word}
              </text>
            ))}
          </g>
        );
      })}
    </svg>
  );
};

// Stat card

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, value, label }) => (
  <div className="bg-white rounded-2xl p-6 flex flex-col gap-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="text-[#1E4538] text-2xl">{icon}</div>
    <div>
      <p className="text-4xl font-bold font-serif text-[#1a1a1a] tracking-tight">
        {value}
      </p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
  </div>
);

// Legend used above both charts

const ChartLegend: React.FC = () => (
  <div className="flex items-center gap-4 text-xs text-gray-500">
    <span className="flex items-center gap-1.5">
      <span className="w-3 h-3 rounded-full bg-[#1E4538] inline-block" />
      Locals
    </span>
    <span className="flex items-center gap-1.5">
      <span className="w-3 h-3 rounded-full bg-[#C9A84C] inline-block" />
      Foreigners
    </span>
  </div>
);

// Analytics page

const Analytics: React.FC = () => {
  const { analytics, loading, error } = useAnalytics();

  if (loading) {
    return <p className="text-gray-500 text-sm">Loading...</p>;
  }

  if (error || !analytics) {
    return <p className="text-red-500 text-sm">{error ?? "Something went wrong."}</p>;
  }

  const { months, locals: localsData, foreigners: foreignsData } =
    analytics.visitorAnalytics;
  const { provinceDistribution: provinces, mostSearched } = analytics;
  const maxSearch = Math.max(...mostSearched.map((x) => x.count));

  return (
    <div className="w-full font-['Inter'] pb-12">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm text-gray-400 mb-2">Home &gt; Analytics</p>
        <h1 className="text-4xl font-bold font-serif text-[#2a2a2a] mb-1 tracking-tight">
          Analytics
        </h1>
        <p className="text-gray-500 text-sm">
          Traffic, engagement and content performance.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        <StatCard
          icon={<MdAccountBalance />}
          value={analytics.stats.historicalPlaces.toString()}
          label="Historical Places"
        />
        <StatCard
          icon={<FiGlobe />}
          value={analytics.stats.unescoSites.toString().padStart(2, "0")}
          label="UNESCO Sites"
        />
        <StatCard
          icon={<FiImage />}
          value={analytics.stats.images.toLocaleString()}
          label="Images"
        />
        <StatCard
          icon={<FiUsers />}
          value={analytics.stats.monthlyVisitors.toLocaleString()}
          label="Monthly Visitors"
        />
      </div>

      {/* Visitor trend */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold font-serif text-[#2a2a2a]">
              Visitor Analytics
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Visitors over the last {months.length} months
            </p>
          </div>
          <ChartLegend />
        </div>
        <LineChart
          months={months}
          localsData={localsData}
          foreignsData={foreignsData}
        />
      </div>

      {/* Provincial distribution */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold font-serif text-[#2a2a2a]">
              Provincial Distribution
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Visitor breakdown by province — hover for details
            </p>
          </div>
          <ChartLegend />
        </div>
        <BarChart provinces={provinces} />
      </div>

      {/* Most searched */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold font-serif text-[#2a2a2a] mb-6">
          Most Searched
        </h2>
        <div className="space-y-5">
          {mostSearched.map((item, i) => {
            const pct = (item.count / maxSearch) * 100;
            return (
              <div key={item.name}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm text-[#2a2a2a] font-medium">
                    <span className="text-gray-400 mr-2">{i + 1}.</span>
                    {item.name}
                  </span>
                  <span className="text-sm text-gray-500 tabular-nums">
                    {item.count.toLocaleString()}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#1E4538] transition-all duration-700"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Analytics;