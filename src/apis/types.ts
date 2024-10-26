export interface IAuthRes {
  nickname?: string | null;
  token?: string | null;
}

export interface IProductRes {
  profit?: number | null;
  name?: string | null;
  category?: string | null;
  risk?: number | null;
  url?: string | null;
}

export interface IFollowingRes {
  userId?: number | null;
  nickname?: string | null;
  clubName?: string | null;
}

export interface IFollowerRes {
  userId?: number | null;
  nickname?: string | null;
  clubName?: string | null;
}

export interface IPostRes {
  clubId?: number | null;
  clubName?: string | null;
  content?: string | null;
  createdAt?: Date | null;
  id?: number | null;
  nickname?: string | null;
  pv?: number | null;
  title?: string | null;
  updatedAt?: Date | null;
  userId?: number | null;
}
