"use client"

import Image from "next/image";
import styles from "./page.module.css";

import { useState, useEffect } from "react";

enum RoomType {
  "EENPERSOONS",
  "TWEEPERSOONS",
  "DRIEPERSOONS",
  "VIERPERSOONS"
}

type Travel = {
  adults: number,
  children: number,
  children_no_bed: number,
  babies: number,
  room_type: RoomType,
  non_eu_travelers: number
}

export default function Home() {
  const [data, setData] = useState<Travel[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://ut-mz6c.onrender.com/");
        const json = await response.json();
        setData(json);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [data])

  const createTravel = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    await fetch("https://ut-mz6c.onrender.com/", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        adults: 1,
        babies: 1,
        children: 1,
        children_no_bed: 0,
        non_eu_travelers: 0,
        room_type: RoomType.EENPERSOONS
      } as Travel)
    }
    );
  }

  return (
    <>
      <div className={styles.page}>
        <main className={styles.main}>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <ol>
            {data?.map((t, index) => {
              return <li key={index}>Room of type {t.room_type} with {t.adults} adults, {t.babies} babies, {t.children} children and {t.children_no_bed} without a bed, {t.non_eu_travelers} non eu travelers.</li>
            })}
          </ol>

          <div className={styles.ctas}>
            <a
              className={styles.primary}
              href="#"
              onClick={createTravel}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className={styles.logo}
                src="/vercel.svg"
                alt="Vercel logomark"
                width={20}
                height={20}
              />
              Deploy now
            </a>
            <a
              href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondary}
            >
              Read our docs
            </a>
          </div>
        </main>
        <footer className={styles.footer}>
          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/file.svg"
              alt="File icon"
              width={16}
              height={16}
            />
            Learn
          </a>
          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/window.svg"
              alt="Window icon"
              width={16}
              height={16}
            />
            Examples
          </a>
          <a
            href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/globe.svg"
              alt="Globe icon"
              width={16}
              height={16}
            />
            Go to nextjs.org →
          </a>
        </footer>
      </div>
    </>
  );
}
