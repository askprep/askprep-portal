import React, { useState, useEffect, useRef } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import './rects.css';
import { getRects } from '../../common/Repositories/discussionRepository';

const Rects = ({
  imageUrl,
  imagepath,
  settransformImagewidth,
  rectangels,
  setRectangels,
}) => {
  const transformedImageContainer = useRef(null);
  useEffect(() => {
    settransformImagewidth(transformedImageContainer.current.offsetWidth);
    async function fetchData() {
      let rectanglesarray = await getRects({
        image_path: imagepath,
        max_width: transformedImageContainer.current.offsetWidth,
      });
      setRectangels(
        rectanglesarray && rectanglesarray.length > 0
          ? [...rectanglesarray]
          : [],
      );
    }
    fetchData();
  }, []);

  const changeType = (type, index) => {
    switch (type) {
      case 'image':
        setRectangels([...rectangels, (rectangels[index].type = 'image')]);
        break;
      case 'text':
        setRectangels([...rectangels, (rectangels[index].type = 'text')]);
        break;
      case 'remove':
        setRectangels([...rectangels, (rectangels[index].type = '')]);
        break;

      default:
        break;
    }
  };
  return (
    <Grid.Column width={4}>
      <div
        ref={transformedImageContainer}
        style={{
          width: '50%',
          position: 'relative',
          display: 'inline - block',
        }}
      >
        <img
          style={{
            width: '100%',
          }}
          src={imageUrl && imageUrl.concat('?').concat(Math.random())}
        />
        {rectangels &&
          rectangels.length > 0 &&
          rectangels.map((item, index) => {
            return (
              <>
                <div
                  className="selectedSection"
                  key={index}
                  style={{
                    position: 'absolute',
                    zIndex: 999,
                    margin: '0 auto',
                    left: `${item.left}px`,
                    right: `${item.right}px`,
                    textAlign: 'center',
                    top: `${item.top}px`,
                    border: '2px solid lightgreen',
                    fontFamily: 'Arial,sans-serif',
                    width: `${item.width}px`,
                    height: `${item.height}px`,
                  }}
                >
                  <span className="edit">
                    <Button.Group>
                      <Button
                        onClick={() => changeType('image', index)}
                        positive={item.type === 'image' ? true : false}
                      >
                        Image
                      </Button>
                      <Button.Or />
                      <Button
                        onClick={() => changeType('text', index)}
                        positive={item.type === 'text' ? true : false}
                      >
                        Text
                      </Button>
                      <Button.Or />
                      <Button
                        onClick={() => changeType('remove', index)}
                        color="red"
                      >
                        Remove
                      </Button>
                    </Button.Group>
                    {/* <a href="#">
                      <Icon name="image" size="large" />
                    </a>
                    <a href="#">
                      <Icon name="edit outline" size="large" />
                    </a> */}
                  </span>
                </div>
              </>
            );
          })}
      </div>
    </Grid.Column>
  );
};

export default Rects;
