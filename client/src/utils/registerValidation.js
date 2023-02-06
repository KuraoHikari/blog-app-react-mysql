export const registerValidation = (payload) => {
  const regex = /^\s*$/;
  const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let validateData = {
    validate: true,
    message: '',
  };
  // username: 'admin', email: 'sss@gmail.com', password: '12345678'

  for (const property in payload) {
    if (payload[property].match(regex)) {
      console.log(`${property}: ${payload[property]}`);
      validateData.validate = false;
      validateData.message = `${property} is required`;
      break;
    }
  }
  if (payload?.password.length < 8) {
    validateData.validate = false;
    validateData.message = `minimum password requirement is 8 character`;
  } else if (!payload?.email.match(regexEmail)) {
    validateData.validate = false;
    validateData.message = `email is required`;
  }

  return validateData;
};
