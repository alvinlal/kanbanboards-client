import { faker } from '@faker-js/faker';

const user_id = faker.datatype.uuid();
const email = faker.internet.email();
const password = faker.internet.password(6);

export const userStub = () => {
  return {
    user_id,
    email,
    password,
  };
};
