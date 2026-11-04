import assert from "node:assert/strict";

// Run against a local or deployed site: node scripts/check-home-social-links.mjs [origin]
const origin = process.argv[2] ?? "http://127.0.0.1:3109";
const profileUrl = "https://www.xiaohongshu.com/user/profile/5c15276d0000000006036713";

for (const [path, label, alternateHref] of [
  ["/", "rednote", "/cn"],
  ["/cn", "小红书", "/"],
]) {
  const response = await fetch(new URL(path, origin), { signal: AbortSignal.timeout(15000) });
  assert.equal(response.status, 200, `${path} must load`);
  const html = await response.text();
  const social = html.match(/<nav class="footer-social"[^>]*>(.*?)<\/nav>/s)?.[1];
  assert.ok(social, `${path} must contain the social links`);
  const links = [...social.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>(.*?)<\/a>/gs)];
  assert.deepEqual(links.map((match) => match[1]), [
    profileUrl,
    "https://x.com/zheminlin",
    "https://github.com/zheminlin266",
  ]);
  assert.equal(links[0][2], label);
  assert.match(links[0][0], /aria-label="[^"]+"/);
  assert.match(links[0][0], /target="_blank"/);
  assert.match(links[0][0], /rel="noopener noreferrer"/);
  assert.doesNotMatch(social, /<svg\b/);
  const languageButton = html.match(/<a\b[^>]*class="control-button language-button"[^>]*>/)?.[0];
  assert.equal(languageButton?.match(/\bhref="([^"]+)"/)?.[1], alternateHref);
}

console.log("Both homepages use the correct text, the same clean profile URL before X, and reciprocal language links.");
