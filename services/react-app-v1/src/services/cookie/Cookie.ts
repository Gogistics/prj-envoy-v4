/**
 * Ref:
 * - https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
 */
class Cookie {
    readonly setCookies: Function;
    readonly getCookies: Function;
    constructor(setCookies: Function, getCookies: Function) {
        this.setCookies = setCookies;
        this.getCookies = getCookies;
    }

}

const cookiesString: string = ';max-age=1800;samesite=Lax;secure';
// add valid keys
const validKeys = new Set(['SameSite','path','domain','max-age','expires']);
interface CookiePair {
    key: string;
    value: string;
}
function setCookies(cookies: Array<CookiePair>) {
    // only allow to append new cookies with valid key to the head
    document.cookie = cookiesString;
    let newCookies = document.cookie;
    cookies.forEach((cookie, index) => {
        if (validKeys.has(cookie.key)) {
            // valid
            newCookies = `${cookie.key}=${cookie.value};${newCookies}`;
        } else {
            // invalid
            console.warn('Invalid key: ', cookie.key)
        }
    });
    document.cookie = newCookies;

}
function getCookies() {
    // only return valid keys based on inner variable validKeys
    const cookies = cookiesString.substring(0,cookiesString.indexOf('secure'))
    return cookies
        .split(';')
        .filter((str) => {
            return str.indexOf('=') !== -1;
        })
        .map((pairStr) => {
            const cookiePair = pairStr.split('=');
            return {key: cookiePair[0], value: cookiePair[1]};
        })
        .filter((pair) => {
            return validKeys.has(pair.key);
        });
}
const CookieService = new Cookie(setCookies, getCookies);
export default CookieService;