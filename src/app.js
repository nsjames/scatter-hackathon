import VueInitializer from './vue/VueInitializer';
import {Routing} from './vue/Routing';
import * as Actions from './store/constants'
import {RouteNames} from './vue/Routing'

import ViewBase from './views/Base.vue'
import Hero from './components/Hero.vue'
import FloatingMenu from './components/FloatingMenu.vue'


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
        ];

        const middleware = (to, next, store) => {
            next();
        };

        new VueInitializer(routes, components, middleware, (router, store) => {
            document.addEventListener('scatterLoaded', () => {

                window.scatter.requireVersion(3.0);
                store.dispatch(Actions.SET_SCATTER, window.scatter);
                store.dispatch(Actions.SET_IDENTITY, window.scatter.identity);
                window.scatter = null;

                console.log('namekey', murmur.v2('hello'));

                // const eos = Eos.Localnet({httpEndpoint:'http://192.168.56.101:8888', keyProvider:'5KjbZQLH3EAfgXF3jejYM2WZjzJCUQH7NEkT1mVcBy2xoFdSWro'});
                const getMemberFromName = async name => {
                    const uuid = murmur.v2(name);
                    const nameKey = await eos.getTableRows({
                        json:true,
                        code:'hackathon',
                        scope:'hackathon',
                        table:'membernames',
                        lower_bound:uuid,
                        upper_bound:uuid+1
                    }).then(res => res.rows[0]);
                    return eos.getTableRows({
                        json:true,
                        code:'hackathon',
                        scope:'hackathon',
                        table:'members',
                        lower_bound:nameKey.keyid,
                        upper_bound:nameKey.keyid+1
                    }).then(res => res.rows[0])
                };

                getMemberFromName('hello').then(x => {
                    console.log('xc', x);
                })





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
