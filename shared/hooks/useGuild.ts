import { useState } from "react";
import { GuildResponseWithMembersType, GuildsService, IGuildResponse } from "@/shared/lib/services/guilds/guilds";
import { useUser } from "@/shared/hooks/useUser";
import { useParams, useRouter } from "next/navigation";
import { Logger } from "@/shared/lib/utils/logger/Logger";
import { useDebounce } from "@/shared/hooks/useDebounce";

export const useGuild = () => {
  const logger = new Logger("useGuild");

  const guildId = useParams() as { id: string };
  const { push } = useRouter();

  const [guilds, setGuilds] = useState<IGuildResponse[]>([]);
  const [guild, setGuild] = useState<GuildResponseWithMembersType | null>(null);
  const [foundGuilds, setFoundGuilds] = useState<IGuildResponse[]>([]);

  const [guildImage, setGuildImage] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [inputValue, setInputValue] = useState<null | string>(null);

  const FoundOrFetchedGuilds = inputValue ? foundGuilds : guilds;

  const { user, getMe } = useUser();
  const { guild: myGuildId } = user;

  const isMyGuild = myGuildId === guildId.id;

  const handleJoinGuild = async (guildId: string) => {
    try {
      await GuildsService.joinGuild(guildId);
      await getMe();
    } catch (error) {
      logger.error(error);
    }
  };

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
      await handleJoinGuild(guildId.id);
    }
  };

  const getImageOfGuild = async (imageName: string) => {
    try {
      const { data } = await GuildsService.getGuildsImage(imageName);
      setGuildImage(data);
    } catch (error) {
      logger.error(error);
    }
  };

  const handleRandomJoinGuild = async () => {
    try {
      const filteredGuilds = guilds.filter(item => item.joinMethod === "open");
      const randomGuild = filteredGuilds[Math.floor(Math.random() * filteredGuilds.length)];

      await handleJoinGuild(randomGuild._id);
    } catch (error) {
      logger.error(error);
    }
  };

  const onChangeValueDebounce = useDebounce(setInputValue, 350);


  return {
    guilds,
    guild,
    FoundOrFetchedGuilds,
    guildId: guildId.id,
    myGuildId,
    isMyGuild,
    isLoading,
    guildImage,
    inputValue,

    setIsLoading,
    setGuilds,
    setGuild,
    setFoundGuilds,
    handleToggleGuild,
    getImageOfGuild,
    handleJoinGuild,
    handleRandomJoinGuild,
    onChangeValueDebounce
  };
};