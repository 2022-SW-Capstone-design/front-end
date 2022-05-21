// 목업 서버 생성
import { setupServer } from "msw/node";
import { handlers } from "./handlers";

// mocking server 생성
export const mockServer = setupServer(...handlers);
