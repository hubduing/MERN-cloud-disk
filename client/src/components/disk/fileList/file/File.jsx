import React from 'react';
import './file.css';
import DirLogo from '../../../../assets/img/dir.svg';
import FileLogo from '../../../../assets/img/file.svg';

const File = ({file}) => {
  return (
    <div className='file'>
      <img src={file.type === 'dir' ? DirLogo : FileLogo} alt="" className="file__img" />
      <div className="file__name">{file.name}</div>
      <div className="file__date">{file.date}</div>
      <div className="file__size">{file.size}</div>
    </div>
  );
};

export default File;
