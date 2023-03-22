import { EventResolver } from "./events/indesx";

export const EventResolvers = {
    Subscription: {
        Event: EventResolver
    },
    Query: {
        hello: async () => {
            return true
        }
    }
}