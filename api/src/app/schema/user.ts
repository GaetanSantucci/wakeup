const userSchema = {
  type: "object",
  properties: {
    email: { type: "string", pattern: '^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$' },
    password: { type: 'string', pattern: '^(?=.*[0-9])(?=.*[-a-z])(?=.*[-A-Z]).{8,}$' },
    // confirmPassword: { type: 'string' },
    lastname: { type: "string" },
    firstname: { type: "string" },
    address: {
      type: "object",
      properties: {
        label: {
          type: "string"
        },
        complement: {
          type: "string"
        },
        city: {
          "type": "string"
        },
        zipcode: {
          "type": "string",
          "pattern": "^63\\d{3}$"
        }
      },
      required: ["label", "city", "zipcode"]
    },
    phone: { type: "string" },
    role: { type: 'string' },
    newsletter_optin: { type: 'boolean' }
  },
  required: ['email', 'password', 'lastname', 'firstname', 'address', 'phone'],
  additionalProperties: false
}

const userSchemaUpdated = {
  type: "object",
  properties: {
    email: { type: "string", pattern: '^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$' },
    password: { type: 'string', pattern: '^(?=.*[0-9])(?=.*[-a-z])(?=.*[-A-Z]).{8,}$' },
    // confirmPassword: { type: 'string' },
    lastname: { type: "string" },
    firstname: { type: "string" },
    address: {
      type: "object",
      properties: {
        label: {
          type: "string"
        },
        complement: {
          type: "string"
        },
        city: {
          "type": "string"
        },
        zipcode: {
          "type": "string",
          "pattern": "^63\\d{3}$"
        }
      },
      required: ["label", "city", "zipcode"]
    },
    phone: { type: "string" },
    role: { type: 'string' },
    newsletter_optin: { type: 'boolean' }
  },
  required: [],
  additionalProperties: false
}

export { userSchema, userSchemaUpdated }