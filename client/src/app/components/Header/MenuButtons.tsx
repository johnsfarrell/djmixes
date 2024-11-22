'use client';
import MobileUploadButton from './MobileUploadButton';
import UploadButton from './UploadButton';
import NotificationsButton from './NotificationsButton';
import Avatar from './Avatar';

interface MenuButtonsProps {
  notificationsCount: number;
  avatarUrl?: string;
}

export default function MenuButtons({
  notificationsCount,
  avatarUrl
}: MenuButtonsProps) {
  const onUploadClick = () => {
    // go to upload page
    window.location.href = '/mix/new';
  };

  const onNotificationsClick = () => {
    // TODO: show notifications
  };

  const onAvatarClick = () => {
    // go to profile page
    window.location.href = '/profile';
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
        <Avatar imageUrl={avatarUrl} onClick={onAvatarClick} />
      </div>
    </div>
  );
}
