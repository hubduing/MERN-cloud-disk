import React from "react";
// eslint-disable-next-line
import { useSelector } from "react-redux";
import "./filelist.css";
import File from "./file/File";

const FileList = () => {
  const files = useSelector((state) => state.files.files).map(file => <File key={file.id} file={file} />)
  // const files = [
  //   { _id: 1, name: "direc", type: "dir", size: "5gb", date: "26.01.2022" },
  //   { _id: 2, name: "direc2", type: "jpg", size: "5gb", date: "26.01.2022" },
  //   { _id: 3, name: "direc3", type: "dir", size: "5gb", date: "26.01.2022" },
  //   { _id: 4, name: "direc4", type: "dir", size: "5gb", date: "26.01.2022" },
  // ].map((file) => <File file={file} key={file.id} />);
  return (
    <div className="filelist">
      <div className="filelist__header">
        <div className="filelist__name">Название</div>
        <div className="filelist__date">Дата</div>
        <div className="filelist__size">Размер</div>
      </div>
      {files}
    </div>
  );
};

export default FileList;
