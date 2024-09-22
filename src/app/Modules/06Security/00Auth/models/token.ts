// src/app/models/token.model.ts

import { Deserializable } from "@app/shared/models/deserializable";

export class Token implements Deserializable {
    type: string;
    token: string;
    refreshToken: string;
    deserialize(input: any): this {
        return Object.assign(this, input);
    }
}
