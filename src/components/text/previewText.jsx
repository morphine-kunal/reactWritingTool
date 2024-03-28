/* eslint-disable react/prop-types */
// import React from 'react'
import { Modal } from "antd";

const PreviewText = ({ item, showPreview, setShowPreview }) => {
  return (
    <div>
      <Modal
        title="Preview"
        centered
        open={showPreview}
        width={1000}
        onCancel={() => setShowPreview(false)}
        footer={null}
      >
        <div>
          <h1>{item.title}</h1>
          <p>{item.text}</p>
        </div>
      </Modal>
    </div>
  );
};

export default PreviewText;
