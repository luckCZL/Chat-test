/** @format */
/*Header*/
export class Header {
    flowId: string;
    token: string;
}

/*tsModel1*/
export class TokenCheckFail {
    code: number;
    data: null;
    isSuccess: boolean;
    message: string;
    timestamp: number;
}

export class Body {
    type = '9001';
}

/*tsModel1*/
export class TokenCheck {
    lwp = '/reg';
    header: Header = new Header();
    body: Body = new Body();
}
