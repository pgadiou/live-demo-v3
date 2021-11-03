const { collection } = require('forest-express-sequelize');

// This file allows you to add to your Forest UI:
// - Smart actions: https://docs.forestadmin.com/documentation/reference-guide/actions/create-and-manage-smart-actions
// - Smart fields: https://docs.forestadmin.com/documentation/reference-guide/fields/create-and-manage-smart-fields
// - Smart relationships: https://docs.forestadmin.com/documentation/reference-guide/relationships/create-a-smart-relationship
// - Smart segments: https://docs.forestadmin.com/documentation/reference-guide/segments/smart-segments
collection('sandboxItems', {
  actions: [],
  fields: [
    {
      field: 'array',
      type: ['String'],
      get: (object) => {
        return ['hello', 'here']
      }
    },
    {
      field: 'lat',
      type: 'Number',
      get: (object) => {
        return object.json ? object.json.lat : null;
      },
      set: (object) => {
        return object;
      },
    }, {
      field: 'lon',
      type: 'Number',
      get: (object) => {
        return object.json ? object.json.lon : null;
      },
      set: (object) => {
        return object;
      },
    }, {
      field: 'name',
      type: 'String',
      get: (object) => {
        return object.child ? object.child.name : null;
      },
      set: (object) => {
        return object;
      },
    }, {
      field: 'age',
      type: 'String',
      get: (object) => {
        return object.child ? object.child.age : null;
      },
      set: (object) => {
        return object;
      },
    }, {
      field: 'sex',
      type: 'String',
      get: (object) => {
        return object.child ? object.child.sex : null;
      },
      set: (object) => {
        return object;
      },
    },
  ],
  segments: [],
});
