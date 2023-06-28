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
  handleModal?: (value: void) => void;
}

export interface StatsProps {
  totalApps: number;
  stackPercentage: {
    full: string,
    frontend: string,
    backend: string,
  };
  responseRate: {
    noResponse: string,
    anyResponse: string,
  };
  responseRateByAppStyle: {
    regular: {
      noResponse: string;
      anyResponse: string;
    }
    quick: {
      noResponse: string;
      anyResponse: string;
    }
    codesmith: {
      noResponse: string;
      anyResponse: string;
    }
  };
}