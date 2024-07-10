const { LeetCode } = require("leetcode-query");

exports.handler = async function(event, context) {
    try {
        const lc = new LeetCode();
        const daily = await lc.daily();

        const now = Date.now();
        const next = new Date(daily.date).getTime() + 24 * 60 * 60 * 1000;
        const ttl = Math.floor((next - now) / 1000);

        return {
            statusCode: 302,
            headers: {
                Location: `https://leetcode.com${daily.link}`,
                "Cache-Control": `public, s-maxage=${ttl}`,
            },
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch daily problem' }),
        };
    }
};
