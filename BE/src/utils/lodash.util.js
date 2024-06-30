import _ from "lodash";

export const getInfoData = (object) => {
  return _.pick(object.data, object.fields);
};
