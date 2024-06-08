import styles from './App.module.css';
import CopyIcon from '../../assets/images/icon-copy.svg?react';

function App() {
  return (
    <div className={styles.appContainer}>
      <h1 className={styles.midText}>Password Generator</h1>
      <div className={styles.passwordOutputContainer}>
        <p className={styles.largeText}>TODO</p>
        <CopyIcon />
      </div>
      <form>
        
      </form>
    </div>
  )
}

export default App
