const userSchema = {
    type: "object",
    properties: {
        email: { type: "string", pattern: '^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$' },
        password: { type: 'string', pattern: '^(?=.*[0-9])(?=.*[-a-z])(?=.*[-A-Z]).{8,}$' },
        // confirmPassword: { type: 'string' },
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
        role: { type: 'string' }
    },
    required: ['email', 'lastname', 'firstname', 'address',],
    additionalProperties: false
};
const userSchemaUpdated = {
    type: "object",
    properties: {
        username: { type: 'string', pattern: '^[-a-zA-Z0-9.-_]+@[\\w-]+(?:\\.[\\w-]{2,4})$' },
        password: { type: 'string', pattern: '^(?=.*[0-9])(?=.*[-a-z])(?=.*[-A-Z]).{8,}$' },
        confirmPassword: { type: 'string' },
        isAdmin: { type: 'boolean' }
    },
    required: [],
    additionalProperties: false
};
export { userSchema, userSchemaUpdated };
