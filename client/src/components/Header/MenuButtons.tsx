/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the MenuButtons component that displays the
 * upload and notification buttons in the header.
 */

'use client';
import MobileUploadButton from '@/components/Header/MobileUploadButton';
import UploadButton from '@/components/Header/UploadButton';
import Avatar from '@/components/Header/Avatar';

interface MenuButtonsProps {
  avatarImageUrl?: string;
}

/**
 * The MenuButtons component displays the upload and notification buttons in the
 * header.
 *
 * @param avatarImageUrl The URL of the user's avatar image.
 *
 * @returns The MenuButtons component.
 */
export default function MenuButtons(): JSX.Element {
  const onUploadClick = () => {
    // go to upload page
    window.location.href = '/mix/new';
  };

  return (
    <div className="flex items-center gap-3">
      <MobileUploadButton onClick={onUploadClick} />
      <UploadButton onClick={onUploadClick} />
      <div className="flex items-center gap-4">
        <Avatar />
      </div>
    </div>
  );
}
