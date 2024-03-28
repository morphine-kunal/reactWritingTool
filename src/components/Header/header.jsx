/* eslint-disable react/prop-types */
// import React from 'react'
import classes from "./header.module.css";
import BlockContext from "../../Store/block-context";
import { useContext } from "react";

const Header = ({ onShowModal }) => {
  const blockCtx = useContext(BlockContext);
  return (
    <header className={classes.header}>
      <h2 className={classes.logo}>WritingTool</h2>
      {blockCtx.items.length >0 && <button onClick={onShowModal} className={classes.btn}>Add Block</button>}
    </header>
  );
};

export default Header;
