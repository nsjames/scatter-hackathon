import * as Mutations from './constants'

export const mutations = {
    [Mutations.SET_SCATTER]:(state, scatter) => state.scatter = scatter,
    [Mutations.SET_IDENTITY]:(state, identity) => state.identity = identity
};