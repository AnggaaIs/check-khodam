"use client";

import { useEffect, useState } from "react";
import { HiExclamation } from "react-icons/hi";
import { Skeleton } from "@/app/components/Skeleton";
import Button from "./components/Button";

const baseAPI =
  process.env.NODE_ENV === "production"
    ? "https://check-khodam-seven.vercel.app"
    : "http://localhost:3000";

export default function Home() {
  const [isLoading, setLoading] = useState(false);
  const [nama, setNama] = useState("");
  const [khodamData, setKhodamData] = useState(null) as any;
  const [inputError, setInputError] = useState("");
  const [quotes, setQuotes] = useState("");
  const [quotesLoading, setQuotesLoading] = useState(true);

  const checkKodam = async () => {
    if (!nama) {
      setInputError("Masukkan nama kamu!");
      return;
    }

    setLoading(true);

    try {
      const req = await fetch(`${baseAPI}/api/khodam?name=${nama}`);
      const data = await req.json();

      if (data.statusCode === 500) {
        setLoading(false);
        setInputError("Khodam tidak ada!");
        return;
      }

      if (String(data.nama_khodam) === "0") {
        setInputError("Khodam tidak ada!");
        return;
      }
      setKhodamData(data);
    } catch (error) {
      setInputError("Khodam tidak ada!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function getQuotes() {
      let fetchdata = await fetch(`${baseAPI}/api/quote`, {
        cache: "no-store",
      });
      let data = await fetchdata.json();
      if (data.statusCode === 500) return getQuotes();
      setQuotes(data.quote);
      setQuotesLoading(false);
    }
    getQuotes();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-[100vh] bg-blue-100">
      <div className="max-w-7xl w-full flex items-center justify-center">
        <div className="space-y-6 py-10">
          <div className="bg-white px-5 py-3 rounded-lg w-96 gap-2 flex justify-around">
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-200/70 text-orange-400">
              <HiExclamation className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal text-gray-500">
              {quotesLoading ? <Skeleton /> : quotes}
            </div>
          </div>

          <div className="card max-w-96 bg-white rounded-lg py-6">
            <div className="card-body">
              <h1 className="card-title text-center text-2xl font-semibold mb-4 justify-center">
                {khodamData ? `Khodam ${nama}` : "Check Khodam Kamu"}
              </h1>
              {!khodamData ? (
                <>
                  <input
                    type="text"
                    placeholder="Masukkan nama kamu"
                    className={`input input-bordered w-full max-w-xs rounded-md ${
                      inputError ? "input-error" : ""
                    }`}
                    onChange={(e) => {
                      setNama(e.target.value);
                      setInputError("");
                    }}
                    disabled={isLoading}
                  />
                  {inputError && (
                    <p className="text-red-500 text-sm">{inputError}</p>
                  )}
                  <div className="card-actions justify-center mt-5">
                    <Button onClick={checkKodam}>
                      <span
                        className={
                          isLoading
                            ? "loading loading-dots text-center justify-center"
                            : "text-center justify-center"
                        }
                      >
                        {isLoading ? "" : "Check Khodam"}
                      </span>
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <h3 className="card-title text-lg font-semibold text-blue-500">
                    {khodamData.nama_khodam}
                  </h3>
                  <p className="text-gray-600 text-left">
                    {khodamData.deskripsi_khodam}
                  </p>
                  <Button
                    className="mt-5"
                    onClick={() => {
                      setInputError("");
                      setNama("");
                      setKhodamData(null);
                    }}
                  >
                    Back
                  </Button>
                </div>
              )}
            </div>
          </div>
          <p className="text-gray-500 text-center">
            Made by{" "}
            <a
              href="https://github.com/LazyyPeople"
              target="_blank"
              className="text-blue-500"
            >
              LazyPeople{" "}
            </a>
            for everyone
          </p>
        </div>
      </div>
    </div>
  );
}
