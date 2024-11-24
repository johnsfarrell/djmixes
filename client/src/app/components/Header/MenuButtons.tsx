'use client';
import MobileUploadButton from '@/app/components/Header/MobileUploadButton';
import UploadButton from '@/app/components/Header/UploadButton';
import NotificationsButton from '@/app/components/Header/NotificationsButton';
import Avatar from '@/app/components/Header/Avatar';

interface MenuButtonsProps {
  notificationsCount: number;
  avatarImageUrl?: string;
}

export default function MenuButtons({
  notificationsCount,
  avatarImageUrl
}: MenuButtonsProps) {
  const onUploadClick = () => {
    // go to upload page
    window.location.href = '/mix/new';
  };

  const onNotificationsClick = () => {
    // TODO: show notifications
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
