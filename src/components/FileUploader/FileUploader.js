import React, { useCallback, useState, useEffect, Fragment } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
// import { createUseStyles } from 'react-jss';
// import ButtonBasic from 'rdx/build/elements/Buttons/Button';
import { Icon, Progress, Button } from 'semantic-ui-react';
import ImagePreview from '../ImagePreview/ImagePreview';

// const useStyles = createUseStyles({
//   dropzone: {
//     border: '.17em dashed #ccc',
//     padding: '1em',
//     color: 'grey',
//   },
//   marginBottom: {
//     marginBottom: '.5em',
//   },
//   marginTop: {
//     marginTop: '1em',
//   },
//   greenColor: {
//     color: 'green',
//   },
//   redColor: {
//     color: 'red',
//   },
// });

function FileUploader({
  uploadUrl,
  validExtensionList,
  uploaderText,
  onSuccess,
  onFailure,
  onProgress,
}) {
//   const classes = useStyles();
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const [customResultMessage, setCustomResultMessage] = useState({
    message: '',
    iconClass: '',
    // iconColorClass: '',
    imageUrl: undefined,
    contour: undefined,
  });
  const [isUploadDisabled, setIsUploadDisabled] = useState(true);
  const [isUploadComplete, setIsUploadComplete] = useState(false);

  const onFileDialogCancel = useCallback(() => {
    setAcceptedFiles([]);
    setUploadPercentage(0);
    setCustomResultMessage({ message: '', iconClass: '', iconColorClass: '' });
  });

  const onDropAccepted = useCallback((files) => {
    setAcceptedFiles(files);
    setUploadPercentage(0);
    setCustomResultMessage({ message: '', iconClass: '', iconColorClass: '' });
  });

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      setIsUploadDisabled(false);
    } else {
      setIsUploadDisabled(true);
    }
  }, [acceptedFiles]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: validExtensionList,
    onFileDialogCancel,
    onDropAccepted,
  });

  const uploadFiles = () => {
    if (acceptedFiles.length <= 0) {
      return;
    }
    setCustomResultMessage({ message: '', iconClass: '', iconColorClass: '' });
    setIsUploadDisabled(true);
    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);

    axios
    //   .post(`/${uploadUrl}`, formData, {
      .post(uploadUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*',
        },
        onUploadProgress: (progressEvent) => {
          const percentageValue = parseInt(
            Math.round((progressEvent.loaded * 100) / progressEvent.total),
            10,
          );
          setUploadPercentage(percentageValue);
          if (onProgress) onProgress(percentageValue, setCustomResultMessage);
          else if (percentageValue >= 100) {
            setCustomResultMessage({ message: 'Validating the File...' });
          }
        },
      })
      .then((res) => {
        setIsUploadDisabled(false);
        if (onSuccess) onSuccess(acceptedFiles, res, setCustomResultMessage);
        else {
          setCustomResultMessage({
            message: 'Upload Successful',
            iconClass: 'icon circle checkmark thin',
            // iconColorClass: classes.greenColor,
            imageUrl: 'https://wallpaperaccess.com/full/359168.jpg',//res.data.image_path.replace('.', 'localhost:5000'),
            contour: res.data.contour,
          });
        }
        setIsUploadComplete(true);
      })
      .catch((err) => {
        // log.error(err);
        setIsUploadDisabled(false);
        if (onFailure) onFailure(acceptedFiles, err, setCustomResultMessage);
        else {
          setCustomResultMessage({
            message: 'Failed to Upload file',
            iconClass: 'icon circle cross thin',
            // iconColorClass: classes.redColor,
          });
        }
      });
  };

  return (
    <>
      <div
        {...getRootProps()}
        className="dropzone marginBottom"
        data-testid="fileUploaderDiv"
        style={{border: '.17em dashed #fff', color: 'grey', padding: '1em' }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>
            {uploaderText.titleText
              ? uploaderText.titleText
              : 'Click here to select the file or drag and drop the selected file.'}
            <br />
            {uploaderText.allowdFileText
              ? uploaderText.allowdFileText
              : 'Allowed file type is'}{' '}
            {validExtensionList}
          </p>
        )}
      </div>
      <div className="marginBottom">
        {acceptedFiles.length ? acceptedFiles[0].name : ''}
      </div>
      <div className="marginBottom marginTop">
        <Button
          size="small"
          secondary
          basic
          type="submit"
          id="uploadFileBtn"
          onClick={uploadFiles}
          content="Upload"
          className="marginTop"
          disabled={isUploadDisabled}
        />
        <span>
          <Icon
            className={`${customResultMessage.iconClass} ${customResultMessage.iconColorClass}`}
          />
          {customResultMessage.message}
        </span>
      </div>
      {/* {uploadPercentage > 0 && uploadPercentage < 100 ? (
        <Progress percent={uploadPercentage} size="tiny" indicating />
      ) : (
        ''
      )} */}

      {isUploadComplete && (
        <ImagePreview imageUrl={customResultMessage.imageUrl} contour= {customResultMessage.contour} />
      )}

      
    </>
  );
}

export default FileUploader;
