import { useState } from "react";
import { GuildResponseWithMembersType, GuildsService } from "@/shared/lib/services/guilds/guilds";
import { useUser } from "@/shared/hooks/useUser";
import { useParams, useRouter } from "next/navigation";
import { Logger } from "@/shared/lib/utils/logger/Logger";

export const useGuild = () => {
  const logger = new Logger("fetchGuild");

  const guildId = useParams() as { id: string };
  const { push } = useRouter();

  const [guild, setGuild] = useState<GuildResponseWithMembersType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user, getMe } = useUser();
  const { guild: myGuildId } = user;

  const isMyGuild = myGuildId === guildId.id;

  const handleToggleGuild = async () => {
    if (isMyGuild) {
      try {
        await GuildsService.leaveGuild();
        await getMe();
        push("/guilds");
      } catch (error) {
        logger.error(error);
      }
    } else {
      try {
        await GuildsService.joinGuild(guildId.id);
        await getMe();
      } catch (error) {
        logger.error(error);
      }
    }
  };

  return {
    guild,
    guildId: guildId.id,
    myGuildId,
    isMyGuild,
    isLoading,

    setIsLoading,
    setGuild,
    handleToggleGuild,
  };
};