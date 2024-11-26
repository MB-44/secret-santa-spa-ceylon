"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./step05.module.css";

const STEP05: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [groupName, setGroupName] = useState<string>("");
  const [members, setMembers] = useState<string[]>([]);

  const [day, setDay] = useState<string>("Day");
  const [month, setMonth] = useState<string>("Month");
  const [year, setYear] = useState<string>("Year");

  const [validDays, setValidDays] = useState<number[]>([]);
  const [validMonths, setValidMonths] = useState<string[]>([]);
  const [validYears, setValidYears] = useState<number[]>([]);

  useEffect(() => {
    const groupNameQuery = searchParams.get("groupName");
    const membersQuery = searchParams.get("members");

    if (groupNameQuery) {
      setGroupName(decodeURIComponent(groupNameQuery));
    }

    if (membersQuery) {
      setMembers(JSON.parse(decodeURIComponent(membersQuery)));
    }
  }, [searchParams]);


  useEffect(() => {
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];

    const futureYears = Array.from({ length: 21 }, (_, i) => currentYear + i);
    setValidYears(futureYears);

    const futureMonths = year === String(currentYear)
        ? months.slice(currentMonth)
        : months;
    setValidMonths(futureMonths);

    const daysInMonth = new Date(Number(year), months.indexOf(month) + 1, 0).getDate();
    const futureDays =
      year === String(currentYear) && months.indexOf(month) === currentMonth
        ? Array.from({ length: daysInMonth - currentDay }, (_, i) => currentDay + i + 1)
        : Array.from({ length: daysInMonth }, (_, i) => i + 1);
    setValidDays(futureDays);
  }, [day, month, year]);

  const handleDate = () => {
    if (day === "Day" || month === "Month" || year === "Year") {
      alert("Please select a valid date.");
      return;
    }

    const selectedDate = new Date(`${month} ${day}, ${year}`);

    if (selectedDate <= new Date()) {
      alert("Please select a future date.");
      return;
    }

    router.push(
      `/step06?groupName=${encodeURIComponent(groupName)}&selectedDate=${encodeURIComponent(selectedDate)}&members=${encodeURIComponent(JSON.stringify(members))}`);
    // router.push(`/step06?selectedDate=${encodeURIComponent(`${day}-${month}-${year}`)}`); // Navigate to the next step
  };

  const handleBack = () => {
    router.back();
  };


  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>When are you going to celebrate?</h2>

        <div className={styles.datePicker}>
          
          <div className={styles.dropdown}>
            <button className={styles.dropdownButton}>{day}</button>
            <div className={styles.dropdownContent}>
              {validDays.map((d) => (
                <div
                  key={d}
                  className={styles.dropdownItem}
                  onClick={() => setDay(String(d))}
                >
                  {d}
                </div>
              ))}
            </div>
          </div>

        
          <div className={styles.dropdown}>
            <button className={styles.dropdownButton}>{month}</button>
            <div className={styles.dropdownContent}>
              {validMonths.map((m) => (
                <div
                  key={m}
                  className={styles.dropdownItem}
                  onClick={() => setMonth(m)}
                >
                  {m}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.dropdown}>
            <button className={styles.dropdownButton}>{year}</button>
            <div className={styles.dropdownContent}>
              {validYears.map((y) => (
                <div
                  key={y}
                  className={styles.dropdownItem}
                  onClick={() => setYear(String(y))}
                >
                  {y}
                </div>
              ))}
            </div>
          </div>
        </div>
        
      <div className={styles.actions}>
        <button className={styles.backButton} onClick={handleBack}>
          Back
        </button>
        <button className={styles.continueButton} onClick={handleDate}>
          Continue
        </button>
      </div>
    </div>
    </div>
  );
};

export default STEP05;
