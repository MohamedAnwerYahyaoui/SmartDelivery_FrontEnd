import { IndividualNotification } from "./IndividualNotification";

export interface GroupNotification {
    template: string;
    notifications: IndividualNotification[];
  }