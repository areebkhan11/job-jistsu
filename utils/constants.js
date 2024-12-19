exports.STATUS_CODES = Object.freeze({
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
});

exports.ROLES = Object.freeze({
  ADMIN: "admin",
  MANAGER: "manager",
  TEAM_LEAD: "team lead",
  EMPLOYEE: "employee",
});

exports.ROLES_TYPE = Object.freeze({
  INSPECTOR: "inspector",
  DRIVER: "driver",
  CLEANER: "cleaner",
  TEAM_LEAD: "team lead",
  MANAGER: "manager",
  ADMIN: "admin",
});
