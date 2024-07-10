import { LeetCode } from "leetcode-query";

export const config = {
    runtime: "edge",
};

export default async function handler() {
    const lc = new LeetCode();
    const daily = await lc.daily();

    const now = Date.now();
    const next = new Date(daily.date).getTime() + 24 * 60 * 60 * 1000;
    const ttl = Math.floor((next - now) / 1000);

    const response = new Response(null, {
        status: 302,
        headers: {
            Location: "https://leetcode.com" + daily.link,
            "Cache-Control": `public, s-maxage=${ttl}`,
        },
    });

    return response;
}
