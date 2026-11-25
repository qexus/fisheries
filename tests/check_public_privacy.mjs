// Public data must not contain personal job-search tracking or private individuals' mailboxes.
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const context = {window: {}};
vm.runInNewContext(fs.readFileSync("public/data.js", "utf8"), context, {filename: "public/data.js"});
const data = context.window.QEXUS_DATA;
const ROLE_MAILBOX = /^(post|jobb|job|jobs|work|hr|careers?|recruit\w*|rekruttering|personal|crew\w*|hrcrewing|office|kontakt|contact|info|norway\.hr|careers\.canada)@/i;
const FREEMAIL = /@(gmail|hotmail|outlook|live|yahoo|icloud|online|me)\./i;
for (const [collection, banned] of [["companies", ["outreach", "priority"]], ["jobs", ["match", "status"]]]) {
  for (const row of data[collection]) {
    for (const field of banned) assert(!(field in row), `${collection}: personal tracker field "${field}" must stay local, not public`);
  }
}
const emails = JSON.stringify(data).match(/[\w.+-]+@[\w-]+(\.[\w-]+)+/g) || [];
for (const email of emails) {
  assert(!FREEMAIL.test(email), `Private free-mail address published: ${email}`);
  assert(ROLE_MAILBOX.test(email), `Only company role mailboxes may be published, not personal ones: ${email}`);
}
console.log(`Public data privacy verified (${emails.length} role mailboxes).`);
