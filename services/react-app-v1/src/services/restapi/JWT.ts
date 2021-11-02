
class JWT {
    readonly getToken: Function
    constructor(getToken: Function) {
        this.getToken = getToken;
    }
}

// todo: complete this mechanism
function getToken() {
    const cookies = document.cookie
    console.log(cookies);
    const str = 'abc';
    console.log(str.split('=')[1]);
}
const JWTService = new JWT(getToken);
export default JWTService;