/**
 * /*ChatDTO
 *
 * @format
 */

export class ChatDTO {
    chatId: string;
    chatName: string;
    chatAvatar: string;
}

/*Body*/
export class Body {
    id?: string;
    sno?: string;
    fid?: string;
    fname?: string;
    favatar?: string;
    msgId?: string;
    msgTime?: string;
    content?: string;
    type?: string;
    toId?: string;
    unReadCount?: string;
    state?: string;
    top?: string;
    startTime?: string;
    endTime?: string;
    createTime?: string;
    updateTime?: string;
    chatDTO?: ChatDTO;
}

/*Header*/
export class Header {
    flowId: string;
    token: string;
}

/*tsModel3*/
export class MsgResult {
    lwp: string;
    body?: Body;
    header: Header;
    code: number;
    errorMsg: string;
}
