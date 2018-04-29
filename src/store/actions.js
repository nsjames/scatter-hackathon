import * as Actions from './constants'
import ContractService from '../services/ContractService'

export const actions = {
    [Actions.SET_SCATTER]:({commit}, scatter) => commit(Actions.SET_SCATTER, scatter),
    [Actions.SET_USER]:async({commit}, user) => commit(Actions.SET_USER, user),
    [Actions.SET_TEAM]:async({commit}, team) => commit(Actions.SET_TEAM, team),
    [Actions.SET_IDENTITY]:async({commit}, identity) => {
        commit(Actions.SET_IDENTITY, identity);

        let user,team;
        if(identity){
            user = await ContractService.getUserFromPublicKey(identity.publicKey).catch(() => {});
            team = await ContractService.getTeamFromPublicKey(identity.publicKey).catch(() => {});
        }

        commit(Actions.SET_USER, user);
        commit(Actions.SET_TEAM, team);
    },
};