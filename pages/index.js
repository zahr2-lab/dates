import Head from "next/head";
import { useEffect, useState } from "react";
import HijrahDate from "hijrah-date";
import { days } from "../public/js/Data";

const categories = [
  { name: "haircut", title: "حلق الشعر" },
  { name: "nailcut", title: "قص الأظافر" }
];

export default function Index() {
  const [data, setData] = useState([]);
  const [todaydata, setTodayData] = useState([]);
  const [year, setYear] = useState();
  const [month, setMonth] = useState();
  const [day, setDay] = useState();

  useEffect(() => {
    var date = new HijrahDate();
    setYear(date.getFullYear());
    setMonth(date.getMonth());
    setDay(date.getDate());
    setData(days);
  }, []);
  useEffect(() => {
    setTodayData(data.filter((item) => item.day === day));
  }, [day]);
  return (
    <>
      <Head>
        <title>مستحبات ومواقيت</title>
      </Head>
      <div className="app">
        <h1 className="h1">مستحبات ومواقيت</h1>
        <div className="date">
          <span>التاريخ الهجري : </span>
          <span>{year + "/" + month + "/" + day}</span>
        </div>
        <div className="categories">
          {categories.map((category, i) => (
            <div key={i} className="category">
              {category.title}
              {category.name === "haircut" && (
                <div>
                  {todaydata[0] && todaydata[0].haircutdetails}:{" "}
                  {todaydata[0] && todaydata[0].status ? "جيدة" : "سيئة"} بنسبة{" "}
                  {todaydata[0] && todaydata[0].haircutprob}
                  {"%"}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          text-decoration: unset;
          outline: none;
          -webkit-tap-highlight-color: transparent;
          font-family: sans-serif;
          -ms-scroll-chaining: none;
          overscroll-behavior: contain;
          -ms-overflow-style: none;
          scrollbar-width: none;
          direction: rtl;
        }

        *::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <style jsx>{`
        .app {
          width: 100vw;
          overflow: auto;
          position: relative;
          background: #ffe;
          height: 100%;
        }
        .h1 {
          font-size: 2rem;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #499;
          color: white;
          border-bottom: 1px solid #aaa;
        }
        .date {
          font-size: 1rem;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #777;
          border-bottom: 1px solid #aaa;
        }
        .categories {
          padding: 1rem;
          font-size: 1.2rem;
          color: #555;
        }
        .category {
          padding: 1rem;
          border: 1px solid #aaa;
          margin-bottom: 0.5rem;
          border-radius: 0.5rem;
          background: #bee;
        }
      `}</style>
    </>
  );
}
