import VueInitializer from './vue/VueInitializer';
import {Routing} from './vue/Routing';
import * as Actions from './store/constants'
import {RouteNames} from './vue/Routing'

import ViewBase from './views/Base.vue'
import Hero from './components/Hero.vue'
import FloatingMenu from './components/FloatingMenu.vue'
import Join from './components/Join.vue'
import Donate from './components/Donate.vue'
import Sponsors from './components/Sponsors.vue'
import Share from './components/Share.vue'
import VueRecaptcha from 'vue-recaptcha';


import ecc from 'eosjs-ecc'
import Eos from 'eosjs'
import murmur from 'murmurhash'
import ContractService from './services/ContractService'

class App {

    constructor(){
        const routes = Routing.routes();
        const components = [
            {tag:'view-base', vue:ViewBase},
            {tag:'hero', vue:Hero},
            {tag:'floating-menu', vue:FloatingMenu},
            {tag:'recaptcha', vue:VueRecaptcha},
            {tag:'join', vue:Join},
            {tag:'donate', vue:Donate},
            {tag:'sponsors', vue:Sponsors},
            {tag:'share', vue:Share},
        ];

        const middleware = (to, next, store) => {
            next();
        };

        new VueInitializer(routes, components, middleware, (router, store) => {
            document.addEventListener('scatterLoaded', () => {

                window.scatter.requireVersion(3.0);
                store.dispatch(Actions.SET_SCATTER, window.scatter);
                store.dispatch(Actions.SET_IDENTITY, window.scatter.identity);

                ContractService.setApp(process.env.APP_ACC);
                ContractService.setSignProvider(signargs => {
                    return signargs.sign(signargs.buf, process.env.APP_KEY)
                });

                window.scatter = null;
            })
        });
    }

}

const popup = new App();
