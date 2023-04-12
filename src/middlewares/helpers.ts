import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";

const _EncryptInternalData = (data: any) => {
  try {
    // Encrypt
    const dataToCrypt = JSON.stringify(data);
    const ciphertext = CryptoJS.AES.encrypt(dataToCrypt, String(process.env.KEYPRIVATE)).toString();
    return ciphertext;
  } catch (error) {
    throw new Error(String(error));
  }
};

export const _DecryptInternalData = (data: any) => {
  try {
    // Decrypt
    const bytes = CryptoJS.AES.decrypt(data, String(process.env.KEYPRIVATE));
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    const returnObject = JSON.parse(originalText);
    return returnObject;
  } catch (error) {
    throw new Error(String(error));
  }
};

export const GenerateToken = (data: any) => {
  try {
    const token = jwt.sign(
      _EncryptInternalData(data),
      "String(process.env.KEYPRIVATE)"
    );
    return token;
  } catch (error) {
    throw new Error("Error generating token: " + error);
  }
};

export interface currentUser {  
  token: string;
}