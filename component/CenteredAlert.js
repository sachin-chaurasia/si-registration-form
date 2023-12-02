// components/CenteredAlert.js
import { useState, useEffect } from 'react';
import styles from '../styles/CenteredAlert.module.css';

const CenteredAlert = () => {
  const [isAlertVisible, setAlertVisible] = useState(true);

  useEffect(() => {
    const alertShown = localStorage.getItem('alertShown');

    if (!alertShown) {
      localStorage.setItem('alertShown', 'true');
      
    } else {
      // If the alert was previously shown, hide it
      setAlertVisible(false);
    }
  }, []);

  const handleCloseAlert = () => {
    setAlertVisible(false);
  };

  return (
    <>
      {isAlertVisible && (
        <div className={styles.centeredAlert}>
          <p>Welcome to our website! This is your first visit.</p>
          <button className={styles.closeButton} onClick={handleCloseAlert}>
            Close
          </button>
        </div>
      )}
    </>
  );
};

export default CenteredAlert;
