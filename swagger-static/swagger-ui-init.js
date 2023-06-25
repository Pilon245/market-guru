
window.onload = function() {
  // Build a system
  let url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  let options = {
  "swaggerDoc": {
    "openapi": "3.0.0",
    "paths": {
      "/users": {
        "get": {
          "operationId": "UsersController_getUsers",
          "summary": "Get All Users",
          "parameters": [
            {
              "name": "searchEmailTerm",
              "required": false,
              "in": "query",
              "description": "Поиск по почте",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "searchPhoneTerm",
              "required": false,
              "in": "query",
              "description": "Поиск по номеру телефона",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "searchNameTerm",
              "required": false,
              "in": "query",
              "description": "Поиск по имени",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "sortDirection",
              "required": false,
              "in": "query",
              "description": "По возрастанию/убыванию",
              "schema": {
                "enum": [
                  "asc",
                  "desc"
                ],
                "type": "string"
              }
            },
            {
              "name": "sortBy",
              "required": false,
              "in": "query",
              "description": "Поле по которому сортировать",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "pageSize",
              "required": false,
              "in": "query",
              "description": "Количество элементов на странице",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "pageNumber",
              "required": false,
              "in": "query",
              "description": "Параметр номер страницы",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/IResponseUser"
                  }
                }
              }
            }
          },
          "tags": [
            "Users"
          ]
        },
        "post": {
          "operationId": "UsersController_createUsers",
          "summary": "Create User",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateUserInputModel"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/GetUsers"
                  }
                }
              }
            },
            "400": {
              "description": "In Body incorrect data",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/CreateUserError"
                  }
                }
              }
            }
          },
          "tags": [
            "Users"
          ]
        }
      },
      "/users/{id}": {
        "put": {
          "operationId": "UsersController_updateUsers",
          "summary": "Update User",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateUserInputModel"
                }
              }
            }
          },
          "responses": {
            "204": {
              "description": "No Content"
            },
            "404": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/UpdateUserError"
                  }
                }
              }
            }
          },
          "tags": [
            "Users"
          ]
        },
        "delete": {
          "operationId": "UsersController_deleteUsers",
          "summary": "Delete User",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "204": {
              "description": "No Content"
            },
            "404": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/UpdateUserError"
                  }
                }
              }
            }
          },
          "tags": [
            "Users"
          ]
        }
      },
      "/users/test/all-delete": {
        "delete": {
          "operationId": "UsersController_deleteAllUsers",
          "summary": "Delete All{testing}",
          "parameters": [],
          "responses": {
            "204": {
              "description": "No Content"
            }
          },
          "tags": [
            "Users"
          ]
        }
      },
      "/auth/login": {
        "post": {
          "operationId": "AuthController_singInAccount",
          "summary": "Login Request",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/loginBodyType"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/loginType"
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ErrorCode4__"
                  }
                }
              }
            },
            "429": {
              "description": "5 Запросов за 10 секунд"
            }
          },
          "tags": [
            "Auth"
          ]
        }
      },
      "/auth/refresh-token": {
        "post": {
          "operationId": "AuthController_updateRefreshToken",
          "summary": "New Refresh Token",
          "parameters": [],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/loginType"
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ErrorCode4__"
                  }
                }
              }
            },
            "429": {
              "description": "5 Запросов за 10 секунд"
            }
          },
          "tags": [
            "Auth"
          ]
        }
      },
      "/auth/me": {
        "get": {
          "operationId": "AuthController_myAccount",
          "summary": "My account",
          "parameters": [],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/GetMyAccount"
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ErrorCode4__"
                  }
                }
              }
            }
          },
          "tags": [
            "Auth"
          ]
        }
      }
    },
    "info": {
      "title": "REST API",
      "description": "1. Поднять и настроить веб приложение на nestjs\n2. Подключить sequelize или sequelize typescript, настроить подключение к базе postgresql, создать модель User, написать миграцию.\n   Базу можно поднять локально в docker.\n3. Написать CRUD функционал к user, c валидацией входных параметров.\n   Так же нужно реализовать функционал getAll, с поддержкой постраничной отдачи данных и поиском по нескольким полям: \"mail\", 'name' etc.\n4. Реализовать возможность регистрации и авторизации пользователя с помощью email и password, или телефон и пароль.\n   Авторизация должна поддерживать оба поля для возможности входа.\n   При добавлении пользователем почты, при первоначальной регистрации с помощью телефона,\n   он так же должен иметь возможность залогинится используя почту, и наоборот.\n5. Наcтроить модуль swagger для генерации документации и включить его в проект.",
      "version": "1.0",
      "contact": {}
    },
    "tags": [
      {
        "name": "MarketGuru",
        "description": ""
      }
    ],
    "servers": [],
    "components": {
      "schemas": {
        "GetUsers": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            },
            "name": {
              "type": "string"
            },
            "email": {
              "type": "string"
            },
            "phone": {
              "type": "string"
            },
            "createdAt": {
              "type": "string"
            }
          },
          "required": [
            "id",
            "name",
            "email",
            "phone",
            "createdAt"
          ]
        },
        "IResponseUser": {
          "type": "object",
          "properties": {
            "pagesCount": {
              "type": "number"
            },
            "page": {
              "type": "number"
            },
            "pageSize": {
              "type": "number"
            },
            "totalCount": {
              "type": "number"
            },
            "items": {
              "$ref": "#/components/schemas/GetUsers"
            }
          },
          "required": [
            "pagesCount",
            "page",
            "pageSize",
            "totalCount",
            "items"
          ]
        },
        "CreateUserInputModel": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "password": {
              "type": "string"
            },
            "email": {
              "type": "string"
            },
            "phone": {
              "type": "string"
            }
          },
          "required": [
            "name",
            "password"
          ]
        },
        "CreateUserError": {
          "type": "object",
          "properties": {
            "statusCode": {
              "type": "number"
            },
            "message": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "error": {
              "type": "string"
            }
          },
          "required": [
            "statusCode",
            "message",
            "error"
          ]
        },
        "UpdateUserInputModel": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "email": {
              "type": "string"
            },
            "phone": {
              "type": "string"
            }
          },
          "required": [
            "name"
          ]
        },
        "UpdateUserError": {
          "type": "object",
          "properties": {
            "statusCode": {
              "type": "number"
            },
            "message": {
              "type": "string"
            }
          },
          "required": [
            "statusCode",
            "message"
          ]
        },
        "loginBodyType": {
          "type": "object",
          "properties": {
            "login": {
              "type": "string",
              "default": "+79090201199"
            },
            "password": {
              "type": "string",
              "default": "12345678"
            }
          },
          "required": [
            "login",
            "password"
          ]
        },
        "loginType": {
          "type": "object",
          "properties": {
            "accessToken": {
              "type": "string"
            }
          },
          "required": [
            "accessToken"
          ]
        },
        "ErrorCode4__": {
          "type": "object",
          "properties": {
            "statusCode": {
              "type": "number"
            },
            "message": {
              "type": "string"
            }
          },
          "required": [
            "statusCode",
            "message"
          ]
        },
        "GetMyAccount": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            },
            "name": {
              "type": "string"
            },
            "email": {
              "type": "string"
            },
            "phone": {
              "type": "string"
            },
            "createdAt": {
              "type": "string"
            }
          },
          "required": [
            "id",
            "name",
            "email",
            "phone",
            "createdAt"
          ]
        }
      }
    }
  },
  "customOptions": {}
};
  url = options.swaggerUrl || url
  let urls = options.swaggerUrls
  let customOptions = options.customOptions
  let spec1 = options.swaggerDoc
  let swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (let attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  let ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.initOAuth) {
    ui.initOAuth(customOptions.initOAuth)
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }
  
  window.ui = ui
}
