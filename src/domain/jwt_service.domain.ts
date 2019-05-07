import { JWT } from "@Domain/jwt_entity.domain";



export interface JWTService {
    sign(payload, exp): Promise<JWT>;
    validate(jwt, key): Promise<string | object>;
} 