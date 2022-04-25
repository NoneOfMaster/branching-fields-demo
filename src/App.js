import "./App.css";
import { useState } from "react";
import yaml from "js-yaml";
import manifest from "./manifest";
import { parse } from "postcss";

const json = yaml.load(manifest);

function App() {
  const startingState = json.fields.reduce((acc, { name }) => {
    acc[name] = false;
    return acc;
  }, {});

  const [state, setState] = useState(startingState);

  const parseState = (conditions) => {
    const parseState = { show: true };

    if (!conditions) return parseState;

    const { state: conditionState } = conditions;

    const op = conditions.or ? "or" : "and";
    const logic = conditions[op];

    let truthy;
    if (op === "and") {
      truthy = !logic.some(({ target, value }) => {
        return state[target] !== value;
      });
    } else {
      truthy = logic.some(({ target, value }) => {
        return state[target] === value;
      });
    }

    if (truthy) {
      parseState.classes = conditionState?.classes?.join(" ");
      if (conditionState.hasOwnProperty("show"))
        parseState.show = conditionState.show;
    }

    return parseState;
  };

  return (
    <div className="flex justify-around ">
      <div>
        <h2 className="font-bold underlined">json</h2>
        <pre>{JSON.stringify(json, null, 2)}</pre>
      </div>
      <div>
        <h2 className="font-bold underlined ">yaml</h2>
        <pre>{manifest}</pre>
      </div>
      <div>
        <h2 className="font-bold underlined">rendered</h2>
        {json.fields.map(function ({ name, conditions }) {
          const parsedState = parseState(conditions);
          return (
            <div key={name} className={`${!parsedState.show ? "hidden" : ""}`}>
              <label className={parsedState.classes}>{name}</label>
              <input
                type="checkbox"
                checked={state[name]}
                onChange={() => setState({ ...state, [name]: !state[name] })}
              />
            </div>
          );
        })}
      </div>
      <div>
        <h2 className="font-bold underlined">state</h2>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;
