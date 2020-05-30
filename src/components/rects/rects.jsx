import React, { useState, useEffect } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import './rects.css';
import { getRects } from '../../common/Repositories/discussionRepository';

const Rects = ({ imageUrl, imagepath }) => {
  const [rectangleTypes, setrectangleTypes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let rectangles = await getRects({
        image_path: imagepath,
      });
      setrectangleTypes(
        rectangles && rectangles.length > 0 ? [...rectangles] : [],
      );
    }
    fetchData();
  }, []);
  const changeType = (type, index) => {
    switch (type) {
      case 'image':
        setrectangleTypes([
          ...rectangleTypes,
          (rectangleTypes[index].type = 'image'),
        ]);
        break;
      case 'text':
        setrectangleTypes([
          ...rectangleTypes,
          (rectangleTypes[index].type = 'text'),
        ]);
        break;
      case 'remove':
        setrectangleTypes([
          ...rectangleTypes,
          (rectangleTypes[index].type = ''),
        ]);
        break;

      default:
        break;
    }
  };
  return (
    <Grid.Column width={4}>
      <div
        style={{
          position: 'relative',
          display: 'inline - block',
        }}
      >
        <img src={imageUrl && imageUrl.concat('?').concat(Math.random())} />
        {rectangleTypes &&
          rectangleTypes.length > 0 &&
          rectangleTypes.map((item, index) => {
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
