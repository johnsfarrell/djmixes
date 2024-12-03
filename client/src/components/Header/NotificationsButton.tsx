"use client";
import { Bell } from "lucide-react";

interface NotificationsButtonProps {
  hasNotifications?: boolean;
  count?: number;
  onClick?: () => void;
}

export default function NotificationsButton({
  hasNotifications = false,
  count = 0,
  onClick = () => {},
}: NotificationsButtonProps) {
  return (
    <button
      onClick={onClick}
      className="relative text-gray-400 hover:text-white hidden sm:block"
    >
      <Bell size={20} />
      {hasNotifications && count > 0 && (
        <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
          {count > 9 ? "9+" : count}
        </div>
      )}
    </button>
  );
}
