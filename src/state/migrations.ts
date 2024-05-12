// https://github.com/rt2zz/redux-persist/blob/master/docs/migrations.md#example-with-createmigrate
const migrations = {
  0: (state: any) => {
    return {
      ...state,
      device: undefined,
    };
  },
};

export default migrations;
