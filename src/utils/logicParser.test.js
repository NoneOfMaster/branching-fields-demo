import evaluate from "./logicParser";

test("correctly executes logic", () => {
  let testLogic = {
    or: [
      {
        and: [
          {
            or: [
              { target: "goofy", value: true },
              { target: "James Gandolfini", value: true },
            ],
          },
          {
            and: [
              { target: "elmo", value: true },
              { target: "snoopy", value: true },
            ],
          },
        ],
      },
      { target: "barney", value: true },
    ],
  };

  let state = {
    goofy: true,
  };

  expect(evaluate(testLogic, state)).toBe(false);

  state = {
    goofy: true,
    elmo: true,
  };

  expect(evaluate(testLogic, state)).toBe(false);

  state = {
    goofy: true,
    "James Gandolfini": true,
  };

  expect(evaluate(testLogic, state)).toBe(false);

  state = {
    elmo: true,
    snoopy: true,
  };

  expect(evaluate(testLogic, state)).toBe(false);

  state = {
    "James Gandolfini": true,
    elmo: true,
    snoopy: true,
  };

  expect(evaluate(testLogic, state)).toBe(true);

  state = {
    goofy: true,
    elmo: true,
    snoopy: true,
  };

  expect(evaluate(testLogic, state)).toBe(true);

  state = {
    barney: true,
  };

  expect(evaluate(testLogic, state)).toBe(true);

  testLogic = {
    or: [
      { target: "goofy", value: false },
      { target: "pluto", value: false },
      { and: [{ "James Gandolfini": true }, { snoopy: true }] },
    ],
  };

  state = {
    "James Gandolfini": true,
    snoopy: true,
    goofy: false,
    pluto: false,
  };

  expect(evaluate(testLogic, state)).toBe(true);
});
