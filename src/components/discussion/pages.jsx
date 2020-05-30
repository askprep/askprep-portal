import React, { useState } from 'react';
import { Grid } from 'semantic-ui-react';
import FileUploader from '../FileUploader/FileUploader';
import RichTextEditor from './RichTextEditor';
import Rects from '../rects/rects';

export const Pages = ({ tabDisbled, setImageUrl, imageUrl }) => {
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
          />
        )}
        {tabDisbled[1].isActive && <Rects imageUrl={imageUrl} />}
        {tabDisbled[2].isActive && <RichTextEditor imageUrl={imageUrl} />}
      </div>
    </>
  );
};
