import { G4F } from "g4f";
import moment from "moment-timezone";
const g4f = new G4F();
moment.tz.setDefault("Asia/Jakarta");

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    let response = await g4f.chatCompletion(
      [
        {
          role: "user",
          content: `Hei, buat aku sebuah quotes dalam format JSON. Topiknya bebas, bisa tentang cinta, motivasi, kehidupan, atau apapun yang menarik. Gaya bahasanya santai aja, kayak ngobrol sama temen, hindari bahasa baku dan kalimat yang ribet, hindari juga bahasa inggris utamakan bahasa indonesia.\nFormat JSONnya kayak gini: {"quotes": "Masukan quotes di sini"}\nKalau butuh inspirasi, bisa cek buku, film, lagu, atau media sosial. Pastikan quotesnya original ya, jangan jiplak punya orang lain!`,
        },
      ],
      { provider: g4f.providers.GPT, model: "gpt-4" }
    );

    response = JSON.parse(response);

    return Response.json({
      statusCode: 200,
      date: new Date(),
      quote: response.quotes,
    });
  } catch (e) {
    return Response.json({
      statusCode: 500,
      message: e instanceof Error ? e.message : e,
    });
  }
}
