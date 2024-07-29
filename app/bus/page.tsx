"use client";
import React, { useEffect, useState } from "react";

const busSchedules = {
  Casa: {
    toPorto: [
      "07:56",
      "09:04",
      "10:24",
      "11:44",
      "13:04",
      "14:24",
      "15:44",
      "17:04",
      "18:24",
      "19:44", // Desde Casa a Porto
    ],
    toOlbia: [
      "08:16",
      "09:36",
      "10:56",
      "12:16",
      "13:36",
      "14:56",
      "16:16",
      "17:36",
      "18:56",
      "20:17", // Casa a Olbia
    ],
  },
  Porto: {
    toCasa: [
      "08:11",
      "09:31",
      "10:51",
      "12:11",
      "13:31",
      "14:51",
      "16:11",
      "17:31",
      "18:51",
      "20:11", // De Porto a Casa
    ],
  },
  Super: {
    toCasa: [
      "07:42",
      "08:50",
      "10:10",
      "11:30",
      "12:50",
      "14:10",
      "15:30",
      "16:50",
      "18:14",
      "19:30", // Super a Casa
    ],
  },
  Gimnasio: {
    toCasa: [
      "07:36",
      "08:44",
      "09:54",
      "11:24",
      "12:54",
      "13:54",
      "15:24",
      "16:44",
      "17:54",
      "19:24", // Gimnasio a Casa
    ],
  },
};

const Schedule = () => {
  const [activeTab, setActiveTab] = useState<"Casa" | "Porto" | "Super" | "Gimnasio">("Casa");
  const [nextBusPorto, setNextBusPorto] = useState<string | null>(null);
  const [nextBusOlbia, setNextBusOlbia] = useState<string | null>(null);
  const [nextBusCasa, setNextBusCasa] = useState<string | null>(null);
  const [countdownPorto, setCountdownPorto] = useState<number>(0);
  const [countdownOlbia, setCountdownOlbia] = useState<number>(0);
  const [countdownCasa, setCountdownCasa] = useState<number>(0);

  const getActiveSchedule = () => {
    switch (activeTab) {
      case "Casa":
        return [...busSchedules.Casa.toPorto, ...busSchedules.Casa.toOlbia];
      case "Porto":
        return [...busSchedules.Porto.toCasa];
      case "Super":
        return [...busSchedules.Super.toCasa];
      case "Gimnasio":
        return [...busSchedules.Gimnasio.toCasa];
      default:
        return [];
    }
  };

  const hasTimePassed = (time: string) => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    const [hours, minutes] = time.split(":").map(Number);
    const busTime = hours * 60 + minutes;
    return busTime <= currentTime;
  };

  const getNextBus = (schedule: string[], currentTime: number) => {
    const upcomingBuses = schedule
      .map((time) => {
        const [hours, minutes] = time.split(":").map(Number);
        const busTime = hours * 60 + minutes;
        return { time, busTime };
      })
      .filter((bus) => bus.busTime > currentTime);

    if (upcomingBuses.length > 0) {
      return upcomingBuses[0];
    } else {
      const [hours, minutes] = schedule[0].split(":").map(Number);
      const nextDayBusTime = (24 * 60) + (hours * 60 + minutes);
      return { time: schedule[0], busTime: nextDayBusTime };
    }
  };

  useEffect(() => {
    const updateNextBus = () => {
      const now = new Date();
      const currentTime = now.getHours() * 60 + now.getMinutes(); // En minutos

      if (activeTab === "Casa") {
        const portoSchedule = busSchedules.Casa.toPorto;
        const olbiaSchedule = busSchedules.Casa.toOlbia;

        const nextPortoBus = getNextBus(portoSchedule, currentTime);
        const nextOlbiaBus = getNextBus(olbiaSchedule, currentTime);

        setNextBusPorto(nextPortoBus.time);
        setCountdownPorto((nextPortoBus.busTime - currentTime) * 60); // En segundos

        setNextBusOlbia(nextOlbiaBus.time);
        setCountdownOlbia((nextOlbiaBus.busTime - currentTime) * 60); // En segundos

      } else if (activeTab === "Porto") {
        const schedule = busSchedules.Porto.toCasa;
        const nextBus = getNextBus(schedule, currentTime);
        setNextBusCasa(nextBus.time);
        setCountdownCasa((nextBus.busTime - currentTime) * 60); // En segundos
      } else if (activeTab === "Super") {
        const schedule = busSchedules.Super.toCasa;
        const nextBus = getNextBus(schedule, currentTime);
        setNextBusCasa(nextBus.time);
        setCountdownCasa((nextBus.busTime - currentTime) * 60); // En segundos
      } else if (activeTab === "Gimnasio") {
        const schedule = busSchedules.Gimnasio.toCasa;
        const nextBus = getNextBus(schedule, currentTime);
        setNextBusCasa(nextBus.time);
        setCountdownCasa((nextBus.busTime - currentTime) * 60); // En segundos
      }
    };

    updateNextBus();
    const intervalId = setInterval(() => {
      setCountdownPorto((prev) => (prev > 0 ? prev - 1 : 0));
      setCountdownOlbia((prev) => (prev > 0 ? prev - 1 : 0));
      setCountdownCasa((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [activeTab]);

  const renderContent = () => {
    const schedule = getActiveSchedule();
    return (
      <div className="flex flex-col px-10 mt-5">
        {activeTab === "Casa" && (
          <>
            {nextBusPorto && (
              <div className="font-bold mb-2">
                Próximo bus de Casa a Porto:{" "}
                <div className="flex items-center gap-5 justify-center">
                  <p className="font-bold text-blue-600 text-4xl my-2 bg-blue-200 p-2 rounded-md">
                    {nextBusPorto}
                  </p>{" "}
                  ({Math.floor(countdownPorto / 60)}:
                  {String(countdownPorto % 60).padStart(2, "0")} minutos restantes)
                </div>
                <p className="my-2">Horarios:</p>
                <div className="flex gap-3 justify-start flex-wrap ">
                  {busSchedules.Casa.toPorto.map((time, index) => (
                    <p
                      className={`w-1/6 text-center p-1 rounded-full  text-white bg-gray-600 ${!hasTimePassed(time) && "bg-red-300"} `}
                      key={index}
                    >
                      {time}
                    </p>
                  ))}
                </div>
              </div>
            )}
            {nextBusOlbia && (
              <div className="font-bold mb-2 ">
                Próximo bus de Casa a Olbia:{" "}
                <div className="flex items-center gap-5 justify-center">
                  <p className="font-bold text-green-600 text-4xl my-2 bg-green-200 p-2 rounded-md">
                    {nextBusOlbia}
                  </p>{" "}
                  ({Math.floor(countdownOlbia / 60)}:
                  {String(countdownOlbia % 60).padStart(2, "0")} minutos restantes)
                </div>
                <p className="my-2">Horarios:</p>
                <div className="flex gap-3 justify-start flex-wrap ">
                  {busSchedules.Casa.toOlbia.map((time, index) => (
                    <p
                      className={`w-1/6 text-center p-1 rounded-full text-white bg-gray-600 ${!hasTimePassed(time) && "bg-red-300"} `}
                      key={index}
                    >
                      {time}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
        {(activeTab === "Porto" ||
          activeTab === "Super" ||
          activeTab === "Gimnasio") &&
          nextBusCasa && (
            <div className="font-bold mb-2  ">
              Próximo bus de {activeTab} a Casa:{" "}
              <div className="flex items-center gap-5 justify-center">
                <p className="font-bold text-gray-600 text-4xl my-2 bg-gray-200 p-2 rounded-md">
                  {nextBusCasa}{" "}
                </p>{" "}
                ({Math.floor(countdownCasa / 60)}:
                {String(countdownCasa % 60).padStart(2, "0")} minutos restantes)
              </div>
            </div>
          )}
        {activeTab !== "Casa" && (
          <div>
            <p className="my-2 font-bold">Horarios:</p>
            <div className="flex gap-3 justify-start flex-wrap ">
              {schedule.map((time, index) => (
                <p
                  className={`w-1/6 text-center p-1 rounded-full text-white  bg-gray-600 ${!hasTimePassed(time) && "bg-red-300"} `}
                  key={index}
                >
                  {time}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <p className="flex flex-row font-bold text-2xl mt-5 justify-center items-center mb-2">
        ¿Dónde estás?
      </p>
      <div className="flex flex-row justify-around items-center bg-red-100 w-5/6 m-auto h-12 rounded-full">
        <div
          className={`flex flex-row py-2 ml-2 w-1/4 text-center justify-center items-center rounded-full cursor-pointer ${
            activeTab === "Casa" ? "bg-white text-black" : ""
          }`}
          onClick={() => setActiveTab("Casa")}
        >
          Casa
        </div>
        <div
          className={`flex flex-row py-2 ml-2 w-1/4 text-center justify-center items-center rounded-full cursor-pointer ${
            activeTab === "Porto" ? "bg-white text-black" : ""
          }`}
          onClick={() => setActiveTab("Porto")}
        >
          Porto
        </div>
        <div
          className={`flex flex-row py-2 ml-2 w-1/4 text-center justify-center items-center rounded-full cursor-pointer ${
            activeTab === "Super" ? "bg-white text-black" : ""
          }`}
          onClick={() => setActiveTab("Super")}
        >
          Super
        </div>
        <div
          className={`flex flex-row py-2 mr-2 w-1/4 text-center justify-center items-center rounded-full cursor-pointer ${
            activeTab === "Gimnasio" ? "bg-white text-black" : ""
          }`}
          onClick={() => setActiveTab("Gimnasio")}
        >
          Gimnasio
        </div>
      </div>
     {renderContent()}
    </div>
  );
};

export default Schedule;
