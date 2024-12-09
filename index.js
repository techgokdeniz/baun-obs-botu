import fetch from "node-fetch";
import "dotenv/config";
import * as cheerio from "cheerio";

async function Main() {
  const SESSION_ID = process.env.SESSION_ID;
  const REQUEST_VERIFICATION_TOKEN = process.env.REQUEST_VERIFICATION_TOKEN;

  if (!SESSION_ID || !REQUEST_VERIFICATION_TOKEN) {
    throw new Error("Please check your .env file");
  }

  const response = await fetch(
    "https://obs.balikesir.edu.tr/oibs/std/not_listesi_op.aspx",
    {
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7",
        cookie:
      `__RequestVerificationToken_L29pYnM1=${REQUEST_VERIFICATION_TOKEN}; ASP.NET_SessionId=${SESSION_ID}`,
        priority: "u=0, i",
        referer: "https://obs.balikesir.edu.tr/oibs/std/index.aspx?curOp=0",
        "sec-ch-ua":
          '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "iframe",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
      },
    }
  );

  const html = await response.text();
  const $ = cheerio.load(html);

  const data = [];

  $("#grd_not_listesi tr").each((index, element) => {
    if (index === 0) return;

    const subeKod = $(element).find("td").eq(0).text().trim();
    const dersKodu = $(element).find("td").eq(1).text().trim();
    const dersAdi = $(element).find("td").eq(2).text().trim();
    const durum = $(element).find("td").eq(3).text().trim();
    const sinavNotlari = $(element).find("td").eq(4).text().trim();
    const ortalama = $(element).find("td").eq(5).text().trim();
    const harfNotu = $(element).find("td").eq(6).text().trim();
    const gecmeDurumu = $(element).find("td").eq(7).text().trim();

    if (dersAdi) {
      data.push({
        subeKod,
        dersKodu,
        dersAdi,
        durum,
        sinavNotlari,
        ortalama,
        harfNotu,
        gecmeDurumu,
      });
    }
  });

  console.table(data);
  return data;
}

async function Start() {
  try {
    await Main();

    setInterval(async () => {
      await Main();
    }, 30000);
  } catch (error) {
    console.error(error);
  }
}

Start();
