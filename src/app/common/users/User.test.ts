import { parseUser } from './User';

describe('parseUser', () => {
  it('should return a valid user object when given valid data', () => {
    const validData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
    };

    const result = parseUser(validData);

    expect(result.user).toEqual(validData);
    expect(result.error).toBeNull();
  });

  it('should return null user and an error when given invalid data', () => {
    const invalidData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoeexample.com', // invalid email
      };

    const result = parseUser(invalidData);

    expect(result.user).toBeNull();
    expect(result.error?.issues[0].message).toBe('Invalid email');
  });
});