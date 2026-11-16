const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { join } = require("node:path");
const test = require("node:test");
const ts = require("typescript");

function load(path, dependencies = {}) {
  const source = readFileSync(join(__dirname, path), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  });
  const module = { exports: {} };
  new Function("module", "exports", "require", outputText)(
    module,
    module.exports,
    (name) => {
      assert.ok(name in dependencies, `Unexpected import ${name}`);
      return dependencies[name];
    },
  );
  return module.exports;
}

const feed = load("feed.ts");
const host = "https://example.com";

test("RSS escapes XML, uses stable GUIDs and emits UTC dates", () => {
  const item = {
    id: "item-1",
    path: "/blog/old-slug?a=1&b=2",
    title: "Rumah & <apartemen>\u0000 🏡",
    description: "Tips <rumah>",
    publishedAt: "2026-11-16T07:00:00+07:00",
  };
  const xml = feed.serializeRss(host, feed.BLOG_FEED, [item]);
  assert.ok(xml.includes("Rumah &amp; &lt;apartemen&gt; 🏡"));
  assert.ok(xml.includes("old-slug?a=1&amp;b=2"));
  assert.ok(xml.includes("Tips &amp;lt;rumah&amp;gt;"));
  assert.ok(xml.includes("<pubDate>Mon, 16 Nov 2026 00:00:00 GMT</pubDate>"));
  const guid =
    '<guid isPermaLink="false">https://example.com/blog#item-1</guid>';
  assert.ok(xml.includes(guid));
  assert.ok(
    feed
      .serializeRss(host, feed.BLOG_FEED, [
        { ...item, path: "/blog/new-slug", publishedAt: "invalid" },
      ])
      .includes(guid),
  );
  assert.ok(
    !feed
      .serializeRss(host, feed.BLOG_FEED, [{ ...item, publishedAt: "invalid" }])
      .includes("<pubDate>"),
  );
  assert.ok(!feed.serializeRss(host, feed.BLOG_FEED, []).includes("<item>"));
});

function loadProperties(findPropertyJoinAgent) {
  const excerpt = load(
    "../../app/(client)/blog/_lib/create-article-excerpt.ts",
  );
  return load(
    "../../app/(client)/properties/_lib/load-property-feed-items.ts",
    {
      "@/lib/api/properties": { findPropertyJoinAgent },
      "@/lib/metadata/seo-domain": load("../metadata/seo-domain.ts"),
      "@/lib/rss/feed": feed,
      "@/lib/types/properties": {
        PropertySoldStatus: { Available: "Available" },
      },
      "../../blog/_lib/create-article-excerpt": excerpt,
    },
  ).loadPropertyFeedItems;
}

test("property RSS selects the newest unique available listings across pages", async () => {
  const property = (id, created_at, overrides) => ({
    id,
    created_at,
    title: "Rumah",
    description: "<p>Ringkasan</p>",
    sold_status: "Available",
    is_deleted: false,
    ...overrides,
  });
  const older = property(90, "2026-11-01");
  const latest = property(10, "2026-11-16");
  const pages = [
    [older, latest, property(92, "2026-11-17", { is_deleted: true })],
    [
      latest,
      property(11, "2026-11-16"),
      property(93, "2026-11-17", { sold_status: "Sold" }),
    ],
  ];
  const loadItems = loadProperties(async ({ page, sold_status }) => {
    assert.equal(sold_status, "Available");
    return {
      data: {
        data: pages[page - 1].map((record) => [record]),
        pagination: { total_pages: pages.length },
      },
    };
  });
  const items = await loadItems();
  assert.deepEqual(
    items.map(({ id }) => id),
    ["11", "10", "90"],
  );
  assert.equal(items[0].path, "/properties/11-Rumah");
  assert.equal(items[0].description, "Ringkasan");
});

test("a failed later page rejects the feed instead of returning a partial result", async () => {
  const loadItems = loadProperties(async ({ page }) => ({
    data: page === 1 ? { data: [], pagination: { total_pages: 2 } } : null,
  }));
  await assert.rejects(loadItems, /Property feed page 2 is unavailable/);
});
