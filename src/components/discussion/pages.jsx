import React, { useState } from 'react';
import FileUploader from '../FileUploader/FileUploader';
import Rects from '../rects/rects';
import { DiscussionForm } from './formDIscussion';
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
          <DiscussionForm
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
