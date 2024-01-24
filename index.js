import fetch from "node-fetch";
import "dotenv/config";
import * as cheerio from "cheerio";

async function Main() {
  let GKM = process.env.GKM;
  let SESSION_ID = process.env.SESSION_ID;
  let REQUEST_VERIFICATION_TOKEN = process.env.REQUEST_VERIFICATION_TOKEN;

  if (!GKM || !SESSION_ID || !REQUEST_VERIFICATION_TOKEN) {
    throw new Error("Please check your .env file");
  }

  if (
    GKM.length < 1 ||
    SESSION_ID.length < 1 ||
    REQUEST_VERIFICATION_TOKEN.length < 1
  ) {
    throw new Error("Please check your env variables");
  }

  const response = await fetch(
    `https://obs.balikesir.edu.tr/oibs/ogrenci/start.aspx?gkm=${GKM}`,
    {
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7",
        "cache-control": "no-cache",
        pragma: "no-cache",
        "sec-ch-ua":
          '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
        "sec-fetch-dest": "iframe",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        cookie: `ASP.NET_SessionId=${SESSION_ID}; __RequestVerificationToken_L29pYnM1=${REQUEST_VERIFICATION_TOKEN}`,
        Referer: `https://obs.balikesir.edu.tr/oibs/ogrenci/start.aspx?gkm=${GKM}`,
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: null,
      method: "GET",
    }
  );

  const html = await response.text();

  const $ = cheerio.load(html);

  let data = [];

  $("#grd_not_listesi tr").each((index, element) => {
    if (index === 0) return true;
    const lessonName = $(element).find("td").eq(2).text().trim();
    const result = $(element).find("td").eq(3).text().trim();
    const vize = $(element).find("td").eq(4).text().trim();
    const average = $(element).find("td").eq(5).text().trim();
    const grade = $(element).find("td").eq(6).text().trim();
    const status = $(element).find("td").eq(7).text().trim();

    if (!lessonName || !result || !vize || !average || !grade || !status) {
      throw new Error(
        "Lesson name or result or vize or average or grade or status is empty"
      );
    }

    let lesson = {
      lessonName: lessonName,
      ResultStatus: result,
      Notes: vize,
      Average: average,
      Grade: grade,
      Status: status,
    };

    data.push(lesson);
  });

  console.table(data);
}

async function Start() {
  try {
    await Main();

    setInterval(async () => {
      await Main();
    }, 30000);

  } catch (error) {
    console.log(error);
  }

}

Start();