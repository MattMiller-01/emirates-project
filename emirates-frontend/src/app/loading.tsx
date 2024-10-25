// app/components/Loading.tsx
import React from 'react';
import styles from './loading.module.css';

const Loading = () => {
  return (
    <div className={styles.loadingWrapper}>
      <div className={styles.spinner}></div>
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
