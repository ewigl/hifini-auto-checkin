const signPageUrl = "https://www.hifini.com/sg_sign.htm";

const responseSuccessCode = "0";

function generateBaseHeaders(cookie) {
  return {
    Cookie: cookie,
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
  };
}

function getSign() {
  if (!process.env.SIGN) {
    console.log("SIGN NOT FOUND");
    process.exit(1);
  }
  return process.env.SIGN;
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
        // console.log("签到成功");
        console.log(resJson.message);
        //
      } else {
        // console.log("签到失败");
        console.log(resJson.message);
        //
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

  let sign = getSign(cookie);

  checkIn(cookie, sign);
}

main();
