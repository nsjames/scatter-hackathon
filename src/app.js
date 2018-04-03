import VueInitializer from './vue/VueInitializer';
import {Routing} from './vue/Routing';
import * as Actions from './store/constants'
import {RouteNames} from './vue/Routing'

import ViewBase from './views/Base.vue'
import Hero from './components/Hero.vue'

class App {

    constructor(){
        const routes = Routing.routes();
        const components = [
            {tag:'view-base', vue:ViewBase},
            {tag:'hero', vue:Hero}
        ];

        const middleware = (to, next, store) => {
            next();
        };

        new VueInitializer(routes, components, middleware, (router, store) => {
            // document.addEventListener('scatterLoaded', () => {
            //
            //     window.scatter.requireVersion(2.1);
            //     store.dispatch(Actions.SET_SCATTER, window.scatter);
            //     store.dispatch(Actions.SET_IDENTITY, window.scatter.identity);
            //     window.scatter = null;
            //
            //     const host = process.env.NETWORK_HOST;
            //     const port = process.env.NETWORK_PORT;
            //     const network = { host, port };
            //     const eosOptions = {};
            //     const eos = store.state.scatter.eos( Eos.Localnet, network, eosOptions );
            //     store.dispatch(Actions.SET_EOSJS, eos);
            // })
        });
    }

}

const popup = new App();
