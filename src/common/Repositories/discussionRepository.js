import HttpService from '../HttpService';

export async function getRects(obj) {
  try {
    console.log('Rectangles:', obj);
    const endpoint = `rects`;
    let res = await HttpService.post(endpoint, obj);
    return res.data;
  } catch (err) {
    console.error(err);
    return {};
  }
}

export async function geteditorData(imageObj) {
  try {
    console.log('Image Object:', imageObj);
    const endpoint = `ocr`;
    let res = await HttpService.post(endpoint, imageObj);
    return res.data;
  } catch (error) {
    return {};
  }
}
