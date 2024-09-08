import { z, ZodType } from "zod";
import { ZodSchemaTypes } from "./types";
import { GuildsApiTypes } from "../services/guilds/types";

export namespace ZodSchemas {
  const MAX_FILE_SIZE = 1_048_576;
  const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

  export const guildCreate: ZodType<ZodSchemaTypes.GuildCreate> = z.object({
    name: z
      .string()
      .min(3, { message: "Guild name too short" })
      .max(10, { message: "Guild name too long" }),
    description: z.string().min(0).max(300, { message: "Description to long" }),
    link: z.string({ message: "Link is required" }),
    image: z
      .any()
      .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 1MB.`)
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
        "Only .jpg, .jpeg, .png and .webp formats are supported.",
      ),
    joinMethod: z.nativeEnum(GuildsApiTypes.JoinMethod),
  });
}
