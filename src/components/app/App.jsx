import styles from "./App.module.css";
import CopyIcon from "../../assets/images/icon-copy.svg?react";
import RightArrowIcon from "../../assets/images/icon-arrow-right.svg?react";

import { useState, useRef, useEffect } from "react";

const defaultGenerationParameters = {
  passwordLength: 10,
  includeUppercase: true,
  includeLowercase: true,
  includeNumbers: true,
  includeSymbols: false,
};

const strengthRatings = [1, 2, 3, 4];

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
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;

    if (slider !== null) {
      const handleInput = () => {
        const value = slider.value;
        const thumbDistancePercentage = (value - slider.min) / (slider.max - slider.min) * 100;

        const style = document.createElement('style');
        style.innerHTML = `
          .${styles.slider}::-webkit-slider-runnable-track {
            background: linear-gradient(to right, var(--light-green) 0%, var(--light-green) ${thumbDistancePercentage}%, var(--noire) ${thumbDistancePercentage}%, var(--noire) 100%);
          }
        `;
        document.head.appendChild(style);

        return () => {
          document.head.removeChild(style);
        };
      };

      slider.addEventListener('input', handleInput);
      return () => slider.removeEventListener('input', handleInput);
    }
  }, []);

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

  function handleButtonClick(event) {
    event.preventDefault();
  }

  const strengthRating = 3;
  
  [...Array(strengthRating).fill(strengthRating), ...Array(strengthRatings.length - strengthRating).fill(0) ]

  function getStrengthIndicatorClass(strengthRating) {
    switch(strengthRating) {
      case 0: return styles.emptyBar;
      case 1: return styles.redBar;
      case 2: return styles.orangeBar;
      case 3: return styles.yellowBar;
      case 4: return styles.greenBar;
      default: return ''; 
    }
  }

  function getStrengthText() {
    switch(strengthRating) {
      case 1: return 'TOO WEAK!';
      case 2: return 'WEAK';
      case 3: return 'MEDIUM';
      case 4: return 'STRONG';
      default: return ''; 
    }
  }

  return (
    <div className={styles.appContainer}>
      <h1 className={styles.smallGrayText}>Password Generator</h1>
      <div className={styles.passwordOutputContainer}>
        <p className={styles.largeText}>TODO</p>
        <div className={styles.copyContainer}>
          <p>COPIED</p>
          <CopyIcon />
        </div>
      </div>
      <form className={styles.formContainer}>
        <div>
          <div className={styles.lengthOutputContainer}>
            <p className={styles.lengthText}>Character Length</p>
            <p className={styles.lengthOutput}>{generationParameters.passwordLength}</p>
          </div>
          <input
            type="range"
            min="0"
            max="20"
            ref={sliderRef}
            value={generationParameters.passwordLength}
            onChange={(event) => handleSliderChange(event.target.value)}
            className={styles.slider}
          ></input>
        </div>
        <div className={styles.checkboxesContainer}>
          {checkboxParameters.map((parameters) => (
            <div className={styles.checkboxContainer}>
              <input
                id={`${parameters.id}-checkbox`}
                type="checkbox"
                name="option"
                value={parameters.id}
                checked={generationParameters[parameters.parameterName]}
                onClick={() => handleCheckboxClick(parameters.parameterName)}
                className={styles.checkbox}
              ></input>
              <label htmlFor={`${parameters.id}-checkbox`}>
                {parameters.labelText}
              </label>
            </div>
          ))}
        </div>
        <div className={styles.strengthContainer}>
          <p className={styles.smallGrayText}>STRENGTH</p>
          <div className={styles.strengthOutputContainer}>
            <p className={styles.midLightText}>{getStrengthText()}</p>
            <div className={styles.strengthDisplayContainer}>
              {
                [
                  ...Array(strengthRating).fill(strengthRating),
                  ...Array(strengthRatings.length - strengthRating).fill(0)
                ].map(strengthRating => <div className={getStrengthIndicatorClass(strengthRating)}></div>)
              }
            </div>
          </div>
        </div>
        <button type="button" className={styles.button} onClick={handleButtonClick}>
          <div className={styles.buttonContentContainer}>
            <p>GENERATE</p>
            <RightArrowIcon />
          </div>
        </button>
      </form>
    </div>
  );
}

export default App;
