import { useState, useEffect, useContext, useRef } from "react";
import classes from "./text.module.css";
import BlockContext from "../../Store/block-context";
import { useNavigate, useLocation  } from "react-router-dom";
import {LuBold, LuItalic, LuUnderline} from 'react-icons/lu'

const TextPage = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [remainWord, setRemainingWord] = useState(250);
  const [fontSize, setFontSize] = useState("12px"); // Default font size
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [fontFamily, setFontFamily] = useState("Times New Roman");
  const maxWords = 250;

  const blockCtx = useContext(BlockContext);
  const history = useNavigate();
  const textAreaRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const editIndex = params.get('edit');
    if (editIndex !== null) {
      // If editing an existing item, set the title and text from the context
      const itemToEdit = blockCtx.items[editIndex];
      if (itemToEdit) {
        setTitle(itemToEdit.title);
        setText(itemToEdit.text);
        setFontSize(itemToEdit.fontSize);
        setIsBold(false);
        setIsItalic(false);
        setIsUnderline(false);
        setFontFamily("Times New Roman");
      }
    }
  }, [location.search, blockCtx.items]);

  const handleTitleChange = (e) => {
    const enteredTitle = e.target.value;
    setTitle(enteredTitle);
  };

  const handleTextChange = (e) => {
    const inputValue = e.target.value;
    const wordCount = inputValue.trim().split(/\s+/).length;

    if (wordCount <= maxWords) {
      setText(inputValue);
      setRemainingWord(maxWords - wordCount);
    } else if (text.length === maxWords) {
      setText(text);
    }
  };

  useEffect(() => {
    let wordCount = maxWords - text.split(/\s+/).length;
    if (wordCount >= 0) {
      setRemainingWord(wordCount);
    }
  }, [text]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      id: Math.random() * 10,
      title: title,
      type: "text",
      text: text,
      fontSize: fontSize, // Include font size in the data object
    };
    const params = new URLSearchParams(location.search);
    const editIndex = params.get('edit');
    if (editIndex !== null) {
      // If editing an existing item, update the item in the context
      blockCtx.items[editIndex] = data;
    } else {
      blockCtx.addBlock(data);
    }
    setText("");
    setTitle("");
    history("/");
  };

  const handleFontSizeChange = (e) => {
    setFontSize(e.target.value);
  };

  const handleFontFamilyChange = (e) => {
    setFontFamily(e.target.value);
  };

  const handleBoldClick = () => {
    setIsBold(!isBold)
  };

  const handleItalicClick = () => {
    setIsItalic(!isItalic);
  };

  const handleUnderlineClick = () => {
    setIsUnderline(!isUnderline);
  };

  // const handleTextChange = (e) => {
  //   setText(e.target.value);
  // };

  const getStyle = () => {
    let style = {
      fontSize: fontSize,
      fontFamily: fontFamily,
    };
    if (isBold) {
      style.fontWeight = "bold";
    }
    if (isItalic) {
      style.fontStyle = "italic";
    }
    if (isUnderline) {
      style.textDecoration = "underline";
    }
    return style;
  };

  return (
    <div className={classes.con}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.inputCon}>
          <input
            type="text"
            placeholder="Enter the title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div className={classes.textCon}>
          <textarea
          ref={textAreaRef}
            name="writing"
            id="writing"
            cols="90"
            rows="20"
            placeholder="Start typing..."
            value={text}
            onChange={handleTextChange}
            // style={{ fontSize: fontSize }} // Apply font size
            style={getStyle()}
          ></textarea>
          <p className={classes.remaining}>
            {remainWord}/{maxWords}
          </p>
          
        </div>
        <div className={classes.editorButtons}>
            <button type="button" onClick={handleBoldClick}>
              <LuBold/>
            </button>
            <button type="button" onClick={handleItalicClick}>
              <LuItalic/>
            </button>
            <button type="button" onClick={handleUnderlineClick}>
              <LuUnderline/>
            </button>
            <select value={fontSize} onChange={handleFontSizeChange} className={classes.drop1}>
              <option value="12px">12px</option>
              <option value="14px">14px</option>
              <option value="16px">16px</option>
              {/* Add more options for font sizes */}
            </select>
            <select value={fontFamily} onChange={handleFontFamilyChange} className={classes.drop1}>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Arial">Arial</option>
              <option value="Courier New">Courier New</option>
              {/* Add more font family options as needed */}
            </select>
          </div>
        <div className={classes.butn}>
          <button type="submit">Upload</button>
        </div>
      </form>

      {/* <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga molestias quod quos odio quia autem hic nobis consectetur? Nesciunt eum necessitatibus harum odit, voluptates amet quasi beatae repudiandae maxime impedit optio nihil culpa laboriosam similique ducimus repellat. Blanditiis mollitia debitis dolores fugiat tenetur temporibus fugit neque odit incidunt? Accusantium dolorem incidunt facere cum alias dolore magnam esse veniam quis pariatur. Repellendus neque voluptas accusantium, iusto eos consequuntur tenetur tempora id qui ullam doloremque a officiis esse ipsam, doloribus explicabo obcaecati minus, officia aperiam velit ea odit provident facilis. Quos reprehenderit iusto earum beatae atque numquam obcaecati eos ipsum accusamus aperiam qui placeat libero porro, distinctio, nemo assumenda consectetur eum perspiciatis delectus ad. Saepe nostrum corporis nulla velit eligendi laborum quis dignissimos dolores laudantium consequatur earum modi nesciunt porro animi commodi asperiores impedit sapiente, laboriosam voluptates totam perferendis et explicabo voluptatum. At modi alias doloremque incidunt eum assumenda nesciunt a perferendis libero. Distinctio sunt nam accusantium nemo inventore. Dignissimos, error est incidunt nostrum expedita inventore corrupti maxime officiis vel corporis commodi odio quas voluptatum ad doloribus aperiam, optio repellendus deserunt non vero facilis quam. Molestiae facere officia cumque a autem commodi sed sint. Voluptatibus sequi fugit, nostrum nam quos quas labore repellat, animi molestias voluptatum laboriosam. Deleniti, aspernatur est ad ut accusantium eum quaerat! Repellat quod excepturi in consequatur placeat suscipit ut nemo. Nostrum natus nobis quidem ratione delectus tenetur facilis cupiditate omnis ab non nihil voluptatem, autem hic quo quod mollitia harum quae perferendis! Sint fuga voluptate ipsum corrupti accusantium.</p> */}
    </div>
  );
};

export default TextPage;
