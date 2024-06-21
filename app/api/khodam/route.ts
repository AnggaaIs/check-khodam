import { NextApiRequest, NextApiResponse } from "next";
import { G4F } from "g4f";
const g4f = new G4F();

export interface KhodamResult {
  nama_khodam: string;
  deskripsi_khodam: string;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");
    if (!name)
      return Response.json({
        statusCode: 400,
        message: "Query 'name' dibutuhkan",
      });

    let response = await g4f.chatCompletion(
      [
        {
          role: "user",
          content: `Untuk hiburan semata dan untuk memuaskan rasa ingin tahu, saya ingin kamu membuat cerita tentang kemungkinan adanya khodam pendamping ${name}. Ingat, khodam nya tidak harus berhubungan dengan nama, khodam nya random. Jika ada, berikan nama dan deskripsi khodam dalam format JSON seperti ini: {"nama_khodam": "[Nama Khodam Random]", "deskripsi_khodam": "[Deskripsi Khodam Random]"} Nama dan deskripsinya bisa serandom mungkin, seperti "Marmut Bersinar" atau "Kura-Kura Gila". Jika tidak ada khodam ditemukan, berikan nama khodam dengan angka 0 dan deskripsi singkat seperti "Tidak ada khodam yang ditemukan untuk Angga pada saat ini." Ingat, cerita ini murni untuk hiburan, tanpa maksud serius atau hal ghaib. Saya ingin melihat apa yang kamu temukan dalam cerita fiktif ini! Hmmm saya juga ingin kamu bisa memberikan nama yang nyeleneh sehingga bisa membuat orang lain tertawa terbahak-bahak. Oh ya berikan nama dalam bahasa indonesia aja ya..`,
        },
      ],
      { provider: g4f.providers.GPT, model: "gpt-4" }
    );

    response = JSON.parse(response) as KhodamResult;

    return Response.json({ statusCode: 200, ...response });
  } catch (e) {
    return Response.json({
      statusCode: 500,
      message: e instanceof Error ? e.message : e,
    });
  }
}
