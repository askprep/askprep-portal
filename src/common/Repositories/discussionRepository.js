import HttpService from '../HttpService';

export async function getRects(obj) {
  try {
    const endpoint = `rects`;
    let res = await HttpService.post(endpoint, obj);
    return res.data;
  } catch (err) {
    console.error(err);
    return {};
  }
}

export async function geteditorData(imagepath) {
  try {
    const endpoint = `ocr`;
    let res = await HttpService.post(endpoint, imagepath);
    return res.data;
  } catch (error) {
    return {};
  }
}
