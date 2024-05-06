const createUserValidationSchema = {
  email: {
    notEmpty: {
      errorMessage: "email is required",
    },
    isString: {
      errorMessage: "email must be a string",
    },
  },
  fullName: {
    notEmpty: {
      errorMessage: "Full name is required",
    },
    isString: {
      errorMessage: "Full name must be a string",
    },
  },
  password: {
    isLength: {
      options: {
        min: 8,
        max: 16,
      },
      errorMessage:
        "password must be at least 8 characters with a max of 16 characters",
    },
    notEmpty: {
      errorMessage: "password is required",
    },
  },
};

const userLoginValidationSchema = {
  email: {
    notEmpty: {
      errorMessage: "email is required",
    },
    isString: {
      errorMessage: "email must be a string",
    },
  },
  password: {
    isLength: {
      options: {
        min: 8,
        max: 16,
      },
      errorMessage:
        "password must be at least 8 characters with a max of 16 characters",
    },
    notEmpty: {
      errorMessage: "password is required",
    },
  },
};

export { createUserValidationSchema, userLoginValidationSchema };
