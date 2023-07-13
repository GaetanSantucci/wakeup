const userSchema = {
  type: "object",
  properties: {
    email: { type: "string", pattern: '^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$' },
    password: { type: 'string', pattern: '^(?=.*[0-9])(?=.*[-a-z])(?=.*[-A-Z]).{8,}$' },
    lastname: { type: "string" },
    firstname: { type: "string" },
    phone: { type: "string" },
    address: {
      type: "object",
      properties: {
        label: {
          type: "string"
        },
        name: {
          type: "string"
        },
        complement: {
          type: "string"
        },
        city: {
          type: "string"
        },
        postcode: {
          type: "string",
          pattern: "^63\\d{3}$"
        }
      },
    },
    role: { type: 'string' },
    newsletter_optin: { type: 'boolean' },
  },
  required: [],
  additionalProperties: false
}

const userSchemaUpdated = {
  type: "object",
  properties: {
    id: { type: "string" },
    email: { type: "string", pattern: '^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$' },
    password: { type: 'string', pattern: '^(?=.*[0-9])(?=.*[-a-z])(?=.*[-A-Z]).{8,}$' },
    confirmPwd: { type: 'string' },
    lastname: { type: "string" },
    firstname: { type: "string" },
    phone: { type: "string" },
    address: {
      type: "object",
      properties: {
        label: {
          type: "string"
        },
        name: {
          type: "string"
        },
        complement: {
          type: "string"
        },
        city: {
          type: "string"
        },
        postcode: {
          type: "string",
          pattern: "^63\\d{3}$"
        }
      },
    },
    role: { type: 'string' },
    newsletter_optin: { type: 'boolean' },
  },
  required: [],
  additionalProperties: false
}

export { userSchema, userSchemaUpdated }