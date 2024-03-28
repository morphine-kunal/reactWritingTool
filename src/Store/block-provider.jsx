/* eslint-disable react/prop-types */
import { useReducer } from "react";
import BlockContext from "./block-context";

const defaultBlockState = {
  items: [],
};

const blockReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return {
        items: [...state.items, action.item],
      };
    case "CLEAR":
      return defaultBlockState;
    case "DELETE":
      return {
        items: state.items.filter((item) => item.id !== action.id),
      };
    default:
      state;
  }
};

const BlockProvider = (props) => {
  const [blockState, dispatch] = useReducer(blockReducer, defaultBlockState);

  const addItemToBlock = (item) => {
    dispatch({
      type: "ADD",
      item: { ...item, type: item.text ? "text" : "image" },
    });
  };
  const clearBlock = () => {
    dispatch({ type: "CLEAR" });
  };
  //   const setItems = (items) => {
  //     // Define setItems function
  //     dispatch({ type: "REORDER", items });
  //   };
  const deleteItemFromBlock = (id) => {
    dispatch({ type: "DELETE", id });
  };

  const blockContext = {
    items: blockState.items,
    addBlock: addItemToBlock,
    deleteBlock: deleteItemFromBlock,
    clearBlock: clearBlock,
    // setItems: setItems,
  };
  return (
    <BlockContext.Provider value={blockContext}>
      {props.children}
    </BlockContext.Provider>
  );
};
export default BlockProvider;
