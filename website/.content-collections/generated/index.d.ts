import configuration from "../../content-collections.ts";
import { GetTypeByName } from "@content-collections/core";

export type Index = GetTypeByName<typeof configuration, "index">;
export declare const allIndices: Array<Index>;

export {};
