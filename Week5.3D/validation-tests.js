/**
 * SIT725 – 5.3D Validation Tests (MANDATORY TEMPLATE)
 *
 * HOW TO RUN: (Node.js 18+ is required)
 *   1. Start MongoDB
 *   2. Start your server (npm start)
 *   3. node validation-tests.js
 *
 * DO NOT MODIFY:
 *   - Output format (TEST|, SUMMARY|, COVERAGE|)
 *   - test() function signature
 *   - Exit behaviour
 *   - coverageTracker object
 *   - Logging structure
 *
 * YOU MUST:
 *   - Modify makeValidBook() to satisfy your schema rules
 *   - Add sufficient tests to meet coverage requirements
 */

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const API_BASE = "/api/books";

// =============================
// INTERNAL STATE (DO NOT MODIFY)
// =============================

const results = [];

const coverageTracker = {
  CREATE_FAIL: 0,
  UPDATE_FAIL: 0,
  TYPE: 0,
  REQUIRED: 0,
  BOUNDARY: 0,
  LENGTH: 0,
  TEMPORAL: 0,
  UNKNOWN_CREATE: 0,
  UNKNOWN_UPDATE: 0,
  IMMUTABLE: 0,
};

// =============================
// OUTPUTS FORMAT (DO NOT MODIFY)
// =============================

function logHeader(uniqueId) {
  console.log("SIT725_VALIDATION_TESTS");
  console.log(`BASE_URL=${BASE_URL}`);
  console.log(`API_BASE=${API_BASE}`);
  console.log(`INFO|Generated uniqueId=${uniqueId}`);
}

function logResult(r) {
  console.log(
    `TEST|${r.id}|${r.name}|${r.method}|${r.path}|expected=${r.expected}|actual=${r.actual}|pass=${r.pass ? "Y" : "N"}`
  );
}

function logSummary() {
  const failed = results.filter(r => !r.pass).length;
  console.log(
    `SUMMARY|pass=${failed === 0 ? "Y" : "N"}|failed=${failed}|total=${results.length}`
  );
  return failed === 0;
}

function logCoverage() {
  console.log(
    `COVERAGE|CREATE_FAIL=${coverageTracker.CREATE_FAIL}` +
    `|UPDATE_FAIL=${coverageTracker.UPDATE_FAIL}` +
    `|TYPE=${coverageTracker.TYPE}` +
    `|REQUIRED=${coverageTracker.REQUIRED}` +
    `|BOUNDARY=${coverageTracker.BOUNDARY}` +
    `|LENGTH=${coverageTracker.LENGTH}` +
    `|TEMPORAL=${coverageTracker.TEMPORAL}` +
    `|UNKNOWN_CREATE=${coverageTracker.UNKNOWN_CREATE}` +
    `|UNKNOWN_UPDATE=${coverageTracker.UNKNOWN_UPDATE}` +
    `|IMMUTABLE=${coverageTracker.IMMUTABLE}`
  );
}

// =============================
// HTTP HELPER
// =============================

async function http(method, path, body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  return { status: res.status, text };
}

// =============================
// TEST REGISTRATION FUNCTION
// =============================

async function test({ id, name, method, path, expected, body, tags }) {

  const { status } = await http(method, path, body);
  const pass = status === expected;

  const result = { id, name, method, path, expected, actual: status, pass };
  results.push(result);
  logResult(result);

  // treat missing or invalid tags as []
  const safeTags = Array.isArray(tags) ? tags : [];

  safeTags.forEach(tag => {
    if (Object.prototype.hasOwnProperty.call(coverageTracker, tag)) {
      coverageTracker[tag]++;
    }
  });
}

// =============================
// STUDENT MUST MODIFY THESE
// =============================
function makeValidBook(id) {
    return {
        id,
        title: "Valid Title",
        author: "Valid Author",
        year: 2020,
        genre: "Other",
        summary: "This is a valid summary for testing purposes.",
        price: "9.99"
    };
}

function makeValidUpdate() {
    return {
        title: "Updated Title",
        author: "Updated Author",
        year: 2021,
        genre: "Other",
        summary: "This is an updated valid summary.",
        price: "10.50"
    };
}

// =============================
// REQUIRED BASE TESTS (DO NOT REMOVE)
// =============================

async function run() {

  const uniqueId = `b${Date.now()}`;
  logHeader(uniqueId);

  const createPath = API_BASE;
  const updatePath = (id) => `${API_BASE}/${id}`;

  // ---- T01 Valid CREATE ----
  await test({
    id: "T01",
    name: "Valid create",
    method: "POST",
    path: createPath,
    expected: 201,
    body: makeValidBook(uniqueId),
    tags: []
  });

  // ---- T02 Duplicate ID ----
  await test({
    id: "T02",
    name: "Duplicate ID",
    method: "POST",
    path: createPath,
    expected: 409,
    body: makeValidBook(uniqueId),
    tags: ["CREATE_FAIL"]
  });

  // ---- T03 Immutable ID ----
  await test({
    id: "T03",
    name: "Immutable ID on update",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 400,
    body: { ...makeValidUpdate(), id: "b999" },
    tags: ["UPDATE_FAIL", "IMMUTABLE"]
  });

  // ---- T04 Unknown field CREATE ----
  await test({
    id: "T04",
    name: "Unknown field CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: { ...makeValidBook(`b${Date.now()+1}`), hack: true },
    tags: ["CREATE_FAIL", "UNKNOWN_CREATE"]
  });

  // ---- T05 Unknown field UPDATE ----
  await test({
    id: "T05",
    name: "Unknown field UPDATE",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 400,
    body: { ...makeValidUpdate(), hack: true },
    tags: ["UPDATE_FAIL", "UNKNOWN_UPDATE"]
  });

  // =====================================
  // STUDENTS MUST ADD ADDITIONAL TESTS
  // =====================================
  //
  // Add tests covering:
  // - REQUIRED
  // - TYPE
  // - BOUNDARY
  // - LENGTH
  // - TEMPORAL
  // - UPDATE_FAIL
  //
  // Each test must include appropriate tags.
  //
  // ---- T06 Required field CREATE ----
  await test({
    id: "T06",
    name: "Required title on CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
      ...makeValidBook(`b${Date.now()+2}`),
      title: undefined
    },
    tags: ["CREATE_FAIL", "REQUIRED"]
  });

  // ---- T07 Type validation CREATE ----
  await test({
    id: "T07",
    name: "Invalid year type on CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
      ...makeValidBook(`b${Date.now()+3}`),
      year: "2020"
    },
    tags: ["CREATE_FAIL", "TYPE"]
  });

  // ---- T08 Boundary validation CREATE ----
  await test({
    id: "T08",
    name: "Year below minimum on CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
      ...makeValidBook(`b${Date.now()+4}`),
      year: 999
    },
    tags: ["CREATE_FAIL", "BOUNDARY"]
  });

  // ---- T09 Temporal validation CREATE ----
  await test({
    id: "T09",
    name: "Future year on CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
      ...makeValidBook(`b${Date.now()+5}`),
      year: new Date().getFullYear() + 1
    },
    tags: ["CREATE_FAIL", "TEMPORAL"]
  });

  // ---- T10 Length validation CREATE ----
  await test({
    id: "T10",
    name: "Title too long on CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
      ...makeValidBook(`b${Date.now()+6}`),
      title: "A".repeat(201)
    },
    tags: ["CREATE_FAIL", "LENGTH"]
  });

  // ---- T11 Price boundary CREATE ----
  await test({
    id: "T11",
    name: "Price below minimum on CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
      ...makeValidBook(`b${Date.now()+7}`),
      price: "0.00"
    },
    tags: ["CREATE_FAIL", "BOUNDARY"]
  });

  // ---- T12 Required author UPDATE ----
  await test({
    id: "T12",
    name: "Required author on UPDATE",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 400,
    body: {
      ...makeValidUpdate(),
      author: ""
    },
    tags: ["UPDATE_FAIL", "REQUIRED"]
  });

  // ---- T13 Type validation UPDATE ----
  await test({
    id: "T13",
    name: "Invalid year type on UPDATE",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 400,
    body: {
      ...makeValidUpdate(),
      year: "2021"
    },
    tags: ["UPDATE_FAIL", "TYPE"]
  });

  // ---- T14 Boundary validation UPDATE ----
  await test({
    id: "T14",
    name: "Year below minimum on UPDATE",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 400,
    body: {
      ...makeValidUpdate(),
      year: 999
    },
    tags: ["UPDATE_FAIL", "BOUNDARY"]
  });

  // ---- T15 Temporal validation UPDATE ----
  await test({
    id: "T15",
    name: "Future year on UPDATE",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 400,
    body: {
      ...makeValidUpdate(),
      year: new Date().getFullYear() + 1
    },
    tags: ["UPDATE_FAIL", "TEMPORAL"]
  });

  // ---- T16 Length validation UPDATE ----
  await test({
    id: "T16",
    name: "Summary too long on UPDATE",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 400,
    body: {
      ...makeValidUpdate(),
      summary: "A".repeat(1001)
    },
    tags: ["UPDATE_FAIL", "LENGTH"]
  });

  // ---- T17 Price boundary UPDATE ----
  await test({
    id: "T17",
    name: "Price below minimum on UPDATE",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 400,
    body: {
      ...makeValidUpdate(),
      price: "0.00"
    },
    tags: ["UPDATE_FAIL", "BOUNDARY"]
  });

  // ---- T18 Missing target UPDATE ----
  await test({
    id: "T18",
    name: "Update missing book",
    method: "PUT",
    path: updatePath("b999999999"),
    expected: 404,
    body: makeValidUpdate(),
    tags: ["UPDATE_FAIL"]
  });

  // ---- T19 Required ID CREATE ----
await test({
    id: "T19",
    name: "Required ID on CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: (() => {
        const book = makeValidBook(`b${Date.now()}19`);
        delete book.id;
        return book;
    })(),
    tags: ["CREATE_FAIL", "REQUIRED"]
});

// ---- T20 Invalid ID format CREATE ----
await test({
    id: "T20",
    name: "Invalid ID format on CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
        ...makeValidBook(`b${Date.now()}20`),
        id: "invalid123"
    },
    tags: ["CREATE_FAIL", "BOUNDARY"]
});

// ---- T21 ID too long CREATE ----
await test({
    id: "T21",
    name: "ID too long on CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
        ...makeValidBook(`b${Date.now()}21`),
        id: "b" + "1".repeat(20)
    },
    tags: ["CREATE_FAIL", "LENGTH"]
});

// ---- T22 Title too short CREATE ----
await test({
    id: "T22",
    name: "Title too short on CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
        ...makeValidBook(`b${Date.now()}22`),
        title: ""
    },
    tags: ["CREATE_FAIL", "LENGTH"]
});

// ---- T23 Invalid author type CREATE ----
await test({
    id: "T23",
    name: "Invalid author type on CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
        ...makeValidBook(`b${Date.now()}23`),
        author: 123
    },
    tags: ["CREATE_FAIL", "TYPE"]
});

// ---- T24 Author too short CREATE ----
await test({
    id: "T24",
    name: "Author too short on CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
        ...makeValidBook(`b${Date.now()}24`),
        author: "A"
    },
    tags: ["CREATE_FAIL", "LENGTH"]
});

// ---- T25 Author too long CREATE ----
await test({
    id: "T25",
    name: "Author too long on CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
        ...makeValidBook(`b${Date.now()}25`),
        author: "A".repeat(101)
    },
    tags: ["CREATE_FAIL", "LENGTH"]
});

// ---- T26 Year not integer CREATE ----
await test({
    id: "T26",
    name: "Non-integer year on CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
        ...makeValidBook(`b${Date.now()}26`),
        year: 2020.5
    },
    tags: ["CREATE_FAIL", "TYPE"]
});

// ---- T27 Invalid genre type CREATE ----
await test({
    id: "T27",
    name: "Invalid genre type on CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
        ...makeValidBook(`b${Date.now()}27`),
        genre: 123
    },
    tags: ["CREATE_FAIL", "TYPE"]
});

// ---- T28 Genre too short CREATE ----
await test({
    id: "T28",
    name: "Genre too short on CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
        ...makeValidBook(`b${Date.now()}28`),
        genre: "A"
    },
    tags: ["CREATE_FAIL", "LENGTH"]
});

// ---- T29 Genre too long CREATE ----
await test({
    id: "T29",
    name: "Genre too long on CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
        ...makeValidBook(`b${Date.now()}29`),
        genre: "A".repeat(51)
    },
    tags: ["CREATE_FAIL", "LENGTH"]
});

// ---- T30 Summary too short CREATE ----
await test({
    id: "T30",
    name: "Summary too short on CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
        ...makeValidBook(`b${Date.now()}30`),
        summary: "Too short"
    },
    tags: ["CREATE_FAIL", "LENGTH"]
});

// ---- T31 Invalid summary type CREATE ----
await test({
    id: "T31",
    name: "Invalid summary type on CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
        ...makeValidBook(`b${Date.now()}31`),
        summary: 12345
    },
    tags: ["CREATE_FAIL", "TYPE"]
});

// ---- T32 Invalid price type CREATE ----
await test({
    id: "T32",
    name: "Invalid price type on CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
        ...makeValidBook(`b${Date.now()}32`),
        price: 19.99
    },
    tags: ["CREATE_FAIL", "TYPE"]
});

// ---- T33 Price precision CREATE ----
await test({
    id: "T33",
    name: "Price with too many decimal places on CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
        ...makeValidBook(`b${Date.now()}33`),
        price: "19.999"
    },
    tags: ["CREATE_FAIL", "BOUNDARY"]
});

// ---- T34 Price above maximum CREATE ----
await test({
    id: "T34",
    name: "Price above maximum on CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
        ...makeValidBook(`b${Date.now()}34`),
        price: "10000.01"
    },
    tags: ["CREATE_FAIL", "BOUNDARY"]
});

// ---- T35 Required price CREATE ----
await test({
    id: "T35",
    name: "Required price on CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: (() => {
        const book = makeValidBook(`b${Date.now()}35`);
        delete book.price;
        return book;
    })(),
    tags: ["CREATE_FAIL", "REQUIRED"]
});

// ---- T36 Required year CREATE ----
await test({
    id: "T36",
    name: "Required year on CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: (() => {
        const book = makeValidBook(`b${Date.now()}36`);
        delete book.year;
        return book;
    })(),
    tags: ["CREATE_FAIL", "REQUIRED"]
});

// ---- T37 Required genre CREATE ----
await test({
    id: "T37",
    name: "Required genre on CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: (() => {
        const book = makeValidBook(`b${Date.now()}37`);
        delete book.genre;
        return book;
    })(),
    tags: ["CREATE_FAIL", "REQUIRED"]
});

// ---- T38 Required summary CREATE ----
await test({
    id: "T38",
    name: "Required summary on CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: (() => {
        const book = makeValidBook(`b${Date.now()}38`);
        delete book.summary;
        return book;
    })(),
    tags: ["CREATE_FAIL", "REQUIRED"]
});

// ---- T39 Invalid author type UPDATE ----
await test({
    id: "T39",
    name: "Invalid author type on UPDATE",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 400,
    body: {
        ...makeValidUpdate(),
        author: 123
    },
    tags: ["UPDATE_FAIL", "TYPE"]
});

// ---- T40 Non-integer year UPDATE ----
await test({
    id: "T40",
    name: "Non-integer year on UPDATE",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 400,
    body: {
        ...makeValidUpdate(),
        year: 2021.5
    },
    tags: ["UPDATE_FAIL", "TYPE"]
});

  const pass = logSummary();
  logCoverage();

  process.exit(pass ? 0 : 1);
}

run().catch(err => {
  console.error("ERROR", err);
  process.exit(2);
});
