// Simple unit tests to verify Jest setup
describe('Jest Setup Tests', () => {
  test('should run basic test', () => {
    expect(true).toBe(true);
  });

  test('should handle basic math', () => {
    expect(2 + 2).toBe(4);
  });

  test('should handle string operations', () => {
    const greeting = 'Hello World';
    expect(greeting).toBe('Hello World');
    expect(greeting.length).toBe(11);
  });

  test('should handle array operations', () => {
    const numbers = [1, 2, 3, 4, 5];
    expect(numbers.length).toBe(5);
    expect(numbers[0]).toBe(1);
    expect(numbers.slice(-1)[0]).toBe(5);
  });

  test('should handle object operations', () => {
    const user = {
      name: 'John Doe',
      age: 30,
      active: true
    };
    
    expect(user.name).toBe('John Doe');
    expect(user.age).toBe(30);
    expect(user.active).toBe(true);
  });

  test('should handle async operations', async () => {
    const result = await Promise.resolve('success');
    expect(result).toBe('success');
  });

  test('should handle function operations', () => {
    const add = (a, b) => a + b;
    expect(add(5, 10)).toBe(15);
  });

  test('should handle conditional logic', () => {
    const isLoggedIn = true;
    const userType = isLoggedIn ? 'premium' : 'guest';
    expect(userType).toBe('premium');
  });
});