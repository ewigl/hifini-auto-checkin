const signPageUrl = "https://www.hifini.com/sg_sign.htm";

const responseSuccessCode = "0";

function generateBaseHeaders(cookie) {
  return {
    Cookie: cookie,
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
  };
}

async function getSign(cookie) {
  const response = await fetch(signPageUrl, {
    headers: generateBaseHeaders(cookie),
  });
  const resText = await response.text();

  const re = /var sign\s*=\s*"([^"]+)"/;
  const result = re.exec(resText);

  if (!result) {
    throw new Error("Cookie 配置有误, 提取 Sign 失败.");
  }

  const sign = re.exec(resText)[1];

  return sign;
}

function checkIn(cookie, sign) {
  fetch(signPageUrl, {
    method: "POST",
    headers: {
      ...generateBaseHeaders(cookie),
      // necessary for POST XMLHttpRequest
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "X-Requested-With": "XMLHttpRequest",
    },
    body: `sign=${sign}`,
  })
    .then((res) => res.json())
    .then((resJson) => {
      if (resJson.code === responseSuccessCode) {
        console.log(resJson.message);
      } else {
        if (resJson.message === "今天已经签过啦！") {
          console.log(resJson.message);
          return;
        }
        throw new Error(resJson.message);
      }
    });
}

async function main() {
  let cookie;
  if (process.env.COOKIE) {
    cookie = process.env.COOKIE;
  } else {
    console.log("COOKIE NOT FOUND");
    process.exit(1);
  }

  let sign = await getSign(cookie);

  checkIn(cookie, sign);
}

main();
