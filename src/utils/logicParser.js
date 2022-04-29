const doAnd = (currentResult = true, subTreeResult) =>
  currentResult && subTreeResult;

const doOr = (currentResult = false, subTreeResult) =>
  currentResult || subTreeResult;

const evaluate = ({ and, or, target, value }, state) => {
  const op = and || or;

  if (op) {
    let subtreeEvaluation;

    for (const clause of op) {
      const evaluated = evaluate(clause, state);
      if (or) {
        subtreeEvaluation = doOr(subtreeEvaluation, evaluated);
      } else {
        subtreeEvaluation = doAnd(subtreeEvaluation, evaluated);
      }
    }

    return subtreeEvaluation;
  }

  return state[target] === value;
};

export default evaluate;
