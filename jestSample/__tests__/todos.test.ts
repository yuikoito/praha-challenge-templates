import fetchMock from "fetch-mock";
import { getTodo, getTodos, createTodo } from "../todos";

const mockTodo = {
  userId: 1,
  id: 1,
  title: "delectus aut autem",
  completed: false,
};

const mockTodos = [mockTodo];

describe("getTodo", () => {
  beforeEach(() => {
    fetchMock.get(`https://jsonplaceholder.typicode.com/todos/1`, mockTodo);
  });

  afterEach(() => {
    fetchMock.reset();
  });

  it("should return a todo with the given id", async () => {
    const todo = await getTodo(1);
    expect(todo).toEqual(mockTodo);
  });
});

describe("getTodos", () => {
  beforeEach(() => {
    fetchMock.get(`https://jsonplaceholder.typicode.com/todos`, mockTodos);
  });

  afterEach(() => {
    fetchMock.reset();
  });

  it("should return an array of todos", async () => {
    const todos = await getTodos();
    expect(todos).toEqual(mockTodos);
  });
});

describe("createTodo", () => {
  const mockTodo = {
    userId: 1,
    title: "Buy milk",
    completed: false,
  };

  beforeEach(() => {
    fetchMock.post(`https://jsonplaceholder.typicode.com/todos`, {
      id: 1,
    });
  });

  afterEach(() => {
    fetchMock.reset();
  });

  it("should create a todo and return its id", async () => {
    const id = await createTodo(mockTodo);
    expect(id).toEqual(1);
  });
});
