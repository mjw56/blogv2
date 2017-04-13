// functions which handle set/get of client side cookies

// create a name/value cookie for an amount of time or infinity
export function createCookie(name: string, value: string, days?: number): void {
  var expires = "; expires = Fri, 31 Dec 9999 23:59:59 GMT"; // default to forever ;)
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }

  document.cookie = `${name}=${value}${expires}; path=/`;
}

// read a cookie by name
export function readCookie(name): string {
  const cookies = document.cookie.split(";");

  let myCookie = cookies.find(c => c.indexOf(name) === 1);

  if (!myCookie) {
    return "";
  }

  return myCookie.split("=")[1];
}

// erase a cookie by name
export function eraseCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}
