import axios from "axios";
import { NameApiService } from "../nameApiService";

jest.mock("axios");

// @refs https://wp-kyoto.net/jest-and-typescript-to-test-code-with-axios/
describe("test for nameApiService", () => {
  afterEach(() => jest.restoreAllMocks());
  const nameApiService = new NameApiService();
  test("the api response is not more than MAX_LENGTH", async () => {
    (axios.get as any).mockResolvedValue({ data: { first_name: "hoge" } });
    const data = await nameApiService.getFirstName();
    expect(data).toEqual("hoge");
  });
  test("the api response is more than MAX_LENGTH", async () => {
    (axios.get as any).mockResolvedValue({ data: { first_name: "hogehoge" } });
    const data = nameApiService.getFirstName();
    expect(data).rejects.toThrow("firstName is too long!");
  });
});
