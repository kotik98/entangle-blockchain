/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "entangle.distributorsauth";

export interface MsgAddDistributor {
  /**
   * bytes sender = 1 [(gogoproto.casttype) = "github.com/cosmos/cosmos-sdk/types.AccAddress"];
   * option (gogoproto.goproto_getters) = false;
   * this line is used by starport scaffolding # proto/tx/rpc
   * authority is the address of the governance account.
   */
  sender: string;
  distributorAddress: string;
  endDate: number;
}

/** MsgSendResponse defines the Msg/Send response type. */
export interface MsgAddDistributorResponse {
}

export interface MsgRemoveDistributor {
  sender: string;
  /**
   * option (gogoproto.goproto_getters) = false;
   * this line is used by starport scaffolding # proto/tx/rpc
   * authority is the address of the governance account.
   */
  distributorAddress: string;
}

/** MsgSendResponse defines the Msg/Send response type. */
export interface MsgRemoveDistributorResponse {
}

export interface MsgAddAdmin {
  sender: string;
  adminAddress: string;
  editOption: boolean;
}

/** MsgSendResponse defines the Msg/Send response type. */
export interface MsgAddAdminResponse {
}

export interface MsgRemoveAdmin {
  sender: string;
  adminAddress: string;
}

/** MsgSendResponse defines the Msg/Send response type. */
export interface MsgRemoveAdminResponse {
}

function createBaseMsgAddDistributor(): MsgAddDistributor {
  return { sender: "", distributorAddress: "", endDate: 0 };
}

export const MsgAddDistributor = {
  encode(message: MsgAddDistributor, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.distributorAddress !== "") {
      writer.uint32(18).string(message.distributorAddress);
    }
    if (message.endDate !== 0) {
      writer.uint32(24).uint64(message.endDate);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddDistributor {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddDistributor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.distributorAddress = reader.string();
          break;
        case 3:
          message.endDate = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgAddDistributor {
    return {
      sender: isSet(object.sender) ? String(object.sender) : "",
      distributorAddress: isSet(object.distributorAddress) ? String(object.distributorAddress) : "",
      endDate: isSet(object.endDate) ? Number(object.endDate) : 0,
    };
  },

  toJSON(message: MsgAddDistributor): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    message.distributorAddress !== undefined && (obj.distributorAddress = message.distributorAddress);
    message.endDate !== undefined && (obj.endDate = Math.round(message.endDate));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAddDistributor>, I>>(object: I): MsgAddDistributor {
    const message = createBaseMsgAddDistributor();
    message.sender = object.sender ?? "";
    message.distributorAddress = object.distributorAddress ?? "";
    message.endDate = object.endDate ?? 0;
    return message;
  },
};

function createBaseMsgAddDistributorResponse(): MsgAddDistributorResponse {
  return {};
}

export const MsgAddDistributorResponse = {
  encode(_: MsgAddDistributorResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddDistributorResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddDistributorResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgAddDistributorResponse {
    return {};
  },

  toJSON(_: MsgAddDistributorResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAddDistributorResponse>, I>>(_: I): MsgAddDistributorResponse {
    const message = createBaseMsgAddDistributorResponse();
    return message;
  },
};

function createBaseMsgRemoveDistributor(): MsgRemoveDistributor {
  return { sender: "", distributorAddress: "" };
}

export const MsgRemoveDistributor = {
  encode(message: MsgRemoveDistributor, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.distributorAddress !== "") {
      writer.uint32(18).string(message.distributorAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRemoveDistributor {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveDistributor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.distributorAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRemoveDistributor {
    return {
      sender: isSet(object.sender) ? String(object.sender) : "",
      distributorAddress: isSet(object.distributorAddress) ? String(object.distributorAddress) : "",
    };
  },

  toJSON(message: MsgRemoveDistributor): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    message.distributorAddress !== undefined && (obj.distributorAddress = message.distributorAddress);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRemoveDistributor>, I>>(object: I): MsgRemoveDistributor {
    const message = createBaseMsgRemoveDistributor();
    message.sender = object.sender ?? "";
    message.distributorAddress = object.distributorAddress ?? "";
    return message;
  },
};

function createBaseMsgRemoveDistributorResponse(): MsgRemoveDistributorResponse {
  return {};
}

export const MsgRemoveDistributorResponse = {
  encode(_: MsgRemoveDistributorResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRemoveDistributorResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveDistributorResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgRemoveDistributorResponse {
    return {};
  },

  toJSON(_: MsgRemoveDistributorResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRemoveDistributorResponse>, I>>(_: I): MsgRemoveDistributorResponse {
    const message = createBaseMsgRemoveDistributorResponse();
    return message;
  },
};

function createBaseMsgAddAdmin(): MsgAddAdmin {
  return { sender: "", adminAddress: "", editOption: false };
}

export const MsgAddAdmin = {
  encode(message: MsgAddAdmin, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.adminAddress !== "") {
      writer.uint32(18).string(message.adminAddress);
    }
    if (message.editOption === true) {
      writer.uint32(24).bool(message.editOption);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddAdmin {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddAdmin();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.adminAddress = reader.string();
          break;
        case 3:
          message.editOption = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgAddAdmin {
    return {
      sender: isSet(object.sender) ? String(object.sender) : "",
      adminAddress: isSet(object.adminAddress) ? String(object.adminAddress) : "",
      editOption: isSet(object.editOption) ? Boolean(object.editOption) : false,
    };
  },

  toJSON(message: MsgAddAdmin): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    message.adminAddress !== undefined && (obj.adminAddress = message.adminAddress);
    message.editOption !== undefined && (obj.editOption = message.editOption);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAddAdmin>, I>>(object: I): MsgAddAdmin {
    const message = createBaseMsgAddAdmin();
    message.sender = object.sender ?? "";
    message.adminAddress = object.adminAddress ?? "";
    message.editOption = object.editOption ?? false;
    return message;
  },
};

function createBaseMsgAddAdminResponse(): MsgAddAdminResponse {
  return {};
}

export const MsgAddAdminResponse = {
  encode(_: MsgAddAdminResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddAdminResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddAdminResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgAddAdminResponse {
    return {};
  },

  toJSON(_: MsgAddAdminResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAddAdminResponse>, I>>(_: I): MsgAddAdminResponse {
    const message = createBaseMsgAddAdminResponse();
    return message;
  },
};

function createBaseMsgRemoveAdmin(): MsgRemoveAdmin {
  return { sender: "", adminAddress: "" };
}

export const MsgRemoveAdmin = {
  encode(message: MsgRemoveAdmin, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.adminAddress !== "") {
      writer.uint32(18).string(message.adminAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRemoveAdmin {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveAdmin();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.adminAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRemoveAdmin {
    return {
      sender: isSet(object.sender) ? String(object.sender) : "",
      adminAddress: isSet(object.adminAddress) ? String(object.adminAddress) : "",
    };
  },

  toJSON(message: MsgRemoveAdmin): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    message.adminAddress !== undefined && (obj.adminAddress = message.adminAddress);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRemoveAdmin>, I>>(object: I): MsgRemoveAdmin {
    const message = createBaseMsgRemoveAdmin();
    message.sender = object.sender ?? "";
    message.adminAddress = object.adminAddress ?? "";
    return message;
  },
};

function createBaseMsgRemoveAdminResponse(): MsgRemoveAdminResponse {
  return {};
}

export const MsgRemoveAdminResponse = {
  encode(_: MsgRemoveAdminResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRemoveAdminResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveAdminResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgRemoveAdminResponse {
    return {};
  },

  toJSON(_: MsgRemoveAdminResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRemoveAdminResponse>, I>>(_: I): MsgRemoveAdminResponse {
    const message = createBaseMsgRemoveAdminResponse();
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  /** Adding Distributor method */
  AddDistributor(request: MsgAddDistributor): Promise<MsgAddDistributorResponse>;
  /** Remove Distributor method */
  RemoveDistributor(request: MsgRemoveDistributor): Promise<MsgRemoveDistributorResponse>;
  /** Adding Admin method */
  AddAdmin(request: MsgAddAdmin): Promise<MsgAddAdminResponse>;
  /** Remove Admin method */
  RemoveAdmin(request: MsgRemoveAdmin): Promise<MsgRemoveAdminResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.AddDistributor = this.AddDistributor.bind(this);
    this.RemoveDistributor = this.RemoveDistributor.bind(this);
    this.AddAdmin = this.AddAdmin.bind(this);
    this.RemoveAdmin = this.RemoveAdmin.bind(this);
  }
  AddDistributor(request: MsgAddDistributor): Promise<MsgAddDistributorResponse> {
    const data = MsgAddDistributor.encode(request).finish();
    const promise = this.rpc.request("entangle.distributorsauth.Msg", "AddDistributor", data);
    return promise.then((data) => MsgAddDistributorResponse.decode(new _m0.Reader(data)));
  }

  RemoveDistributor(request: MsgRemoveDistributor): Promise<MsgRemoveDistributorResponse> {
    const data = MsgRemoveDistributor.encode(request).finish();
    const promise = this.rpc.request("entangle.distributorsauth.Msg", "RemoveDistributor", data);
    return promise.then((data) => MsgRemoveDistributorResponse.decode(new _m0.Reader(data)));
  }

  AddAdmin(request: MsgAddAdmin): Promise<MsgAddAdminResponse> {
    const data = MsgAddAdmin.encode(request).finish();
    const promise = this.rpc.request("entangle.distributorsauth.Msg", "AddAdmin", data);
    return promise.then((data) => MsgAddAdminResponse.decode(new _m0.Reader(data)));
  }

  RemoveAdmin(request: MsgRemoveAdmin): Promise<MsgRemoveAdminResponse> {
    const data = MsgRemoveAdmin.encode(request).finish();
    const promise = this.rpc.request("entangle.distributorsauth.Msg", "RemoveAdmin", data);
    return promise.then((data) => MsgRemoveAdminResponse.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
