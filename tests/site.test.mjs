import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join } from "node:path";
import { createContext, runInContext } from "node:vm";

const file = path => readFileSync(join(process.cwd(), path), "utf8");
const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];
const sandbox = createContext({ window: { BELL_DATA: {} } });
for (const day of days) {
  runInContext(file(day + ".js"), sandbox, { filename: day + ".js", timeout: 1000 });
}
const banks = sandbox.window.BELL_DATA;

test("All JavaScript files have valid syntax", () => {
  for (const name of [...days.map(day => day + ".js"), "app.js"]) {
    assert.doesNotThrow(() => execFileSync(process.execPath, ["--check", join(process.cwd(), name)]), name);
  }
});

test("All five day banks contain exactly 18 weeks", () => {
  for (const day of days) {
    assert.ok(Array.isArray(banks[day]), day + ": missing data");
    assert.equal(banks[day].length, 18, day + ": missing or extra weeks");
    for (const [week, lesson] of banks[day].entries()) {
      const context = day + " week " + (week + 1);
      assert.ok(Array.isArray(lesson) && lesson.length === 3, context + ": lesson shape");
      assert.ok(typeof lesson[0] === "string" && lesson[0].trim(), context + ": title");
      assert.equal(typeof lesson[1], "string", context + ": instructions");
      assert.ok(Array.isArray(lesson[2]) && lesson[2].length, context + ": empty activities");
      for (const [index, part] of lesson[2].entries()) {
        const label = context + " section " + (index + 1);
        assert.ok(Array.isArray(part) && part.length >= 3, label + ": invalid section");
        assert.equal(typeof part[0], "string", label + ": section title");
        assert.ok(["mc", "mcset", "text"].includes(part[1]), label + ": unsupported type");
        if (part[1] === "mc") {
          assert.equal(typeof part[2], "string", label + ": question");
          assert.ok(Array.isArray(part[3]) && part[3].length >= 2, label + ": options");
          assert.ok(part[3].every(option => typeof option === "string"), label + ": answer type");
        } else if (part[1] === "mcset") {
          assert.ok(Array.isArray(part[2]) && part[2].length, label + ": no questions");
          for (const question of part[2]) {
            assert.ok(Array.isArray(question) && question.length >= 3, label + ": question shape");
            assert.ok(question.slice(0, 3).every(value => typeof value === "string"), label + ": question text");
          }
        } else assert.equal(typeof part[2], "string", label + ": text prompt");
      }
    }
  }
});

test("Published routes and relative asset links remain intact", () => {
  const html = file("index.html");
  assert.match(html, /<title>ELA Bell Ringer Hub<\/title>/);
  for (const name of [...days.map(day => day + ".js"), "app.js", "styles.css"]) {
    assert.ok(existsSync(join(process.cwd(), name)), name + ": file missing");
    assert.ok(html.includes("./" + name), name + ": relative path missing");
  }
  const scripts = [...html.matchAll(/<script src="\.\/([^"]+)"><\/script>/g)].map(item => item[1]);
  assert.deepEqual(scripts, [...days.map(day => day + ".js"), "app.js"]);
  assert.ok(html.includes('href="./business-walrus/"'), "Walrus link missing");
  assert.ok(existsSync(join(process.cwd(), "business-walrus/index.html")), "Walrus page missing");
});

test("Autosave, progress, copy, backup and day/week sharing have connected controls", () => {
  const page = file("index.html");
  const script = file("app.js");
  for (const id of ["activity", "weekSelect", "progressShell", "progressText", "storageNote",
    "copyBtn", "shareBtn", "downloadBtn", "clearBtn", "copyFallback", "copyFallbackLabel"]) {
    assert.ok(page.includes('id="' + id + '"'), "Missing element " + id);
  }
  assert.ok(script.includes("history.replaceState"), "Deep link update missing");
  assert.ok(script.includes("localStorage"), "Browser persistence missing");
  assert.ok(script.includes("navigator.clipboard"), "Clipboard support missing");
  assert.ok(script.includes("URL.createObjectURL"), "Backup download missing");
  assert.match(page, /aria-valuenow="0"/);
});

test("Independent Business Walrus website is preserved", () => {
  const walrus = file("business-walrus/index.html");
  assert.ok(walrus.length > 80000, "Embedded game content unexpectedly missing");
  assert.ok(walrus.includes("data:image/jpeg;base64,"), "Embedded Walrus image missing");
  assert.ok(walrus.includes("<script>"), "Walrus game script missing");
});
