import { url } from "../../services/url.service";

export const generateFilePath = (fileName) => {
  return `${url}/uploads/${fileName}`;
};


export const generateQrFilePath = (fileName) => {
  return `${url}/qr${fileName}`;
};
