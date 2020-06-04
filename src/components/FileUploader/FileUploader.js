import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
// import { createUseStyles } from 'react-jss';
// import ButtonBasic from 'rdx/build/elements/Buttons/Button';
import { Icon, Progress, Button } from 'semantic-ui-react';
import ImagePreview from '../ImagePreview/ImagePreview';
import { imageTransform } from '../../common/Repositories/discussionRepository';

function FileUploader({
  validExtensionList,
  uploaderText,
  onSuccess,
  onFailure,
  onProgress,
  setImageUrl,
  imageUrl,
  setImagepath,
  imagepath,
}) {
  //   const classes = useStyles();
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const [customResultMessage, setCustomResultMessage] = useState({
    message: '',
    iconClass: '',
    // iconColorClass: '',
    // imageUrl: undefined,
  });

  const [contour, setContour] = useState(undefined);
  const [isUploadDisabled, setIsUploadDisabled] = useState(true);
  const [isUploadComplete, setIsUploadComplete] = useState(false);
  const [isTransformComplete, setIsTransformComplete] = useState(false);
  const [svgContainerWidth, setSvgContainerWidth] = useState(0);
  const svgContainer = useRef(null);

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

  useEffect(() => {
    setSvgContainerWidth(svgContainer.current.offsetWidth);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: validExtensionList,
    onFileDialogCancel,
    onDropAccepted,
  });

  const uploadFiles = () => {
    if (acceptedFiles.length <= 0) {
      return;
    }
    setIsUploadComplete(false);
    setIsTransformComplete(false);
    setCustomResultMessage({ message: '', iconClass: '', iconColorClass: '' });
    setIsUploadDisabled(true);
    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);
    formData.append('max_width', svgContainerWidth);

    axios
      .post(`${window.API_HOST_OCR}/fileUpload`, formData, {
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
            height: res.data.height,
            width: res.data.width,
          });
          setContour(res.data.contour);
          setImagepath(res.data.image_path);
          setImageUrl(
            res.data.image_path.replace('.', 'http://localhost:5000'),
          );
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

  const transformFile = (fileData) => async () => {
    try {
      let transformImage = await imageTransform(fileData);
      if (transformImage) {
        setIsTransformComplete(true);
      } else {
        setIsTransformComplete(false);
      }
    } catch (error) {
      setIsTransformComplete(false);
      console.log(error);
    }
  };

  return (
    <>
      <div
        {...getRootProps()}
        className="dropzone marginBottom"
        data-testid="fileUploaderDiv"
        style={{ border: '.17em dashed #fff', color: 'grey', padding: '1em' }}
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
      <div ref={svgContainer} style={{ position: 'relative' }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style={{
            width: customResultMessage.width,
            height: customResultMessage.height,
          }}
        >
          {isUploadComplete && (
            <ImagePreview contour={contour} setContour={setContour} />
          )}
        </svg>
        <img
          src={imageUrl}
          style={{
            width: customResultMessage.width,
            height: customResultMessage.height,
            position: 'absolute',
            left: 0,
            zIndex: '-1111',
          }}
        />
      </div>

      <Button
        size="small"
        secondary
        basic
        type="submit"
        id="uploadFileBtn"
        onClick={transformFile({
          contour: contour,
          image_path: imagepath,
          max_width: svgContainerWidth,
        })}
        content="Transform"
      />
      <br />
      {isTransformComplete && (
        <img
          src={imageUrl && imageUrl.concat('?').concat(Math.random())}
          style={{
            width: customResultMessage.width,
            height: customResultMessage.height,
            position: 'absolute',
            left: 0,
            zIndex: '-1111',
          }}
        />
      )}
    </>
  );
}

export default FileUploader;
