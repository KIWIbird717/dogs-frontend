"use client";

import { UsersService } from "@/shared/lib/services/users/users";
import { memo, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

/**
 * Держит приглашение по invite link
 * - если на стартовой странице "./" был установлен id пользователя,
 * который пригласил пользователя в localStorage, то тут мы получаем
 * этот id и отправляем ответ на инвайт
 * - затем удаляем id из localStorage, чтобы он больше не мешал
 * и не отправлял лишние запросы
 */
export const InvitationHandler = memo(() => {
  const inviterId = localStorage.getItem("inviterId");

  useEffect(() => {
    if (!inviterId) return;

    (async () => {
      const response = await UsersService.iAmFromInviteLink({
        invitedByTgUserId: parseInt(inviterId),
      });

      toast.success(`You invited by ${response.data.inviter.username}`);
    })();
  }, []);

  return <Toaster />;
});

InvitationHandler.displayName = "InvitationHandler";
