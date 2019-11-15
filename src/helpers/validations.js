/* eslint-disable prefer-promise-reject-errors */
export const validatePhoneInputLength = form => (rule, value, callback) => {
  if (form) {
    const fieldsToCheck = ["contactNo"];
    const { contactNo } = form.getFieldsValue(fieldsToCheck);
    if (
      contactNo
        .replace("+", "")
        .replace("-", "")
        .replace(" ", "")
        .toString().length < 9
    ) {
      callback("Phone number must be 9 to 10 digits");
    } else {
      form.setFields({
        contactNo: {
          value,
          errors: []
        }
      });
      callback();
    }
  }
};

export const validateBankAccountNumberInputLength = (form, maxLength) => (
  rule,
  value,
  callback
) => {
  if (form) {
    const fieldsToCheck = ["bankAccountNumber"];
    const { bankAccountNumber } = form.getFieldsValue(fieldsToCheck);
    if (bankAccountNumber && bankAccountNumber.toString().length > maxLength) {
      callback(
        `Bank account number must not be more than ${maxLength} digits.`
      );
    } else if (typeof bankAccountNumber === "string") {
      callback(`Bank account number must only be number.`);
    } else {
      form.setFields({
        bankAccountNumber: {
          value,
          errors: []
        }
      });
      callback();
    }
  }
};

// https://programmingwithmosh.com/javascript/react-file-upload-proper-server-side-nodejs-easy/
export const checkFileSize = (file, sizeInMb = 6) => {
  const size = sizeInMb * 1024 * 1024;
  return new Promise((resolve, reject) => {
    if (file.size > size) {
      return reject(`File is too large and it must not exceed ${sizeInMb}mb`);
    }

    return resolve(true);
  });
};

export const checkMimeType = (file, mediaType = "image") => {
  const imageMimeList = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
  const mediaTypesMap = {
    image: imageMimeList,
    document: ["application/pdf", ...imageMimeList]
  };
  const types = mediaTypesMap[mediaType]
    ? mediaTypesMap[mediaType]
    : mediaTypesMap.image; // default file type is image

  return new Promise((resolve, reject) => {
    if (types.every(type => file.type !== type)) {
      return reject(`${file.type} is not a supported format`);
    }
    return resolve(true);
  });
};

export default {
  validatePhoneInputLength,
  validateBankAccountNumberInputLength,
  checkFileSize,
  checkMimeType
};
