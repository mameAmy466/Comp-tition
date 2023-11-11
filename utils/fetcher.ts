import { API_HEAD_URL } from "@/constants";

const fetchData = <R = any>(url: string) =>
  fetch(API_HEAD_URL + url).then((response) => response.json() as R);
export default fetchData;
