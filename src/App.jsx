import { useLayoutEffect, useRef, useState } from "react";
import { Data1 } from "./data";
import { Data2 } from "./data";
import { Data3 } from "./data";
import { Line } from "react-chartjs-2";
import gsap from "gsap";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);

function App() {
  const profileRef = useRef(gsap.timeline({ paused: true }));
  const countTl = useRef(0);
  const [isOpen, setIsOpen] = useState(false);

  const playHandler = () => {
    isOpen ? profileRef.current.play() : profileRef.current.reverse();
    setIsOpen(!isOpen);
  };

  useLayoutEffect(() => {
    if (countTl.current === 0) {
      profileRef.current.to(
        document.querySelector(".profile"),
        0.6,
        {
          "--deep-dive": 1,
          display: "flex",
        },
        0
      );
      countTl.current = 1;
    }
  });

  const [chartData, setChartData] = useState({
    labels: Data1.map((data) => data.hour),
    datasets: [
      {
        label: "cost ",
        data: Data1.map((data) => data.cost),
        borderColor: "#2563eb",
        backgroundColor: "#2563eb",
      },
      {
        label: "benefit ",
        data: Data2.map((data) => data.benefit),
        borderColor: "#dc2626",
        backgroundColor: "#dc2626",
      },
      {
        label: "difference ",
        data: Data3.map((data) => data.difference),
        borderColor: "#16a34a",
        backgroundColor: "#16a34a",
      },
    ],
  });

  return (
    <section className="main-section w-full h-[100vh]  overflow-hidden">
      <header className="header bg-slate-400 flex flex-row items-center px-8 justify-between">
        <div className="flex flex-row items-center gap-5">
          <h1 className="font1 text-[40px] mr-5 cursor-pointer">My Charts</h1>
          <div className="text-[24px] cursor-pointer">Dashboard</div>
          <div className="text-[24px] cursor-pointer">Home</div>
          <div className="text-[24px] cursor-pointer">Products</div>
          <div className="text-[24px] cursor-pointer">About</div>
        </div>
        <div className="p-1 border-[1px] border-white rounded-lg">
          <input
            type="text"
            placeholder="Searh Here..."
            className="p-2 px-4 rounded-lg w-[300px] focus:outline-none font2"
          />
        </div>
      </header>
      <div className="tab-bar bg-slate-100 border-r-[2px] border-gray-200 flex flex-col justify-between py-6 pb-0 relative">
        <div>
          <div className="text-[20px] font-[600] text-slate-500 p-4 border-b-[1px] border-gray-300 text-center cursor-pointer">
            CHARTS
          </div>
          <div className="text-[18px] p-4 border-b-[1px] border-gray-300 text-center cursor-pointer">
            DATA
          </div>

          <div className="text-[18px] p-4 border-b-[1px] border-gray-300 text-center cursor-pointer">
            PURCHASES
          </div>
        </div>
        <div
          onClick={playHandler}
          className="abolute bottom-0 text-[18px] p-4 border-t-[1px] border-gray-300 text-center cursor-pointer font-[600]"
        >
          Profile
        </div>

        <div className="profile absolute left-[300px] bottom-0 w-[350px] h-[120px] bg-slate-400 rounded-r-xl p-2 flex flex-col items-center justify-around">
          <div className="text-center font1 tracking-widest text-[24px]">
            MY USERNAME
          </div>
          <div className="flex flex-row gap-3">
            <div>EXIT</div>
            <img src="/public/exit.svg" className="w-[28px] h-[28px]" />
          </div>
        </div>
      </div>
      <div className="main overflow-auto flex flex-col">
        <div className="flex flex-row justify-between">
          <div className="cost grow h-[150px] gap-2 items-center justify-center border-b-[1px] border-slate-200 flex flex-col ">
            <div>COST</div>
            <div className="w-[120px] h-[8px] bg-blue-600 rounded-full"></div>
          </div>
          <div className="benefit grow h-[150px] flex items-center justify-center border-b-[1px] border-slate-200 border-x-[1px] flex-col gap-2">
            <div>BENEFIT</div>
            <div className="w-[120px] h-[8px] bg-red-600 rounded-full"></div>{" "}
          </div>
          <div className="diffrence grow h-[150px] flex items-center justify-center border-b-[1px] border-slate-200 flex-col gap-2">
            <div>DIFFERENCE</div>
            <div className="w-[120px] h-[8px] bg-green-600 rounded-full"></div>{" "}
          </div>
        </div>
        <div className="chart flex items-center justify-center w-[60%] mx-auto grow">
          <Line
            data={chartData}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: "Statistics",
                },
                legend: {
                  display: false,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default App;
