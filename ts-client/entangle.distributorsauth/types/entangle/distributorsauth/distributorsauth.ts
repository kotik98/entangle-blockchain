/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "entangle.distributorsauth";

export interface DistributorInfo {
  Address: string;
  endDate: number;
}

export interface Admin {
  address: string;
  editOption: boolean;
}

/**
 * AddDistributorProposal
 * with a deposit
 */
export interface AddDistributorProposal {
  title: string;
  description: string;
  address: string;
  endDate: string;
  deposit: string;
}

function createBaseDistributorInfo(): DistributorInfo {
  return { Address: "", endDate: 0 };
}

export const DistributorInfo = {
  encode(message: DistributorInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.Address !== "") {
      writer.uint32(10).string(message.Address);
    }
    if (message.endDate !== 0) {
      writer.uint32(16).uint64(message.endDate);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DistributorInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDistributorInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Address = reader.string();
          break;
        case 2:
          message.endDate = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DistributorInfo {
    return {
      Address: isSet(object.Address) ? String(object.Address) : "",
      endDate: isSet(object.endDate) ? Number(object.endDate) : 0,
    };
  },

  toJSON(message: DistributorInfo): unknown {
    const obj: any = {};
    message.Address !== undefined && (obj.Address = message.Address);
    message.endDate !== undefined && (obj.endDate = Math.round(message.endDate));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DistributorInfo>, I>>(object: I): DistributorInfo {
    const message = createBaseDistributorInfo();
    message.Address = object.Address ?? "";
    message.endDate = object.endDate ?? 0;
    return message;
  },
};

function createBaseAdmin(): Admin {
  return { address: "", editOption: false };
}

export const Admin = {
  encode(message: Admin, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.editOption === true) {
      writer.uint32(16).bool(message.editOption);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Admin {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAdmin();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.editOption = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Admin {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      editOption: isSet(object.editOption) ? Boolean(object.editOption) : false,
    };
  },

  toJSON(message: Admin): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.editOption !== undefined && (obj.editOption = message.editOption);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Admin>, I>>(object: I): Admin {
    const message = createBaseAdmin();
    message.address = object.address ?? "";
    message.editOption = object.editOption ?? false;
    return message;
  },
};

function createBaseAddDistributorProposal(): AddDistributorProposal {
  return { title: "", description: "", address: "", endDate: "", deposit: "" };
}

export const AddDistributorProposal = {
  encode(message: AddDistributorProposal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.address !== "") {
      writer.uint32(26).string(message.address);
    }
    if (message.endDate !== "") {
      writer.uint32(34).string(message.endDate);
    }
    if (message.deposit !== "") {
      writer.uint32(42).string(message.deposit);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddDistributorProposal {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddDistributorProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.title = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.address = reader.string();
          break;
        case 4:
          message.endDate = reader.string();
          break;
        case 5:
          message.deposit = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AddDistributorProposal {
    return {
      title: isSet(object.title) ? String(object.title) : "",
      description: isSet(object.description) ? String(object.description) : "",
      address: isSet(object.address) ? String(object.address) : "",
      endDate: isSet(object.endDate) ? String(object.endDate) : "",
      deposit: isSet(object.deposit) ? String(object.deposit) : "",
    };
  },

  toJSON(message: AddDistributorProposal): unknown {
    const obj: any = {};
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined && (obj.description = message.description);
    message.address !== undefined && (obj.address = message.address);
    message.endDate !== undefined && (obj.endDate = message.endDate);
    message.deposit !== undefined && (obj.deposit = message.deposit);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AddDistributorProposal>, I>>(object: I): AddDistributorProposal {
    const message = createBaseAddDistributorProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.address = object.address ?? "";
    message.endDate = object.endDate ?? "";
    message.deposit = object.deposit ?? "";
    return message;
  },
};

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
