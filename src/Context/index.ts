// import { MqttClient } from "mqtt";
import { PubSub } from "graphql-subscriptions";
import { PrismaClient } from "../generated/client";

export interface Context {
  // mqttClient: MqttClient;
  pubSub: PubSub;
  prisma: PrismaClient
}


export function resolveContext(
  { req }: any,
  PubSub: PubSub,
  prisma: PrismaClient
): Context {
  return {
    pubSub: PubSub,
    prisma
  };
}

export interface subsContext{
  pubSub: PubSub,
  prisma: PrismaClient
};

export function resolveSubsContext(
  ctx: any,
  _msg: any,
  _args: any,
  PubSub: PubSub,
  prisma: PrismaClient
): subsContext {
  return {pubSub: PubSub, prisma}
}
