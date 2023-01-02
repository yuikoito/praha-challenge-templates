// @refs https://github.com/yudai64/jestSample/blob/main/functions.ts

type Todo = {
  userId: number;
  id?: number;
  title: string;
  completed: boolean;
};

export const getTodo = async (id: number): Promise<Todo> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`
  );
  return await response.json();
};

export const getTodos = async (): Promise<Todo[]> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos`);
  return await response.json();
};

export const createTodo = async (todo: Todo): Promise<number> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  const data = await response.json();
  return data.id;
};
