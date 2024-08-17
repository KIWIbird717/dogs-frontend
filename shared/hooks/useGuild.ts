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

  const [guildImage, setGuildImage] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [inputValue, setInputValue] = useState<null | string>(null);

  const FoundOrFetchedGuilds = inputValue ? foundGuilds : guilds;

  const { user, getMe, onChangeGuildName } = useUser();
  const { guild: myGuildId } = user;

  const isMyGuild = myGuildId === guildId.id;

  const handleFetchGuildById = async (guildId: string) => {
    try {
      setIsLoading(true);
      const { data } = await GuildsService.getGuild(guildId);
      setGuild(data);
      await getImageOfGuild(data.image);
    } catch (error) {
      logger.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleJoinGuild = async (guildId: string) => {
    try {
      await GuildsService.joinGuild(guildId);
      await getMe();
      await handleFetchGuildById(guildId)
    } catch (error) {
      logger.error(error);
    }
  };

  const handleToggleGuild = async () => {
    if (isMyGuild) {
      try {
        await GuildsService.leaveGuild();
        await getMe();
        onChangeGuildName(null)
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
      const data = await GuildsService.getGuildsImage(imageName);
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
    handleFetchGuildById,
    onChangeValueDebounce
  };
};