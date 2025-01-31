"use client"

import Image from "next/image";
import styles from "./page.module.css";
import Form from 'next/form'

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
  const [submitData, setSubmitData] = useState<Travel>({
    adults: 0,
    children: 0,
    children_no_bed: 0,
    babies: 0,
    room_type: RoomType.EENPERSOONS,
    non_eu_travelers: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://dgwk8ss4ks8oskocogg0wc88.91.107.213.90.sslip.io/");
        const json = await response.json();
        setData(json);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [])

  const createTravel = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("http://dgwk8ss4ks8oskocogg0wc88.91.107.213.90.sslip.io/", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(submitData)
    }
    );
    setSubmitData({
      adults: 0,
      children: 0,
      children_no_bed: 0,
      babies: 0,
      room_type: RoomType.EENPERSOONS,
      non_eu_travelers: 0
    });
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
          <Form action="">
            <div className={styles.FormInput}>
              <label htmlFor="room_type">Room Type:</label>
              <select id="room_type" name="room_type">
                {Object.keys(RoomType).filter((v) => isNaN(Number(v))).map((k, index) => <option key={index} value={k} onChange={() => setSubmitData({...submitData, room_type: RoomType[k as keyof typeof RoomType]})}>{k}</option>)}
              </select>
            </div>
            <div className={styles.FormInput}>
              <label htmlFor="adults">Adults:</label>
              <input type="number" id="adults" value={submitData.adults} onChange={(e) => setSubmitData({ ...submitData, adults: Number(e.target.value) })} />
            </div>
            <div className={styles.FormInput}>
              <label htmlFor="children">Children:</label>
              <input type="number" id="children" value={submitData.children} onChange={(e) => setSubmitData({ ...submitData, children: Number(e.target.value) })} />
            </div>
            <div className={styles.FormInput}>
              <label htmlFor="babies">Babies:</label>
              <input type="number" id="babies" value={submitData.babies} onChange={(e) => setSubmitData({ ...submitData, babies: Number(e.target.value) })} />
            </div>
            <div className={styles.FormInput}>
              <label htmlFor="children_no_bed">Children no bed:</label>
              <input type="number" id="children_no_bed" value={submitData.children_no_bed} onChange={(e) => setSubmitData({ ...submitData, children_no_bed: Number(e.target.value) })} />
            </div>
            <div className={styles.FormInput}>
              <label htmlFor="non_eu_travelers">Non eu Travelers:</label>
              <input type="number" id="non_eu_travelers" value={submitData.non_eu_travelers} onChange={(e) => setSubmitData({ ...submitData, non_eu_travelers: Number(e.target.value) })} />
            </div>
          </Form>
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
              Create Travel
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
