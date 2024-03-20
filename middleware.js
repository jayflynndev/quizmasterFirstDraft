export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/quiznights/add", "/profile", "/quiznights/saved", "/messages"],
};
