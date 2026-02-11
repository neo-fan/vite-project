import { redirect, type LoaderFunctionArgs } from "react-router-dom";
import { store } from "../store";
import { waitForPersist } from "../store/persistState";

export async function requireAuthLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const from = url.pathname + url.search;
  // // 等待状态恢复
  await waitForPersist();
  const token = store.getState().user.token;
  if (!token) {
    throw redirect(`/login?from=${encodeURIComponent(from)}`);
  } else {
    return null;
  }
}
