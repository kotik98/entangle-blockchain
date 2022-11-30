/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Admin, DistributorInfo } from "./distributorsauth";

export const protobufPackage = "entangle.distributorsauth";

/** GenesisState defines the distributorsauth module's genesis state. */
export interface GenesisState {
  /** Admins list */
  admins: Admin[];
  /** Distributors list */
  distributors: DistributorInfo[];
}

function createBaseGenesisState(): GenesisState {
  return { admins: [], distributors: [] };
}

export const GenesisState = {
  encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.admins) {
      Admin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.distributors) {
      DistributorInfo.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.admins.push(Admin.decode(reader, reader.uint32()));
          break;
        case 2:
          message.distributors.push(DistributorInfo.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    return {
      admins: Array.isArray(object?.admins) ? object.admins.map((e: any) => Admin.fromJSON(e)) : [],
      distributors: Array.isArray(object?.distributors)
        ? object.distributors.map((e: any) => DistributorInfo.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    if (message.admins) {
      obj.admins = message.admins.map((e) => e ? Admin.toJSON(e) : undefined);
    } else {
      obj.admins = [];
    }
    if (message.distributors) {
      obj.distributors = message.distributors.map((e) => e ? DistributorInfo.toJSON(e) : undefined);
    } else {
      obj.distributors = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(object: I): GenesisState {
    const message = createBaseGenesisState();
    message.admins = object.admins?.map((e) => Admin.fromPartial(e)) || [];
    message.distributors = object.distributors?.map((e) => DistributorInfo.fromPartial(e)) || [];
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };
