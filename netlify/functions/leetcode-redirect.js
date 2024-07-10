const { LeetCode } = require("leetcode-query");

exports.handler = async function(event, context) {
    try {
        const lc = new LeetCode();
        const daily = await lc.daily();

        return {
            statusCode: 302,
            headers: {
                Location: `https://leetcode.com${daily.link}`,
                "Cache-Control": `public, s-maxage=86400`, // Cache for 24 hours
            },
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch daily problem' }),
        };
    }
};
