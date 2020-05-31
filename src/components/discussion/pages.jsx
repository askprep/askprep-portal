import React, { useState } from 'react';
import FileUploader from '../FileUploader/FileUploader';
import RichTextEditor from './RichTextEditor';
import Rects from '../rects/rects';

export const Pages = ({
  tabDisbled,
  setImageUrl,
  imageUrl,
  imagepath,
  setImagepath,
}) => {
  const [transformImagewidth, settransformImagewidth] = useState(null);
  const [rectangels, setRectangels] = useState(null);

  return (
    <>
      <div style={{ marginLeft: '10px' }}>
        {tabDisbled[0].isActive && (
          <FileUploader
            validExtensionList=".jpg"
            uploadUrl="http://127.0.0.1:5000/fileUpload"
            uploaderText={{
              titleText:
                'Click here to select the file or drag and drop the selected file.',
              allowdFileText: 'Allowed file type is',
            }}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            setImagepath={setImagepath}
            imagepath={imagepath}
          />
        )}
        {tabDisbled[1].isActive && (
          <Rects
            settransformImagewidth={settransformImagewidth}
            imageUrl={imageUrl}
            imagepath={imagepath}
            setRectangels={setRectangels}
            rectangels={rectangels}
          />
        )}
        {tabDisbled[2].isActive && (
          <RichTextEditor
            rectangels={rectangels}
            transformImagewidth={transformImagewidth}
            imageUrl={imageUrl}
            imagepath={imagepath}
          />
        )}
      </div>
    </>
  );
};
