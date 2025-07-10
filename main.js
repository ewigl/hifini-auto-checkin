const signPageUrl = "https://www.hifiti.com/sg_sign.htm";

const responseSuccessCode = "0";

function generateBaseHeaders(cookie) {
  return {
    Cookie: cookie,
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
  };
}

function checkIn(cookie) {
  fetch(signPageUrl, {
    method: "POST",
    headers: {
      ...generateBaseHeaders(cookie),
      // necessary for POST XMLHttpRequest
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "X-Requested-With": "XMLHttpRequest",
    },
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

  checkIn(cookie);
}

main();
