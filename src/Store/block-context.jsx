import React from "react";

const BlockContext = React.createContext({
  items: [],
  addBlock: () => {},
  setItems: () => {},
  deleteBlock : () => {}
});
export default BlockContext;