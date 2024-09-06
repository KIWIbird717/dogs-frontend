import { GuildsApiTypes } from "../services/guilds/types";

export namespace ZodSchemaTypes {
  export type GuildCreate = {
    name: GuildsApiTypes.CreateDto["name"];
    description: GuildsApiTypes.CreateDto["description"];
    link: GuildsApiTypes.CreateDto["link"];
    image?: GuildsApiTypes.CreateDto["avatar"];
    joinMethod: GuildsApiTypes.CreateDto["joinMethod"];
  };
}
