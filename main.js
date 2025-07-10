const signPageUrl = "https://www.hifiti.com/sg_sign.htm";
const responseSuccessCode = "0";

function generateBaseHeaders(cookie) {
  return {
    Cookie: cookie,
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
  };
}

function checkIn(cookies) {
  const pmsgPefix = "账号";

  const promises = cookies.split(",").map((cookie, index) => {
    return fetch(signPageUrl, {
      method: "POST",
      headers: {
        ...generateBaseHeaders(cookie),
        // necessary for POST XMLHttpRequest
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "X-Requested-With": "XMLHttpRequest",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((resJson) => {
        if (resJson.code === responseSuccessCode) {
          console.log(pmsgPefix + (index + 1) + ": " + resJson.message);
        } else {
          if (resJson.message === "今天已经签过啦！") {
            console.log(pmsgPefix + (index + 1) + ": " + resJson.message);
            return;
          }
          throw new Error(pmsgPefix + (index + 1) + ": " + resJson.message);
        }
      })
      .catch((err) => {
        console.error("错误:", err.message);
      });
  });

  return promises;
}

async function main() {
  let cookies;
  if (process.env.COOKIES) {
    cookies = process.env.COOKIES;
  } else {
    console.log("COOKIE NOT FOUND");
    process.exit(1);
  }

  console.log("开始执行签到任务...");
  const allPromises = checkIn(cookies);

  await Promise.allSettled(allPromises);

  console.log("所有签到任务执行完毕。");
}

main();
