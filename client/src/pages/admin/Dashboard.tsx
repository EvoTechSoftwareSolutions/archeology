import { Link } from "react-router-dom";
import {
  MdAccountBalance,
  MdPublic,
  MdImage,
  MdPeople,
  MdAdd,
  MdUpload,
  MdPersonOutline,
  MdBarChart,
} from "react-icons/md";

import { FiArrowUpRight } from "react-icons/fi";

import daladamaligawa from "../../assets/Admin/daladamaligawa.png";
import { useDashboard } from "../../hooks/useDashboard";

const Dashboard = () => {
  const {
    subscriberCount,
    contactCount,
    recentMessages,
    historicalPlaceCount,
    loading,
  } = useDashboard();

  const stats = [
    {
      label: "Historical Places",
      value: historicalPlaceCount.toString(),
      trend: "+ 8%",
      icon: MdAccountBalance,
    },

    // {
    //   label: "UNESCO Sites",
    //   value: "08",
    //   trend: "+ 0%",
    //   icon: MdPublic,
    // },

    {
      label: "Monthly Visitors",
      value: "22,400",
      trend: "+ 20%",
      icon: MdPeople,
    },

    {
      label: "Newsletter Subscribers",
      value: subscriberCount.toString(),
      trend: "Live",
      icon: MdBarChart,
    },

    {
      label: "Unread Messages",
      value: contactCount.toString(),
      trend: "Live",
      icon: MdPersonOutline,
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500 text-sm">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="font-['Inter'] pb-10 w-full max-w-[1600px] mx-auto px-2 sm:px-4 md:px-0">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-['Playfair_Display'] font-bold text-gray-900 mb-1">
          Dashboard
        </h1>

        <p className="text-gray-500 text-sm">
          Overview of Sri Lanka's digital heritage estate.
        </p>
      </div>

      {/* Hero Banner */}

      <div
        className="
        relative 
        w-full 
        h-80 
        sm:h-72 
        lg:h-48 
        rounded-3xl 
        bg-linear-to-r 
        from-[#275949] 
        to-[#1E4538]
        overflow-hidden
        mb-8
        shadow-md
      "
      >
        <div
          className="
          absolute 
          inset-0 
          right-0 
          left-auto 
          w-1/2 
          md:w-1/3 
          z-0
        "
        >
          <img
            src={daladamaligawa}
            alt="Dalada Maligawa"
            className="
              w-full
              h-full
              object-cover
              opacity-90
              mix-blend-overlay
            "
          />

          <div
            className="
            absolute
            inset-0
            bg-linear-to-r
            from-[#1E4538]
            to-transparent
          "
          />
        </div>

        <div
          className="
          relative
          z-10
          p-8
          flex
          flex-col
          justify-center
          h-full
        "
        >
          <p
            className="
            text-[#D97757]
            text-xs
            font-semibold
            tracking-wide
            mb-2
          "
          >
            Good morning, Evo Tech
          </p>

          <h2
            className="
            text-white
            text-3xl
            font-['Playfair_Display']
            font-bold
            mb-3
            max-w-lg
          "
          >
            {historicalPlaceCount} heritage sites are live and thriving
          </h2>

          <p
            className="
            text-white/80
            text-sm
            max-w-md
          "
          >
            Visitor traffic is up 22% this month. Everything is running
            smoothly.
          </p>
        </div>
      </div>

      {/* Stats Cards */}

      <div
        className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        xl:grid-cols-4 
        gap-4 
        sm:gap-6 
        mb-8
      "
      >
        {stats.map((stat, idx) => {
          const Icon = stat.icon;

          return (
            <div
              key={idx}
              className="
                bg-white
                p-6
                rounded-2xl
                shadow-sm
                border
                border-gray-100
                flex
                flex-col
                justify-between
              "
            >
              <div
                className="
                flex
                justify-between
                items-start
                mb-4
              "
              >
                <div
                  className="
                  w-10
                  h-10
                  rounded-full
                  bg-[#E8F1EF]
                  flex
                  items-center
                  justify-center
                  text-[#275949]
                "
                >
                  <Icon size={20} />
                </div>

                <div
                  className="
                  flex
                  items-center
                  text-xs
                  font-bold
                  text-green-600
                  bg-green-50
                  px-2
                  py-1
                  rounded-md
                "
                >
                  <FiArrowUpRight className="mr-1" />

                  {stat.trend}
                </div>
              </div>

              <div>
                <h3
                  className="
                  text-3xl
                  font-['Playfair_Display']
                  font-bold
                  text-gray-900
                  mb-1
                "
                >
                  {stat.value}
                </h3>

                <p
                  className="
                  text-gray-500
                  text-xs
                  font-medium
                "
                >
                  {stat.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      {/* Main Content */}

      <div
        className="
        grid
        grid-cols-1
        xl:grid-cols-3
        gap-6
        mb-8
      "
      >
        {/* Visitor Analytics */}

        <div
          className="
          lg:col-span-2
          bg-white
          rounded-2xl
          p-6
          shadow-sm
          border
          border-gray-100
        "
        >
          <div
            className="
            flex
            justify-between
            items-start
            mb-6
          "
          >
            <div>
              <h3
                className="
                font-bold
                text-gray-900
                font-['Playfair_Display']
                mb-1
              "
              >
                Visitor Analytics
              </h3>

              <p
                className="
                text-xs
                text-gray-500
              "
              >
                Visitors over the last 7 months
              </p>
            </div>

            <div
              className="
              flex
              gap-4
            "
            >
              <div
                className="
                flex
                items-center
                text-xs
                text-gray-600
              "
              >
                <span
                  className="
                  w-2
                  h-2
                  rounded-full
                  bg-[#275949]
                  mr-2
                "
                />
                Locals
              </div>

              <div
                className="
                flex
                items-center
                text-xs
                text-gray-600
              "
              >
                <span
                  className="
                  w-2
                  h-2
                  rounded-full
                  bg-[#D97757]
                  mr-2
                "
                />
                Foreigners
              </div>
            </div>
          </div>

          <div
            className="
            relative
            h-64
            w-full
          "
          >
            <svg viewBox="0 0 800 250" className="w-full h-full">
              <g stroke="#f0f0f0" strokeDasharray="4 4" strokeWidth="1">
                <line x1="40" y1="20" x2="780" y2="20" />
                <line x1="40" y1="70" x2="780" y2="70" />
                <line x1="40" y1="120" x2="780" y2="120" />
                <line x1="40" y1="170" x2="780" y2="170" />
                <line x1="40" y1="220" x2="780" y2="220" />
              </g>

              <g
                className="
                text-[10px]
                fill-gray-400
              "
              >
                <text x="30" y="24" textAnchor="end">
                  30K
                </text>

                <text x="30" y="74" textAnchor="end">
                  24K
                </text>

                <text x="30" y="124" textAnchor="end">
                  18K
                </text>

                <text x="30" y="174" textAnchor="end">
                  12K
                </text>

                <text x="30" y="224" textAnchor="end">
                  6K
                </text>
              </g>

              <g
                className="
                text-[10px]
                fill-gray-400
              "
              >
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"].map(
                  (month, index) => (
                    <text
                      key={month}
                      x={70 + index * 100}
                      y="245"
                      textAnchor="middle"
                    >
                      {month}
                    </text>
                  ),
                )}
              </g>

              <path
                d="
                M 70 170 
                Q 200 160 370 110 
                T 670 40
                "
                fill="none"
                stroke="#275949"
                strokeWidth="2"
                strokeLinecap="round"
              />

              <path
                d="
                M 70 210 
                Q 300 210 470 140 
                T 670 80
                "
                fill="none"
                stroke="#D97757"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Quick Actions */}

        <div
          className="
          bg-white
          rounded-2xl
          p-6
          shadow-sm
          border
          border-gray-100
        "
        >
          <h3
            className="
            font-bold
            text-gray-900
            font-['Playfair_Display']
            mb-6
          "
          >
            Quick Actions
          </h3>

          <div
            className="
            flex
            flex-col
            gap-4
          "
          >
            <Link
              to="/admin/add-place"
              className="
                flex
                items-center
                gap-4
                p-4
                rounded-xl
                border
                border-gray-200
                hover:border-[#275949]
                hover:bg-[#F4F9F8]
              "
            >
              <MdAdd className="text-[#275949]" size={22} />

              <span
                className="
                font-semibold
                text-sm
              "
              >
                Add a New Place
              </span>
            </Link>

            <button
              className="
                flex
                items-center
                gap-4
                p-4
                rounded-xl
                border
                border-gray-200
                hover:border-[#275949]
                hover:bg-[#F4F9F8]
              "
            >
              <MdUpload className="text-[#D97757]" size={22} />

              <span
                className="
                font-semibold
                text-sm
              "
              >
                Upload an Image
              </span>
            </button>

            <Link
              to="/admin/users"
              className="
                flex
                items-center
                gap-4
                p-4
                rounded-xl
                border
                border-gray-200
                hover:border-[#275949]
                hover:bg-[#F4F9F8]
              "
            >
              <MdPersonOutline className="text-blue-500" size={22} />

              <span
                className="
                font-semibold
                text-sm
              "
              >
                Manage Users
              </span>
            </Link>

            <button
              className="
                flex
                items-center
                gap-4
                p-4
                rounded-xl
                border
                border-gray-200
                hover:border-[#275949]
                hover:bg-[#F4F9F8]
              "
            >
              <MdBarChart className="text-indigo-500" size={22} />

              <span
                className="
                font-semibold
                text-sm
              "
              >
                View Analytics
              </span>
            </button>
          </div>
        </div>
      </div>
      {/* Recent Contact Messages */}

      <div
        className="
        bg-white
        rounded-2xl
        p-4
        sm:p-6
        shadow-sm
        border
        border-gray-100
        mb-8
      "
      >
        <div
          className="
          flex
          items-center
          justify-between
          mb-5
        "
        >
          <div>
            <h3
              className="
              font-bold
              text-gray-900
              font-['Playfair_Display']
              mb-1
            "
            >
              Recent Contact Messages
            </h3>

            <p
              className="
              text-xs
              text-gray-500
            "
            >
              Latest messages submitted from public contact page
            </p>
          </div>
        </div>

        <div
          className="
          grid
          grid-cols-1
          lg:grid-cols-3
          gap-4
        "
        >
          {recentMessages.length === 0 ? (
            <p
              className="
                text-sm
                text-gray-500
                lg:col-span-3
              "
            >
              No contact messages yet.
            </p>
          ) : (
            recentMessages.slice(0, 3).map((message) => (
              <div
                key={message.id}
                className="
                      border
                      border-gray-100
                      rounded-xl
                      p-4
                    "
              >
                <div
                  className="
                      flex
                      items-start
                      justify-between
                      gap-3
                      mb-3
                    "
                >
                  <div>
                    <p
                      className="
                          text-sm
                          font-bold
                          text-gray-900
                        "
                    >
                      {message.name}
                    </p>

                    <p
                      className="
                          text-xs
                          text-gray-500
                        "
                    >
                      {message.email}
                    </p>
                  </div>

                  <span
                    className="
                        text-[10px]
                        uppercase
                        font-bold
                        text-[#275949]
                        bg-[#E8F1EF]
                        px-2
                        py-1
                        rounded-md
                      "
                  >
                    {message.status}
                  </span>
                </div>

                <p
                  className="
                      text-sm
                      font-semibold
                      text-gray-800
                      mb-2
                    "
                >
                  {message.subject}
                </p>

                <p
                  className="
                      text-xs
                      text-gray-500
                      line-clamp-3
                    "
                >
                  {message.message}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Provincial Distribution */}

      <div
        className="
        bg-white
        rounded-2xl
        p-4
        sm:p-6
        shadow-sm
        border
        border-gray-100
      "
      >
        <h3
          className="
          font-bold
          text-gray-900
          font-['Playfair_Display']
          mb-6
        "
        >
          Provincial Distribution
        </h3>

        <div
          className="
          relative
          h-64
          w-full
        "
        >
          <svg viewBox="0 0 1000 250" className="w-full h-full">
            <g stroke="#f0f0f0" strokeDasharray="4 4" strokeWidth="1">
              <line x1="40" y1="20" x2="980" y2="20" />
              <line x1="40" y1="70" x2="980" y2="70" />
              <line x1="40" y1="120" x2="980" y2="120" />
              <line x1="40" y1="170" x2="980" y2="170" />
              <line x1="40" y1="220" x2="980" y2="220" />
            </g>

            <g
              className="
              text-[10px]
              fill-gray-400
            "
            >
              <text x="30" y="24" textAnchor="end">
                35
              </text>

              <text x="30" y="74" textAnchor="end">
                30
              </text>

              <text x="30" y="124" textAnchor="end">
                25
              </text>

              <text x="30" y="174" textAnchor="end">
                20
              </text>

              <text x="30" y="224" textAnchor="end">
                0
              </text>
            </g>

            <g>
              {[
                {
                  x: 75,
                  height: 160,
                },
                {
                  x: 175,
                  height: 180,
                },
                {
                  x: 275,
                  height: 150,
                },
                {
                  x: 375,
                  height: 130,
                },
                {
                  x: 475,
                  height: 120,
                },
                {
                  x: 575,
                  height: 135,
                },
                {
                  x: 675,
                  height: 165,
                },
                {
                  x: 775,
                  height: 100,
                },
                {
                  x: 875,
                  height: 160,
                },
              ].map((bar, index) => (
                <rect
                  key={index}
                  x={bar.x}
                  y={220 - bar.height}
                  width="50"
                  height={bar.height}
                  fill={index % 2 === 0 ? "#1E4538" : "#A87F47"}
                  rx="2"
                />
              ))}
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
