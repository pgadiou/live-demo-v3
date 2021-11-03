const { collection } = require('forest-express-sequelize');


collection('users', {
  actions: [],
  fields: [
    {
      field: 'email',
      type: 'String',
      get: (object) => {
        return object.contact ? object.contact.email : null;
      },
    }, {
      field: 'phone',
      type: 'String',
      get: (object) => {
        return object.contact ? object.contact.phone : null;
      },
    },
  ],
  segments: [],
});
