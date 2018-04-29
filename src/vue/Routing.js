import Landing from '../views/Landing.vue'
import Teams from '../views/Teams.vue'
import CreateDevAccount from '../views/CreateDevAccount.vue'

export const RouteNames = {
    INDEX:'index',
    TEAMS:'teams',
    CREATE_DEV:'create-dev-account',
};

const RouteViews = {
    [RouteNames.INDEX]:Landing,
    [RouteNames.TEAMS]:Teams,
    [RouteNames.CREATE_DEV]:CreateDevAccount,
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