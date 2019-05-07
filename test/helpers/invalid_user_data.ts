import {
  USERNAME_IS_REQUIRED,
  USERNAME_LENGTH,
  PASSWORD_IS_REQUIRED,
  PASSWORD_LENGTH,
  PASSWORD_SPECIAL_CHAR,
  USERNAME_IS_STRING,
  PASSWORD_IS_STRING,
  USERNAME_SPECIAL_CHAR,
  USERNAME_CHAR,
  USERNAME_NO_CHARS,
  PASSWORD_CHAR,
  PASSWORD_NO_CHARS,
  ROLES_IS_ARRAY,
  ROLE_CHARS_LENGTH,
  ROLES_LENGTH,
  INVALID_UPDATE_OPERATION
} from "@Messages";

const defaultData = [
  [
    { username: undefined, password: undefined, roles: undefined },
    {
      errMsg: USERNAME_IS_STRING
    }
  ],
  [
    { username: "bachars", password: undefined, roles: undefined },
    {
      errMsg: USERNAME_LENGTH
    }
  ],
  [
    { username: "", password: undefined, roles: undefined },
    {
      errMsg: USERNAME_IS_REQUIRED
    }
  ],
  [
    { username: "bacharssaleh", password: undefined, roles: undefined },
    {
      errMsg: USERNAME_SPECIAL_CHAR
    }
  ],
  [
    { username: "!@#@!%641231", password: undefined, roles: undefined },
    {
      errMsg: USERNAME_CHAR
    }
  ],
  [
    { username: "!!!@#$ A", password: undefined, roles: undefined },
    {
      errMsg: USERNAME_NO_CHARS
    }
  ],
  [
    { username: "!!!@#$ A", password: undefined, roles: undefined },
    {
      errMsg: USERNAME_NO_CHARS
    }
  ],
  [
    { username: "bachar_saleh", password: undefined, roles: undefined },
    {
      errMsg: PASSWORD_IS_STRING
    }
  ],
  [
    { username: "bachar_saleh", password: "123456", roles: undefined },
    {
      errMsg: PASSWORD_LENGTH
    }
  ],
  [
    { username: "bachar_saleh", password: "", roles: undefined },
    {
      errMsg: PASSWORD_IS_REQUIRED
    }
  ],
  [
    { username: "bachar_saleh", password: "ABABABABAB", roles: undefined },
    {
      errMsg: PASSWORD_SPECIAL_CHAR
    }
  ],
  [
    { username: "bachar_saleh", password: "!@#$%^&12", roles: undefined },
    {
      errMsg: PASSWORD_CHAR
    }
  ],
  [
    { username: "bachar_saleh", password: "B123!@#-", roles: undefined },
    {
      errMsg: PASSWORD_NO_CHARS
    }
  ],
  [
    { username: "bachar_saleh", password: "B123!@# ", roles: undefined },
    {
      errMsg: PASSWORD_NO_CHARS
    }
  ],
  [
    { username: "bachar_saleh", password: "B123!@#AAsad", roles: undefined },
    {
      errMsg: ROLES_IS_ARRAY
    }
  ],

  [
    { username: "bachar_saleh", password: "B123!@#AAsad", roles: [""] },
    {
      errMsg: ROLE_CHARS_LENGTH
    }
  ],

  [
    { username: "bachar_saleh", password: "B123!@#AAsad", roles: ["000"] },
    {
      errMsg: ROLE_CHARS_LENGTH
    }
  ],
  [
    {
      username: "bachar_saleh",
      password: "B123!@#AAsad",
      roles: [
        "A",
        "A",
        "B",
        "B",
        "B",
        "B",
        "B",
        "B",
        "B",
        "B",
        "B",
        "B",
        "B",
        "B",
        "B",
        "B",
        "B"
      ]
    },
    {
      errMsg: ROLES_LENGTH
    }
  ]
];

export const invlaidDataForUpdate = [
  [
    { username: undefined, password: undefined, roles: undefined },
    {
      errMsg: INVALID_UPDATE_OPERATION
    }
  ],
  [
    { username: "bachars", password: undefined, roles: undefined },
    {
      errMsg: USERNAME_LENGTH
    }
  ],
  [
    { username: "", password: undefined, roles: undefined },
    {
      errMsg: INVALID_UPDATE_OPERATION
    }
  ],

  [
    { username: "ASDLK ASD!@#12", password: undefined, roles: undefined },
    {
      errMsg: USERNAME_NO_CHARS
    }
  ],

  [
    { username: undefined, password: "#!@#AS", roles: undefined },
    {
      errMsg: PASSWORD_LENGTH
    }
  ],
  [
    { username: undefined, password: " !@#!@dqweS", roles: undefined },
    {
      errMsg: PASSWORD_NO_CHARS
    }
  ],


  [
    { username: "bachar_saleh", password: "B123!@#AAsad", roles: [""] },
    {
      errMsg: ROLE_CHARS_LENGTH
    }
  ],

  [
    { username: "bachar_saleh", password: "B123!@#AAsad", roles: ["000"] },
    {
      errMsg: ROLE_CHARS_LENGTH
    }
  ],
  [
    {
      username: "bachar_saleh",
      password: "B123!@#AAsad",
      roles: [
        "A",
        "A",
        "B",
        "B",
        "B",
        "B",
        "B",
        "B",
        "B",
        "B",
        "B",
        "B",
        "B",
        "B",
        "B",
        "B",
        "B"
      ]
    },
    {
      errMsg: ROLES_LENGTH
    }
  ]

  // ...defaultData.slice(1)
];

export default defaultData;
