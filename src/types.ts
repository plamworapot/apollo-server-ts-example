import { FriendDataSource } from "./FriendDataSource";

export type DataSourceType = {
    friendDataSource: FriendDataSource
}

export type ContextType = {
    dataSources: DataSourceType,
    authorization: string
}