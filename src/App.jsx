import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { calculateDateDifference } from "./utils/counterSlice";
import { FaEquals, FaSun, FaMoon } from "react-icons/fa";

const App = () => {
  const dayRef = useRef(null);
  const monthRef = useRef(null);
  const yearRef = useRef(null);
  const error = document.getElementById("error");
  const error2 = document.getElementById("error2");
  const error3 = document.getElementById("error3");

  const { years, months, days } = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  const [darkMode, setDarkMode] = useState(false);

  const confirmButton = (e) => {
    e.preventDefault();
    const day = dayRef.current.value;
    const month = monthRef.current.value;
    const year = yearRef.current.value;

    if (
      !day ||
      isNaN(day) ||
      dayRef.current.value > 31 ||
      !month ||
      isNaN(month) ||
      monthRef.current.value > 12 ||
      !year ||
      isNaN(year) ||
      yearRef.current.value > 2024
    ) {
      if (!day || isNaN(day)) dayRef.current.style.border = "2px solid red";
      else if (dayRef.current.value > 31) {
        error.textContent = "Kunni kiritishda xatolik";
        dayRef.current.style.border = "2px solid red";
      }

      if (!month || isNaN(month))
        monthRef.current.style.border = "2px solid red";
      else if (monthRef.current.value > 12) {
        error2.textContent = "Oy ni kiritishda xatolik";
        monthRef.current.style.border = "2px solid red";
      }

      if (!year || isNaN(year)) yearRef.current.style.border = "2px solid red";
      else if (yearRef.current.value > 2024) {
        error3.textContent = "Yilni kiritishda xatolik";
        yearRef.current.style.border = "2px solid red";
      }
      return;
    }

    dispatch(calculateDateDifference({ day, month, year }));
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`container mx-auto h-screen flex items-center ${
        darkMode ? "dark" : ""
      }`}
    >
      <div
        className={` p-[10%] sm:p-[8%] md:p-[6%] lg:p-[4%] xl:p-[2%] justify-center mx-auto h-4/6  w-5/6 sm:w-4/6 2xl:w-3/6 rounded-xl shadow-2xl ${
          darkMode ? "bg-gray-800 text-white" : "bg-white-200"
        }`}
      >
        <div className="flex justify-end mb-4"></div>

        <div className="top h-[20%]">
          <div className="inputs flex h-full gap-[3%]">
            <label className="w-1/4 h-full flex flex-col" htmlFor="day">
              <h1 className="text-xl md:text-lg">Kun</h1>
              <input
                ref={dayRef}
                className="h-full border rounded-lg text-sm font-bold px-[15%] bg-transparent sm:container lg:text-lg xl:text-xl sm:text-sm sm:text-none"
                type="text"
                id="day"
                required
                placeholder="DD"
              />
              <p
                className="absolute top-60 text-semibold text-rose-700"
                id="error"
              ></p>
            </label>
            <label className="w-1/4 h-full flex flex-col" htmlFor="month">
              <h1 className="text-xl">Oy</h1>
              <input
                ref={monthRef}
                className="h-full border rounded-lg text-sm font-bold px-[15%] bg-transparent sm:container lg:text-lg xl:text-xl sm:text-sm sm:text-none"
                type="text"
                id="month"
                required
                placeholder="MM"
              />
              <p
                className="absolute top-60 text-semibold text-rose-700"
                id="error2"
              ></p>
            </label>
            <label className="w-1/4 h-full flex flex-col" htmlFor="year">
              <h1 className="text-xl">Yil</h1>
              <input
                ref={yearRef}
                className="h-full border rounded-lg text-sm font-bold px-[15%] bg-transparent sm:container lg:text-lg xl:text-xl sm:text-sm sm:text-none"
                type="text"
                id="year"
                required
                placeholder="YY"
              />
              <p
                className="absolute top-60 text-semibold text-rose-700"
                id="error3"
              ></p>
            </label>
          </div>
        </div>

        <div className="middle flex flex-row items-center h-[20%]">
          <hr className="my-8 block w-full" />
          <button
            onClick={confirmButton}
            className="flex items-center justify-center bg-orange-600 h-6 w-10 xl:h-24 xl:w-28 sm:h-16 sm:w-20 rounded-3xl px-[3%] py-[3%] cursor-pointer"
          >
            <FaEquals className="text-white" />
          </button>
        </div>

        <div className="bottom flex flex-col gap-[10%] h-1/2">
          <h1 className="text-4xl 2xl:text-6xl font-bold sm:text-4xl xl:text-5xl">
            <span className="text-4xl 2xl:text-7xl font-bold sm:text-4xl xl:text-5xl text-violet-600">
              {years}
            </span>{" "}
            Yosh
          </h1>
          <h1 className="text-4xl 2xl:text-6xl font-bold sm:text-4xl xl:text-5xl">
            <span className="text-4xl 2xl:text-7xl font-bold sm:text-4xl xl:text-5xl text-violet-600">
              {months}
            </span>{" "}
            Oy
          </h1>
          <h1 className="text-4xl 2xl:text-6xl font-bold sm:text-4xl xl:text-5xl">
            <span className="text-4xl 2xl:text-7xl font-bold sm:text-4xl xl:text-5xl text-violet-600">
              {days}
            </span>{" "}
            Kunlar
          </h1>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-300 dark:bg-gray-700"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
