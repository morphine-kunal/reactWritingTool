/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { Modal, Card } from "antd";
import classes from "./home.module.css";
import { IoTextOutline, IoImageOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import BlockContext from "../../Store/block-context";
import PreviewText from "../text/previewText";
import { LuPen, LuTrash2 } from "react-icons/lu";

const Homepage = ({ showModal, setShowModal }) => {
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [imgTitle, setImgTitle] = useState("");
  const [imgAbout, setImgAbout] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showEdit, setShowEdit] = useState(false);

  const blockCtx = useContext(BlockContext);
  const { Meta } = Card;
  const history = useNavigate();

  const handleChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleSubmit = () => {
    const data = {
      id: Math.random() * 10,
      type: "image",
      image: image,
      title: imgTitle,
      about: imgAbout,
    };
    blockCtx.addBlock(data);
    setModalVisible(false);
    setImage(null);
  };

  const handleClick = () => {
    setModalVisible(true);
    setShowModal(false);
  };

  const handleDivClick = () => {
    document.getElementById("file-input").click();
  };

  const handleClose = () => {
    setModalVisible(false);
    setImage(null);
  };

  const handleTextCardClick = (item) => {
    setSelectedItem(item);
    setShowPreview(true);
  };

  const handleClickEdit = (index) => {
    history(`/text?edit=${index}`);
  };

  const handleDelete = (index) => {
    blockCtx.deleteBlock(index);
  };

  return (
    <div
      style={{
        width: "98%",
        marginLeft: "auto",
        marginRight: "auto",
        display: "flex",
        // justifyContent: "center",
        marginTop: "15px",
      }}
    >
      {blockCtx.items.length === 0 && (
        <button className={classes.btn} onClick={() => setShowModal(true)}>
          Add Block
        </button>
      )}

      <Modal
        title={null}
        centered
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
      >
        <div className={classes.inmodal}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Link to={"/text"}>
              <button
                style={{
                  width: "102px",
                  height: "102px",
                  border: "1px dashed #ccc",
                  backgroundColor: "white",
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
              >
                <IoTextOutline style={{ width: "50%", height: "50%" }} />
              </button>
            </Link>
            <p>Write your Thoughts</p>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className={classes.fileCon}>
              <button
                style={{
                  width: "102px",
                  height: "102px",
                  border: "1px dashed #ccc",
                  backgroundColor: "white",
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
                onClick={handleClick}
              >
                <IoImageOutline style={{ width: "50%", height: "50%" }} />
              </button>
            </div>
            <p>Import image from device</p>
          </div>
        </div>
      </Modal>

      <Modal
        title="Add Image"
        centered
        open={modalVisible}
        onCancel={handleClose}
        footer={null}
        width={440}
      >
        <div className={classes.modal2Con}>
          <div className={classes.modalinputCon} onClick={handleDivClick}>
            <input
              type="file"
              id="file-input"
              accept="image/*"
              onChange={handleChange}
              className={classes.input}
            />
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                style={{
                  width: "50px",
                  height: "50px",
                  fontWeight: "lighter",
                  margin: "auto",
                  cursor: "pointer",
                  borderRadius: "50%",
                }}
              />
            ) : (
              <IoImageOutline
                style={{
                  width: "50px",
                  height: "50px",
                  fontWeight: "lighter",
                  margin: "auto",
                  cursor: "pointer",
                }}
                onClick={handleDivClick}
              />
            )}
          </div>

          <input
            type="text"
            placeholder="Enter Title"
            className={classes.input2}
            value={imgTitle}
            onChange={(e) => setImgTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="About image"
            className={classes.input3}
            value={imgAbout}
            onChange={(e) => setImgAbout(e.target.value)}
          />

          <div className={classes.btnCon}>
            <button onClick={handleSubmit}>Upload</button>
          </div>
        </div>
      </Modal>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {blockCtx.items &&
          blockCtx.items.map((item, index) => (
            <div key={index}>
              {item.type === "text" && (
                <div
                  style={{ position: "relative" }}
                  onMouseEnter={() => setShowEdit(true)}
                  onMouseLeave={() => setShowEdit(false)}
                >
                  <Card
                    hoverable
                    title={
                      <span style={{ fontSize: "1.2rem" }}>{item.title}</span>
                    }
                    bordered={false}
                    style={{
                      width: 240,
                      height: 334,
                      cursor: "pointer",
                      position: "relative",
                    }}
                    className={classes.card}
                    onClick={() => handleTextCardClick(item)}
                  >
                    <p className={classes.text}>{item.text}</p>
                  </Card>
                  {showEdit && (
                    <div className={classes.edit}>
                      <button onClick={() => handleClickEdit(index)}>
                        <LuPen />
                      </button>

                      <button onClick={() => handleDelete(item.id)}>
                        <LuTrash2 />
                      </button>
                    </div>
                  )}
                </div>
              )}
              {item.type === "image" && (
                <div>
                  <Card
                    hoverable
                    style={{
                      width: 240,
                      height: 334,
                      position: "relative",
                      boxShadow:'0px 0px 10px rgba(255, 255, 255, 0.5)'
                    }}
                    onMouseEnter={() => setShowEdit(true)}
                    onMouseLeave={() => setShowEdit(false)}
                    cover={
                      <img
                        alt="example"
                        src={URL.createObjectURL(item.image)}
                        style={{ height: "240px" }}
                      />
                    }
                  >
                    <Meta title={item.title} description={item.about} />
                    {showEdit && <button
                      onClick={() => handleDelete(item.id)}
                      className={classes.del}
                    >
                      <LuTrash2 />
                    </button>}
                  </Card>
                </div>
              )}
            </div>
          ))}
      </div>
      {showPreview && (
        <PreviewText
          item={selectedItem}
          showPreview={showPreview}
          setShowPreview={setShowPreview}
        />
      )}
    </div>
  );
};

export default Homepage;
