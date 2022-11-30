/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Admin, DistributorInfo } from "./distributorsauth";

export const protobufPackage = "entangle.distributorsauth";

/** QueryDistributorsRequest is request type for Query/Distributors RPC method. */
export interface QueryDistributorsRequest {
}

/** QueryDistributorsResponse is response type for the Query/Distributors RPC method */
export interface QueryDistributorsResponse {
  /** distributors contains all the queried distributors. */
  distributors: DistributorInfo[];
}

/** QueryDistributorRequest is response type for the Query/Distributor RPC method */
export interface QueryDistributorRequest {
  /** distributor_addr defines the distributor address to query for. */
  distributorAddr: string;
}

/** QueryDistributorResponse is response type for the Query/Distributor RPC method */
export interface QueryDistributorResponse {
  /** distributor defines the distributor info. */
  distributor: DistributorInfo | undefined;
}

/** QueryAdminsRequest is request type for Query/Admns RPC method. */
export interface QueryAdminsRequest {
}

/** QueryAdminsResponse is response type for the Query/Admins RPC method */
export interface QueryAdminsResponse {
  /** admins contains all the queried admins. */
  admins: Admin[];
}

/** QueryAdminRequest is response type for the Query/Admin RPC method */
export interface QueryAdminRequest {
  /** admin_addr defines the admin address to query for. */
  adminAddr: string;
}

/** QueryAdminResponse is response type for the Query/Admin RPC method */
export interface QueryAdminResponse {
  /** admin defines the admin info. */
  admin: Admin | undefined;
}

function createBaseQueryDistributorsRequest(): QueryDistributorsRequest {
  return {};
}

export const QueryDistributorsRequest = {
  encode(_: QueryDistributorsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDistributorsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDistributorsRequest();
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

  fromJSON(_: any): QueryDistributorsRequest {
    return {};
  },

  toJSON(_: QueryDistributorsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryDistributorsRequest>, I>>(_: I): QueryDistributorsRequest {
    const message = createBaseQueryDistributorsRequest();
    return message;
  },
};

function createBaseQueryDistributorsResponse(): QueryDistributorsResponse {
  return { distributors: [] };
}

export const QueryDistributorsResponse = {
  encode(message: QueryDistributorsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.distributors) {
      DistributorInfo.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDistributorsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDistributorsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.distributors.push(DistributorInfo.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryDistributorsResponse {
    return {
      distributors: Array.isArray(object?.distributors)
        ? object.distributors.map((e: any) => DistributorInfo.fromJSON(e))
        : [],
    };
  },

  toJSON(message: QueryDistributorsResponse): unknown {
    const obj: any = {};
    if (message.distributors) {
      obj.distributors = message.distributors.map((e) => e ? DistributorInfo.toJSON(e) : undefined);
    } else {
      obj.distributors = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryDistributorsResponse>, I>>(object: I): QueryDistributorsResponse {
    const message = createBaseQueryDistributorsResponse();
    message.distributors = object.distributors?.map((e) => DistributorInfo.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryDistributorRequest(): QueryDistributorRequest {
  return { distributorAddr: "" };
}

export const QueryDistributorRequest = {
  encode(message: QueryDistributorRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.distributorAddr !== "") {
      writer.uint32(10).string(message.distributorAddr);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDistributorRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDistributorRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.distributorAddr = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryDistributorRequest {
    return { distributorAddr: isSet(object.distributorAddr) ? String(object.distributorAddr) : "" };
  },

  toJSON(message: QueryDistributorRequest): unknown {
    const obj: any = {};
    message.distributorAddr !== undefined && (obj.distributorAddr = message.distributorAddr);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryDistributorRequest>, I>>(object: I): QueryDistributorRequest {
    const message = createBaseQueryDistributorRequest();
    message.distributorAddr = object.distributorAddr ?? "";
    return message;
  },
};

function createBaseQueryDistributorResponse(): QueryDistributorResponse {
  return { distributor: undefined };
}

export const QueryDistributorResponse = {
  encode(message: QueryDistributorResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.distributor !== undefined) {
      DistributorInfo.encode(message.distributor, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDistributorResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDistributorResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.distributor = DistributorInfo.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryDistributorResponse {
    return { distributor: isSet(object.distributor) ? DistributorInfo.fromJSON(object.distributor) : undefined };
  },

  toJSON(message: QueryDistributorResponse): unknown {
    const obj: any = {};
    message.distributor !== undefined
      && (obj.distributor = message.distributor ? DistributorInfo.toJSON(message.distributor) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryDistributorResponse>, I>>(object: I): QueryDistributorResponse {
    const message = createBaseQueryDistributorResponse();
    message.distributor = (object.distributor !== undefined && object.distributor !== null)
      ? DistributorInfo.fromPartial(object.distributor)
      : undefined;
    return message;
  },
};

function createBaseQueryAdminsRequest(): QueryAdminsRequest {
  return {};
}

export const QueryAdminsRequest = {
  encode(_: QueryAdminsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAdminsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAdminsRequest();
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

  fromJSON(_: any): QueryAdminsRequest {
    return {};
  },

  toJSON(_: QueryAdminsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAdminsRequest>, I>>(_: I): QueryAdminsRequest {
    const message = createBaseQueryAdminsRequest();
    return message;
  },
};

function createBaseQueryAdminsResponse(): QueryAdminsResponse {
  return { admins: [] };
}

export const QueryAdminsResponse = {
  encode(message: QueryAdminsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.admins) {
      Admin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAdminsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAdminsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.admins.push(Admin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAdminsResponse {
    return { admins: Array.isArray(object?.admins) ? object.admins.map((e: any) => Admin.fromJSON(e)) : [] };
  },

  toJSON(message: QueryAdminsResponse): unknown {
    const obj: any = {};
    if (message.admins) {
      obj.admins = message.admins.map((e) => e ? Admin.toJSON(e) : undefined);
    } else {
      obj.admins = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAdminsResponse>, I>>(object: I): QueryAdminsResponse {
    const message = createBaseQueryAdminsResponse();
    message.admins = object.admins?.map((e) => Admin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryAdminRequest(): QueryAdminRequest {
  return { adminAddr: "" };
}

export const QueryAdminRequest = {
  encode(message: QueryAdminRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.adminAddr !== "") {
      writer.uint32(10).string(message.adminAddr);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAdminRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAdminRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.adminAddr = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAdminRequest {
    return { adminAddr: isSet(object.adminAddr) ? String(object.adminAddr) : "" };
  },

  toJSON(message: QueryAdminRequest): unknown {
    const obj: any = {};
    message.adminAddr !== undefined && (obj.adminAddr = message.adminAddr);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAdminRequest>, I>>(object: I): QueryAdminRequest {
    const message = createBaseQueryAdminRequest();
    message.adminAddr = object.adminAddr ?? "";
    return message;
  },
};

function createBaseQueryAdminResponse(): QueryAdminResponse {
  return { admin: undefined };
}

export const QueryAdminResponse = {
  encode(message: QueryAdminResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.admin !== undefined) {
      Admin.encode(message.admin, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAdminResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAdminResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.admin = Admin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAdminResponse {
    return { admin: isSet(object.admin) ? Admin.fromJSON(object.admin) : undefined };
  },

  toJSON(message: QueryAdminResponse): unknown {
    const obj: any = {};
    message.admin !== undefined && (obj.admin = message.admin ? Admin.toJSON(message.admin) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAdminResponse>, I>>(object: I): QueryAdminResponse {
    const message = createBaseQueryAdminResponse();
    message.admin = (object.admin !== undefined && object.admin !== null) ? Admin.fromPartial(object.admin) : undefined;
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Queries  distributor info for all distributors */
  Distributors(request: QueryDistributorsRequest): Promise<QueryDistributorsResponse>;
  /** Queries distributor info for given distributor address. */
  Distributor(request: QueryDistributorRequest): Promise<QueryDistributorResponse>;
  /** Queries admin info for all admins */
  Admins(request: QueryAdminsRequest): Promise<QueryAdminsResponse>;
  /** Queries admin info for given admin address. */
  Admin(request: QueryAdminRequest): Promise<QueryAdminResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Distributors = this.Distributors.bind(this);
    this.Distributor = this.Distributor.bind(this);
    this.Admins = this.Admins.bind(this);
    this.Admin = this.Admin.bind(this);
  }
  Distributors(request: QueryDistributorsRequest): Promise<QueryDistributorsResponse> {
    const data = QueryDistributorsRequest.encode(request).finish();
    const promise = this.rpc.request("entangle.distributorsauth.Query", "Distributors", data);
    return promise.then((data) => QueryDistributorsResponse.decode(new _m0.Reader(data)));
  }

  Distributor(request: QueryDistributorRequest): Promise<QueryDistributorResponse> {
    const data = QueryDistributorRequest.encode(request).finish();
    const promise = this.rpc.request("entangle.distributorsauth.Query", "Distributor", data);
    return promise.then((data) => QueryDistributorResponse.decode(new _m0.Reader(data)));
  }

  Admins(request: QueryAdminsRequest): Promise<QueryAdminsResponse> {
    const data = QueryAdminsRequest.encode(request).finish();
    const promise = this.rpc.request("entangle.distributorsauth.Query", "Admins", data);
    return promise.then((data) => QueryAdminsResponse.decode(new _m0.Reader(data)));
  }

  Admin(request: QueryAdminRequest): Promise<QueryAdminResponse> {
    const data = QueryAdminRequest.encode(request).finish();
    const promise = this.rpc.request("entangle.distributorsauth.Query", "Admin", data);
    return promise.then((data) => QueryAdminResponse.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
