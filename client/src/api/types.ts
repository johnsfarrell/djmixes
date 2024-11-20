export interface Tag {
  id: string;
  text: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  timestamp: string; // TODO: separate song type from song timestamps on mixes 
  albumArt?: string;
}

export interface Stem {
  id: string;
  title: string;
}

export interface Mix {
  id: string;
  title: string;
  dj: User;
  tags: Tag[];
  songs: Song[];
  stems: Stem[];
  artwork?: string;
}

export interface User {
  id: string;
  name: string;
  profilePhoto?: string;
}