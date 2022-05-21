import { setupWorker, rest } from "msw";
import { getData, postData } from "../components/http-request";

export const handlers = [postData("")];
