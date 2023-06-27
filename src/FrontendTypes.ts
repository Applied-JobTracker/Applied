import { MouseEventHandler } from "react";

export interface FeedItemProps {
  company: string;
  date: string;
  appType: string;
  stack: string;
  appID: string;
  progress?: string;
}

export interface FeedItemDataProps {
  company: string;
  date: string;
  appType: string;
  stack: string;
  appID: string;
  progress?: string;
  handleEditClick: MouseEventHandler;
}

export type UserProps = {
  userId: string;
}