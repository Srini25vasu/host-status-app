export interface Header {
  key: string;
  displayName: string;
}

export type readonlyHeader = Readonly<Header>;
type StatusMap = Readonly<Record<string, "active" | "inactive">>;

export const statuses: StatusMap = {
  user1: "active",
  user2: "inactive",
  user3: "active"
};

interface User {
  id: number;
  name: string;
  email: string;
}

const userMap: Record<number, User> = {
  1: { id: 1, name: "Alice", email: "alice@example.com" },
  2: { id: 2, name: "Bob", email: "bob@example.com" },
};

console.log(userMap[1].name); // Output: "Alice"

type ConfigKeys = "theme" | "language" | "notifications";

const appConfig: Record<ConfigKeys, string> = {
  theme: "dark",
  language: "en",
  notifications: "enabled",
};

console.log(appConfig.theme); // Output: "dark"s

//Dynamic component styling
type Components = 'button' | 'card' | 'header';
interface Style { color: string; fontSize: string };

export const componentStyles: Record<Components, Style> = {
  button: { color: 'blue', fontSize: '14px' },
  card: { color: 'white', fontSize: '16px' },
  header: { color: 'black', fontSize: '20px' },
};

type ErrorCode = '404' | '500' | '403';
export const errorMessages: Record<ErrorCode, string> = {
  '404': 'Page not found',
  '500': 'Internal server error',
  '403': 'Access forbidden',
};

//Typescript records:
//https://www.convex.dev/typescript/core-concepts/maps-sets-specialized-types/typescript-record#:~:text=Record%20is,defined%20by%20a%20union%20type.
