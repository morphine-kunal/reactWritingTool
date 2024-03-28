// import React from 'react'
import classes from "../../app.module.css";

import Header from "../Header/header"
import TextPage from "../text/textPage";

const Text = () => {
  return (
    <div className={classes.box}>
      <Header/>
      <main  style={{flexGrow: 1}}>
        <TextPage />
      </main>
    </div>
  )
}

export default Text
