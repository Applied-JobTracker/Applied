import { MouseEventHandler } from "react";

export interface FeedItemProps {
  company: string;
  date: string;
  appType: string;
  stack: string;
  appID: string;
  progress: string;
  toggleModal?: MouseEventHandler;
}

export type UserProps = {
  userId: string;
}