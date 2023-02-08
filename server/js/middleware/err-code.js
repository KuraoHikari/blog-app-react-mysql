const errorCodes = {
  SequelizeValidationError: {
    code: 400,
    message: (err) => {
      return { message: err.errors.map((el) => el.message) };
    },
  },
  SequelizeUniqueConstraintError: {
    code: 400,
    message: (err) => {
      return { message: 'user already exists' };
    },
  },
  UnauthorizedLogin: {
    code: 401,
    message: (err) => {
      return { message: 'email/password invalid' };
    },
  },
  Unauthorized: {
    code: 401,
    message: (err) => {
      return { message: 'Unauthorized' };
    },
  },
  JsonWebTokenError: {
    code: 401,
    message: (err) => {
      return { message: 'Token is not valid' };
    },
  },
  NotFound: {
    code: 404,
    message: (err) => {
      return { message: 'Post not Found' };
    },
  },
  'Forbidden Access': {
    code: 403,
    message: (err) => {
      return { message: 'Forbidden Access' };
    },
  },
  'non Image Format': {
    code: 401,
    message: (err) => {
      return { message: 'file must be in img format' };
    },
  },
  'invalid image': {
    code: 400,
    message: (err) => {
      return { message: 'Please Select an images' };
    },
  },
  SequelizeDatabaseError: {
    code: 400,
    message: (err) => {
      return { message: 'Bad Request' };
    },
  },
  'max image size is 255kb': {
    code: 401,
    message: (err) => {
      return { message: 'max image size is 255kb' };
    },
  },
  default: {
    code: 500,
    message: (err) => {
      return { message: 'Internal Server Error' };
    },
  },
};
module.exports = errorCodes;
