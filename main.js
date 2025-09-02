const signPageUrl = "https://www.hifiti.com/sg_sign.htm";
const responseSuccessCode = "0";

async function checkIn(account) {
  console.log(`【${account.name}】: 开始签到...`);

  const response = await fetch(signPageUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "X-Requested-With": "XMLHttpRequest",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
      Cookie: account.cookie,
    },
  });

  if (!response.ok) {
    throw new Error(`网络请求出错 - ${response.status}`);
  }

  const responseJson = await response.json();

  if (responseJson.code === responseSuccessCode) {
    console.log(`【${account.name}】: 签到成功。`);
    return responseJson.message;
  } else {
    if (responseJson.message === "今天已经签过啦！") {
      console.log(`【${account.name}】: ${responseJson.message}`);
      return responseJson.message;
    }
    throw new Error(`签到失败: ${responseJson.message}`);
  }
}

// 处理
async function processSingleAccount(account) {
  const checkInResult = await checkIn(account);

  return checkInResult;
}

async function main() {
  let accounts;

  if (process.env.ACCOUNTS) {
    try {
      accounts = JSON.parse(process.env.ACCOUNTS);
    } catch (error) {
      console.log("❌ 账户信息配置格式错误。");
      process.exit(1);
    }
  } else {
    console.log("❌ 未配置账户信息。");
    process.exit(1);
  }

  const allPromises = accounts.map((account) => processSingleAccount(account));
  const results = await Promise.allSettled(allPromises);

  console.log(`\n======== 签到结果 ========\n`);
  let hasError = false;

  results.forEach((result, index) => {
    const accountName = accounts[index].name;
    if (result.status === "fulfilled") {
      console.log(`【${accountName}】: ✅ ${result.value}`);
    } else {
      console.error(`【${accountName}】: ❌ ${result.reason.message}`);
      hasError = true;
    }
  });

  if (hasError) {
    process.exit(1);
  }
}

main();
