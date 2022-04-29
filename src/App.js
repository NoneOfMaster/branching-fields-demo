import "./App.css";
import { useState } from "react";
import yaml from "js-yaml";
import manifest from "./manifest";
import evaluate from "./utils/logicParser";

const json = yaml.load(manifest);

const SHOW_JSON = false;
const SHOW_STATE = false;

function App() {
  const startingState = json.fields.reduce((acc, { name }) => {
    acc[name] = false;
    return acc;
  }, {});

  const [state, setState] = useState(startingState);

  const parseState = ({ conditions = {} } = {}, appState) => {
    const defaults = { show: true, classes: "" };

    const { and, or, state } = conditions;
    const op = and || or;
    if (!op) return defaults;

    const opName = and ? "and" : "or";
    const logic = { [opName]: conditions[opName] };

    const areConditionsMet = evaluate(logic, appState);

    if (areConditionsMet) {
      const { classes = defaults.classes, show = defaults.show } = state;
      return { ...defaults, classes, show };
    }

    return defaults;
  };

  return (
    <div className="flex justify-around ">
      {SHOW_JSON && (
        <div>
          <h2 className="font-bold underlined">json</h2>
          <pre>{JSON.stringify(json, null, 2)}</pre>
        </div>
      )}
      <div>
        <h2 className="font-bold underlined ">yaml</h2>
        <pre>{manifest}</pre>
      </div>
      <div>
        <h2 className="font-bold underlined">rendered</h2>
        {json.fields.map(function (field) {
          const { name } = field;
          const parsedState = parseState(field, state);

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
      {SHOW_STATE && (
        <div>
          <div>
            <h2 className="font-bold underlined">state</h2>
            <pre>{JSON.stringify(state, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
