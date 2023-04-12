import { subsContext } from "../../Context"

export const EventResolver =  {
    subscribe: async function* (_parent: any, _args: any, _ctx: subsContext) {
        yield 1
        for await (const i of {
          [Symbol.asyncIterator]: () =>
            _ctx.pubSub.asyncIterator(["event_worker"]),
        }) {
          console.log(i)
          yield i;
        }
      },

    resolve: async (_parent: any, _args: any, _ctx: subsContext) => {
        const {id} = _args
        const bulk = await _ctx.prisma.bulkinEvents.findUnique({
          where: {
          uuid: id,
          },
          include: {
            BulkingEventsFailures: true
          }
        })
        return bulk
    }
}