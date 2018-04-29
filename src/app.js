import VueInitializer from './vue/VueInitializer';
import {Routing} from './vue/Routing';
import * as Actions from './store/constants'
import {RouteNames} from './vue/Routing'

import ViewBase from './views/Base.vue'
import Hero from './components/Hero.vue'
import FloatingMenu from './components/FloatingMenu.vue'
import Join from './components/Join.vue'
import Donate from './components/Donate.vue'
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



                // window.scatter.getIdentity();
                // const key = 'EOS8PZGdkgrN6Wgrh3ZPdeRRieAQGFR9SstCana61s7pVrHcp74bh';
                // const key = window.scatter.identity.publicKey;
                // window.scatter.requestArbitrarySignature(key, '3aad9fc133fc1f53e8f233a235f040e7e535d733f28970eebac3168a78507016', 'Please sign this hash to verify authentication', true).then(res => {
                //     console.log('res',res);
                //     console.log('res',res.toString());
                // })
                window.scatter = null;






                // const host = process.env.NETWORK_HOST;
                // const port = process.env.NETWORK_PORT;
                // const network = { host, port };
                // const eosOptions = {};
                // const eos = store.state.scatter.eos( Eos.Localnet, network, eosOptions );
                // store.dispatch(Actions.SET_EOSJS, eos);
            })
        });
    }

}

const popup = new App();
