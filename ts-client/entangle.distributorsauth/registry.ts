import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgAddDistributor } from "./types/entangle/distributorsauth/tx";
import { MsgAddAdmin } from "./types/entangle/distributorsauth/tx";
import { MsgRemoveDistributor } from "./types/entangle/distributorsauth/tx";
import { MsgRemoveAdmin } from "./types/entangle/distributorsauth/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/entangle.distributorsauth.MsgAddDistributor", MsgAddDistributor],
    ["/entangle.distributorsauth.MsgAddAdmin", MsgAddAdmin],
    ["/entangle.distributorsauth.MsgRemoveDistributor", MsgRemoveDistributor],
    ["/entangle.distributorsauth.MsgRemoveAdmin", MsgRemoveAdmin],
    
];

export { msgTypes }