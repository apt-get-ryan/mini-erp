import React from 'react';
import styles from "./Spinner.module.css";

function Spinner({loading}) {
  return (
    <div className={loading ? styles.loader : ""}></div>
  )
}

export {Spinner}