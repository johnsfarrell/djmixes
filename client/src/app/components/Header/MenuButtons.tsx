"use client";
import MobileUploadButton from "./MobileUploadButton";
import UploadButton from "./UploadButton";
import NotificationsButton from "./NotificationsButton";
import Avatar from "./Avatar";

interface MenuButtonsProps {
    notificationsCount: number;
    avatarImageUrl?: string;
}

export default function MenuButtons( { notificationsCount, avatarImageUrl }: MenuButtonsProps ) {
  const onUploadClick = () => {
    alert('Upload button clicked');
  };

  const onNotificationsClick = () => {
    alert('Notifications button clicked');
  };

  return (
    <div className="flex items-center gap-3">
      <MobileUploadButton onClick={onUploadClick} />
      <UploadButton onClick={onUploadClick} />
      <div className="flex items-center gap-4">
        <NotificationsButton 
          hasNotifications={notificationsCount > 0} 
          count={notificationsCount}
          onClick={onNotificationsClick}
        />
        <Avatar 
          imageUrl={avatarImageUrl}
        />
      </div>
    </div>
    );
}