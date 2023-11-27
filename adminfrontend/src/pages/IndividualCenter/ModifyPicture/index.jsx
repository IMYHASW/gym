import { React, useState } from "react";
import { Divider, message, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

import "../modify.css";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("只能上传JPG或PNG格式的文件！");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("图片不能大于 2MB！");
  }
  return isJpgOrPng && isLt2M;
};

export default function ModifyPicture() {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  return (
    <div className="modify">
      <div className="modify-header">
        <div className="modify-header-left">
          <span>修改头像</span>
        </div>
      </div>
      <Divider />
      <div className="modify-container">
        <div className="modify-container-left">
          <div className="modify-container-left-title">
            <span>上传头像</span>
          </div>
          <div className="modify-container-left-container">
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={handleChange}>
                {imageUrl ? (<img src={imageUrl} alt="avatar" style={{width:'100%'}}/>) : (uploadButton)}
              </Upload>
          </div>
        </div>
        <div className="modify-container-right">
          <div className="modify-container-right-title">
            <span>头像预览</span>
          </div>
        </div>
      </div>
    </div>
  );
}
