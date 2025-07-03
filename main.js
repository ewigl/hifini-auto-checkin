const signPageUrl = "https://www.hifini.com/sg_sign.htm";
const responseSuccessCode = "0";
// 从环境变量获取 Server 酱的 SCKEY
const SCKEY = process.env.SCKEY;

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
    const sign = re.exec(resText)[1];

    return sign;
}

// 向 Server 酱发送消息的函数
async function sendServerChanMsg(title, content) {
    if (!SCKEY) {
        console.log("未设置 Server 酱的 SCKEY，无法推送消息");
        return;
    }
    const url = `https://sctapi.ftqq.com/${SCKEY}.send`;
    const data = new URLSearchParams();
    data.append("title", title);
    data.append("desp", content);
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: data
        });
        const result = await response.json();
        if (result.code === 0) {
            console.log("Server 酱消息推送成功");
        } else {
            console.log("Server 酱消息推送失败:", result.message);
        }
    } catch (error) {
        console.log("Server 酱消息推送出错:", error);
    }
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
    .then(async (resJson) => {
        let resultMessage;
        if (resJson.code === responseSuccessCode) {
            resultMessage = resJson.message;
        } else {
            if (resJson.message === "今天已经签过啦！") {
                resultMessage = resJson.message;
            } else {
                resultMessage = `签到失败: ${resJson.message}`;
            }
        }
        console.log(resultMessage);
        // 发送消息到 Server 酱
        await sendServerChanMsg("Hifini 签到结果", resultMessage);
    })
    .catch(async (error) => {
        const errorMessage = `签到过程出错: ${error.message}`;
        console.log(errorMessage);
        // 发送错误消息到 Server 酱
        await sendServerChanMsg("Hifini 签到结果", errorMessage);
    });
}

async function main() {
    let cookie;
    if (process.env.hifi_COOKIE) {
        cookie = process.env.hifi_COOKIE;
    } else {
        console.log("COOKIE NOT FOUND");
        process.exit(1);
    }

    let sign = await getSign(cookie);

    checkIn(cookie, sign);
}

main();
    
