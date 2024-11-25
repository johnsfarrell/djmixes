'use client';
import MobileUploadButton from './MobileUploadButton';
import UploadButton from './UploadButton';
import Avatar from './Avatar';

interface MenuButtonsProps {
  avatarImageUrl?: string;
}

export default function MenuButtons({ avatarImageUrl }: MenuButtonsProps) {
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
        <Avatar imageUrl={avatarImageUrl} />
      </div>
    </div>
  );
}
