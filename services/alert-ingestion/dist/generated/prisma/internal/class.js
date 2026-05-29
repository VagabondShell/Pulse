"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrismaClientClass = getPrismaClientClass;
const runtime = __importStar(require("@prisma/client/runtime/client"));
const config = {
    "previewFeatures": [],
    "clientVersion": "7.8.0",
    "engineVersion": "3c6e192761c0362d496ed980de936e2f3cebcd3a",
    "activeProvider": "postgresql",
    "inlineSchema": "// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Get a free hosted Postgres database in seconds: `npx create-db`\n\ngenerator client {\n  provider = \"prisma-client\"\n  output   = \"../generated/prisma\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n}\n\nmodel RawAlert {\n  id         String   @id @default(uuid())\n  service    String // The source of the alert (e.g., \"Grafana\", \"Prometheus\")\n  severity   String // \"critical\", \"warning\", \"info\"\n  message    String // The main description of the alert\n  labels     Json? // Flexible storage for extra metadata\n  status     String   @default(\"received\") // \"received\", \"processed\", \"ignored\"\n  incidentId String? // Links to an incident if correlated\n  eventTime  DateTime @default(now()) // When the alert actually happened\n  receivedAt DateTime @default(now()) // When our service received it\n\n  @@map(\"raw_alerts\") // Names the table \"raw_alerts\" in Postgres\n}\n",
    "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
    },
    "parameterizationSchema": {
        "strings": [],
        "graph": ""
    }
};
config.runtimeDataModel = JSON.parse("{\"models\":{\"RawAlert\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"service\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"severity\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"message\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"labels\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"status\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"incidentId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"eventTime\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"receivedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":\"raw_alerts\"}},\"enums\":{},\"types\":{}}");
config.parameterizationSchema = {
    strings: JSON.parse("[\"where\",\"RawAlert.findUnique\",\"RawAlert.findUniqueOrThrow\",\"orderBy\",\"cursor\",\"RawAlert.findFirst\",\"RawAlert.findFirstOrThrow\",\"RawAlert.findMany\",\"data\",\"RawAlert.createOne\",\"RawAlert.createMany\",\"RawAlert.createManyAndReturn\",\"RawAlert.updateOne\",\"RawAlert.updateMany\",\"RawAlert.updateManyAndReturn\",\"create\",\"update\",\"RawAlert.upsertOne\",\"RawAlert.deleteOne\",\"RawAlert.deleteMany\",\"having\",\"_count\",\"_min\",\"_max\",\"RawAlert.groupBy\",\"RawAlert.aggregate\",\"AND\",\"OR\",\"NOT\",\"id\",\"service\",\"severity\",\"message\",\"labels\",\"status\",\"incidentId\",\"eventTime\",\"receivedAt\",\"equals\",\"in\",\"notIn\",\"lt\",\"lte\",\"gt\",\"gte\",\"not\",\"contains\",\"startsWith\",\"endsWith\",\"string_contains\",\"string_starts_with\",\"string_ends_with\",\"array_starts_with\",\"array_ends_with\",\"array_contains\",\"set\"]"),
    graph: "MwkQDBoAACgAMBsAAAQAEBwAACgAMB0BAAAAAR4BACkAIR8BACkAISABACkAISEAACoAICIBACkAISMBACsAISRAACwAISVAACwAIQEAAAABACABAAAAAQAgDBoAACgAMBsAAAQAEBwAACgAMB0BACkAIR4BACkAIR8BACkAISABACkAISEAACoAICIBACkAISMBACsAISRAACwAISVAACwAIQIhAAAtACAjAAAtACADAAAABAAgAwAABQAwBAAAAQAgAwAAAAQAIAMAAAUAMAQAAAEAIAMAAAAEACADAAAFADAEAAABACAJHQEAAAABHgEAAAABHwEAAAABIAEAAAABIYAAAAABIgEAAAABIwEAAAABJEAAAAABJUAAAAABAQgAAAkAIAkdAQAAAAEeAQAAAAEfAQAAAAEgAQAAAAEhgAAAAAEiAQAAAAEjAQAAAAEkQAAAAAElQAAAAAEBCAAACwAwAQgAAAsAMAkdAQAxACEeAQAxACEfAQAxACEgAQAxACEhgAAAAAEiAQAxACEjAQAyACEkQAAzACElQAAzACECAAAAAQAgCAAADgAgCR0BADEAIR4BADEAIR8BADEAISABADEAISGAAAAAASIBADEAISMBADIAISRAADMAISVAADMAIQIAAAAEACAIAAAQACACAAAABAAgCAAAEAAgAwAAAAEAIA8AAAkAIBAAAA4AIAEAAAABACABAAAABAAgBRUAAC4AIBYAADAAIBcAAC8AICEAAC0AICMAAC0AIAwaAAAaADAbAAAXABAcAAAaADAdAQAbACEeAQAbACEfAQAbACEgAQAbACEhAAAcACAiAQAbACEjAQAdACEkQAAeACElQAAeACEDAAAABAAgAwAAFgAwFAAAFwAgAwAAAAQAIAMAAAUAMAQAAAEAIAwaAAAaADAbAAAXABAcAAAaADAdAQAbACEeAQAbACEfAQAbACEgAQAbACEhAAAcACAiAQAbACEjAQAdACEkQAAeACElQAAeACEOFQAAIAAgFgAAJwAgFwAAJwAgJgEAAAABJwEAAAAEKAEAAAAEKQEAAAABKgEAAAABKwEAAAABLAEAAAABLQEAJgAhLgEAAAABLwEAAAABMAEAAAABDxUAACMAIBYAACUAIBcAACUAICaAAAAAASmAAAAAASqAAAAAASuAAAAAASyAAAAAAS2AAAAAATEBAAAAATIBAAAAATMBAAAAATSAAAAAATWAAAAAATaAAAAAAQ4VAAAjACAWAAAkACAXAAAkACAmAQAAAAEnAQAAAAUoAQAAAAUpAQAAAAEqAQAAAAErAQAAAAEsAQAAAAEtAQAiACEuAQAAAAEvAQAAAAEwAQAAAAELFQAAIAAgFgAAIQAgFwAAIQAgJkAAAAABJ0AAAAAEKEAAAAAEKUAAAAABKkAAAAABK0AAAAABLEAAAAABLUAAHwAhCxUAACAAIBYAACEAIBcAACEAICZAAAAAASdAAAAABChAAAAABClAAAAAASpAAAAAAStAAAAAASxAAAAAAS1AAB8AIQgmAgAAAAEnAgAAAAQoAgAAAAQpAgAAAAEqAgAAAAErAgAAAAEsAgAAAAEtAgAgACEIJkAAAAABJ0AAAAAEKEAAAAAEKUAAAAABKkAAAAABK0AAAAABLEAAAAABLUAAIQAhDhUAACMAIBYAACQAIBcAACQAICYBAAAAAScBAAAABSgBAAAABSkBAAAAASoBAAAAASsBAAAAASwBAAAAAS0BACIAIS4BAAAAAS8BAAAAATABAAAAAQgmAgAAAAEnAgAAAAUoAgAAAAUpAgAAAAEqAgAAAAErAgAAAAEsAgAAAAEtAgAjACELJgEAAAABJwEAAAAFKAEAAAAFKQEAAAABKgEAAAABKwEAAAABLAEAAAABLQEAJAAhLgEAAAABLwEAAAABMAEAAAABDCaAAAAAASmAAAAAASqAAAAAASuAAAAAASyAAAAAAS2AAAAAATEBAAAAATIBAAAAATMBAAAAATSAAAAAATWAAAAAATaAAAAAAQ4VAAAgACAWAAAnACAXAAAnACAmAQAAAAEnAQAAAAQoAQAAAAQpAQAAAAEqAQAAAAErAQAAAAEsAQAAAAEtAQAmACEuAQAAAAEvAQAAAAEwAQAAAAELJgEAAAABJwEAAAAEKAEAAAAEKQEAAAABKgEAAAABKwEAAAABLAEAAAABLQEAJwAhLgEAAAABLwEAAAABMAEAAAABDBoAACgAMBsAAAQAEBwAACgAMB0BACkAIR4BACkAIR8BACkAISABACkAISEAACoAICIBACkAISMBACsAISRAACwAISVAACwAIQsmAQAAAAEnAQAAAAQoAQAAAAQpAQAAAAEqAQAAAAErAQAAAAEsAQAAAAEtAQAnACEuAQAAAAEvAQAAAAEwAQAAAAEMJoAAAAABKYAAAAABKoAAAAABK4AAAAABLIAAAAABLYAAAAABMQEAAAABMgEAAAABMwEAAAABNIAAAAABNYAAAAABNoAAAAABCyYBAAAAAScBAAAABSgBAAAABSkBAAAAASoBAAAAASsBAAAAASwBAAAAAS0BACQAIS4BAAAAAS8BAAAAATABAAAAAQgmQAAAAAEnQAAAAAQoQAAAAAQpQAAAAAEqQAAAAAErQAAAAAEsQAAAAAEtQAAhACEAAAAAATcBAAAAAQE3AQAAAAEBN0AAAAABAAAAAAMVAAYWAAcXAAgAAAADFQAGFgAHFwAIAQIBAgMBBQYBBgcBBwgBCQoBCgwCCw0DDA8BDRECDhIEERMBEhQBExUCGBgFGRkJ"
};
async function decodeBase64AsWasm(wasmBase64) {
    const { Buffer } = await import('node:buffer');
    const wasmArray = Buffer.from(wasmBase64, 'base64');
    return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
    getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
    getQueryCompilerWasmModule: async () => {
        const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
        return await decodeBase64AsWasm(wasm);
    },
    importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
    return runtime.getPrismaClient(config);
}
//# sourceMappingURL=class.js.map