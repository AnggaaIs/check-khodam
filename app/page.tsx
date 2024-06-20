"use client";
import { useEffect, useState } from "react";
import { Toast } from "flowbite-react";
import { HiExclamation } from "react-icons/hi";
import { Skeleton } from "@/app/components/Skeleton";

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
      const req = await fetch(`http://localhost:3000/api/khodam?name=${nama}`);
      const data = await req.json();

      if (data.statusCode === 500) {
        setLoading(false);
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
    fetch("http://localhost:3000/api/quote").then((d) =>
      d.json().then((q) => {
        setQuotes(q.quote);
        setQuotesLoading(false);
      })
    );
  }, [quotes]);

  return (
    <div className="flex flex-col gap-4 items-center justify-center h-[100vh] bg-blue-100">
      <Toast className="border border-orange-600">
        <div className="flex items-start container p-2">
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-800 dark:text-orange-200">
            <HiExclamation className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">
            {quotesLoading ? <Skeleton /> : quotes}
          </div>
          {quotesLoading ? "" : <Toast.Toggle />}
        </div>
      </Toast>
      <div className="card w-96 bg-white bg-opacity-80 shadow-lg rounded-lg p-6 mb-4 border-2 border-blue-800">
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
              <div className="card-actions justify-center">
                <button
                  className="btn btn-outline btn-info btn-md mt-4 rounded-md"
                  onClick={async () => await checkKodam()}
                >
                  <span
                    className={
                      isLoading
                        ? "loading loading-dots"
                        : "text-center justify-center"
                    }
                  >
                    {isLoading ? "" : "Check"}
                  </span>
                </button>
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
              <button
                className="btn btn-md btn-secondary rounded-md btn-outline mt-4 hover:bg-blue-500"
                onClick={() => {
                  setInputError("");
                  setNama("");
                  setKhodamData(null);
                }}
              >
                Back
              </button>
            </div>
          )}
        </div>
      </div>
      <p className="text-gray-500">Made by AnggaaIs for everyone</p>
    </div>
  );
}
