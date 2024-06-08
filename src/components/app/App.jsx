import styles from "./App.module.css";
import CopyIcon from "../../assets/images/icon-copy.svg?react";
import RightArrowIcon from '../../assets/images/icon-arrow-right.svg?react';

import { useState } from "react";

const defaultGenerationParameters = {
  passwordLength: 10,
  includeUppercase: true,
  includeLowercase: true,
  includeNumbers: true,
  includeSymbols: false,
};

const checkboxParameters = [
  {
    id: "uppercase",
    parameterName: "includeUppercase",
    labelText: "Include Uppercase Letters",
  },
  {
    id: "lowercase",
    parameterName: "includeLowercase",
    labelText: "Include Lowercase Letters",
  },
  {
    id: "numbers",
    parameterName: "includeNumbers",
    labelText: "Include Numbers",
  },
  {
    id: "symbols",
    parameterName: "includeSymbols",
    labelText: "Include Symbols",
  },
];

function App() {
  const [generationParameters, setGenerationParameters] = useState(
    defaultGenerationParameters
  );

  function handleSliderChange(newValue) {
    setGenerationParameters((oldParameters) => ({
      ...oldParameters,
      passwordLength: +newValue,
    }));
  }

  function handleCheckboxClick(parameterName) {
    setGenerationParameters((oldParameters) => ({
      ...oldParameters,
      [parameterName]: !oldParameters[parameterName],
    }));
  }

  return (
    <div className={styles.appContainer}>
      <h1 className={styles.midText}>Password Generator</h1>
      <div className={styles.passwordOutputContainer}>
        <p className={styles.largeText}>TODO</p>
        <CopyIcon />
      </div>
      <form>
        <div>
          <div>
            <p>Character length</p>
            <p>{generationParameters.passwordLength}</p>
          </div>
          <input
            type="range"
            min="0"
            max="20"
            value={generationParameters.passwordLength}
            onChange={(event) => handleSliderChange(event.target.value)}
          ></input>
        </div>
        <div>
          {checkboxParameters.map((parameters) => (
            <div>
              <input
                id={`${parameters.id}-checkbox`}
                type="checkbox"
                name="option"
                value={parameters.id}
                checked={generationParameters[parameters.parameterName]}
                onClick={() => handleCheckboxClick(parameters.parameterName)}
              ></input>
              <label htmlFor={`${parameters.id}-checkbox`}>
                {parameters.labelText}
              </label>
            </div>
          ))}
        </div>
        <div>
          <p>STRENGTH</p>
          <div>
            <p>TODO Strength Text</p>
            <div>TODO strength Display Component</div>
          </div>
        </div>
        <button type="button">GENERATE <RightArrowIcon /></button>
      </form>
    </div>
  );
}

export default App;
