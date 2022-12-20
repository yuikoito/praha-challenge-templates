import {
  sumOfArray,
  asyncSumOfArray,
  asyncSumOfArraySometimesZero,
  getFirstNameThrowIfLong,
} from "../functions";
import { DatabaseMock } from "../util/index";
import { NameApiService } from "../nameApiService";

describe("test for sumOfArray", () => {
  test("put [1, 1] in an argument and should return 2", () => {
    expect(sumOfArray([1, 1])).toBe(2);
  });
  // @refs https://stackoverflow.com/questions/46042613/how-to-test-the-type-of-a-thrown-exception-in-jest
  test("put [1, 1] in an argument and should throw TypeError", () => {
    expect(() => sumOfArray([])).toThrow(TypeError);
  });
});

describe("test for asyncSumOfArray", () => {
  test("put [1, 1] in an argument and should return 2", async () => {
    expect(await asyncSumOfArray([1, 1])).toBe(2);
  });
  test("put [1, 1] in an argument and should throw TypeError", async () => {
    await expect(() => asyncSumOfArray([])).rejects.toThrow(TypeError);
  });
});

describe("test for asyncSumOfArraySometimesZero", () => {
  const database = new DatabaseMock();
  // @refs https://dev.classmethod.jp/articles/how-to-basic-use-of-jest-spyon/
  test("save succeeds", async () => {
    const spy = jest.spyOn(database, "save").mockImplementation(() => {});
    const data = await asyncSumOfArraySometimesZero([1, 1], database);
    expect(spy).toHaveBeenCalled();
    expect(data).toBe(2);
    spy.mockRestore();
  });
  test("save failed", async () => {
    const spy = jest.spyOn(database, "save").mockImplementation(() => {
      throw new Error("fail!");
    });
    const data = await asyncSumOfArraySometimesZero([1, 1], database);
    expect(spy).toHaveBeenCalled();
    expect(data).toBe(0);
    spy.mockRestore();
  });
});

describe("test for getFirstNameThrowIfLong", () => {
  const nameApiService = new NameApiService();
  test("first name is not more than maxNameLength characters", async () => {
    const spy = jest
      .spyOn(nameApiService, "getFirstName")
      .mockResolvedValue("hoge");
    const data = await getFirstNameThrowIfLong(4, nameApiService);
    expect(spy).toHaveBeenCalled();
    expect(data).toBe("hoge");
    spy.mockRestore();
  });
  test("given maxNameLength is less than maxNameLength of NameApiService, and first name is more than the given maxNameLength characters", async () => {
    const spy = jest
      .spyOn(nameApiService, "getFirstName")
      .mockResolvedValue("hoge");
    const data = getFirstNameThrowIfLong(3, nameApiService);
    expect(spy).toHaveBeenCalled();
    expect(data).rejects.toThrow("firstName is too long!");
    spy.mockRestore();
  });
  // @refs https://dev.classmethod.jp/articles/testing-exception-handling-with-jest/
  test("first name is more than maxNameLength characters of NameApiService", async () => {
    const spy = jest
      .spyOn(nameApiService, "getFirstName")
      .mockImplementation(() => {
        throw new Error("firstName is too long!");
      });
    const data = getFirstNameThrowIfLong(4, nameApiService);
    expect(spy).toHaveBeenCalled();
    expect(data).rejects.toThrow("firstName is too long!");
    spy.mockRestore();
  });
});
