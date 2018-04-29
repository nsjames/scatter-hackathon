import Landing from '../views/Landing.vue'
import Teams from '../views/Teams.vue'
import Team from '../views/Team.vue'
import Ideas from '../views/Ideas.vue'
import CreateAccount from '../views/CreateAccount.vue'
import CreateTeam from '../views/CreateTeam.vue'
import Dashboard from '../views/Dashboard.vue'
import RulesAndFaq from '../views/RulesAndFaq.vue'

export const RouteNames = {
    INDEX:'index',
    TEAMS:'teams',
    TEAM:'team/:name',
    IDEAS:'ideas',
    CREATE_ACCOUNT:'create-account',
    CREATE_TEAM:'create-team',
    DASHBOARD:'dashboard',
    RULES_AND_FAQ:'rules-and-faq'
};

const RouteViews = {
    [RouteNames.INDEX]:Landing,
    [RouteNames.TEAMS]:Teams,
    [RouteNames.TEAM]:Team,
    [RouteNames.IDEAS]:Ideas,
    [RouteNames.CREATE_ACCOUNT]:CreateAccount,
    [RouteNames.CREATE_TEAM]:CreateTeam,
    [RouteNames.DASHBOARD]:Dashboard,
    [RouteNames.RULES_AND_FAQ]:RulesAndFaq,
};

export class Routing {

    static builder(){
        const routeNames = Object.keys(RouteNames).map(key => RouteNames[key]);

        let routesBuilder = {};
        routeNames.map(routeName => {
            routesBuilder[routeName] = {
                path:routeName === RouteNames.INDEX ? '' : '/'+routeName,
                name:routeName,
                component: RouteViews[routeName]
            }
        });

        return routesBuilder;
    }

    static routes(){
        return Object.keys(Routing.builder())
            .map(routeName => Routing.builder()[routeName]);
    }
}