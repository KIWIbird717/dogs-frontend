"use client";

import { LocalStorageKeys } from "@/shared/constants/localstorage-keys";
import { useAppDispatch } from "@/shared/lib/redux-store/hooks";
import { UserSlice } from "@/shared/lib/redux-store/slices/user-slice/userSlice";
import { GuildsService } from "@/shared/lib/services/guilds/guilds";
import { UsersService } from "@/shared/lib/services/users/users";
import { Logger } from "@/shared/lib/utils/logger/Logger";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

/**
 * Держит приглашение по invite link
 * - если на стартовой странице "./" был установлен id пользователя,
 * который пригласил пользователя в localStorage, то тут мы получаем
 * этот id и отправляем ответ на инвайт
 * - затем удаляем id из localStorage, чтобы он больше не мешал
 * и не отправлял лишние запросы
 */
export const InvitationHandler = () => {
  const dispatch = useAppDispatch();
  const logger = new Logger("InvitationHandler");

  useEffect(() => {
    const inviterId = localStorage.getItem(LocalStorageKeys.InviterId);
    const inviterGuildId = localStorage.getItem(LocalStorageKeys.InviterGuildId);

    const handleFriendInvitation = async (id?: string | null) => {
      if (!id) return;

      localStorage.removeItem(LocalStorageKeys.InviterId);

      const response = await UsersService.iAmFromInviteLink({
        invitedByTgUserId: parseInt(id),
      });

      toast.success(`You invited by ${response.data.inviter.username}`);
    };

    const handleGuildInvitation = async (id?: string | null) => {
      try {
        if (!id) return;

        localStorage.removeItem(LocalStorageKeys.InviterGuildId);

        const response = await GuildsService.joinGuild(id);

        dispatch(
          UserSlice.updateUser({ guild: response.data.guild, guildName: response.data.guildName }),
        );

        toast.success(`You invited to guild ${response.data.guildName}`);
      } catch (error) {
        logger.error("Can not handle guild invitation");
      }
    };

    handleFriendInvitation(inviterId);
    handleGuildInvitation(inviterGuildId);
  }, []);

  return <Toaster />;
};
