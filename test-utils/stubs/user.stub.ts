import { faker } from '@faker-js/faker';

const _id = faker.datatype.uuid();
const email = faker.internet.email();
const password = faker.internet.password(6);

export const userStub = () => {
  return {
    _id,
    email,
    password,
  };
};
