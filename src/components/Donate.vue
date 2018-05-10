<template>
    <section class="box blue-border" style="margin-top:50px;">
        <h2>Make a Donation, Win some Prizes</h2>
        <p>
            Donations are added to the pot and given to the winners. <b>Every Voter User who donates will take part in a raffle and could win prizes such
            as a Ledger Nano</b>. You can donate as many times as you wish.
        </p>
        <a :href="'https://etherscan.io/address/'+ethaddr" target="_blank">
            <h2 v-if="totalBalance > 0"><u>Current Community Pot: ${{totalBalance}}</u></h2>
        </a>

        <section class="box blue-border" style="margin-top:20px;">
            <h3><b>Send any amount of EOS or ETH to Hack Til Dawn</b></h3>
            <p>Donation Raffles will only be drawn from donations above $10.</p>
            <h4 class="eth os"><b>{{ethaddr}}</b></h4>
            <figure style="margin-top:20px;">
                <img src="assets/img/qr.png"/>
            </figure>
        </section>


        <section v-if="user && donationCount < 50">
            <hr/>
            <p>Once you've sent your donation send us the transaction hash so that we can link it to your user.</p>
            <div style="height:10px;"></div>
            <input class="link" v-model="trx" placeholder="Transaction Hash: 0x2446f1fd773..." />
            <figure class="button" @click="submitTransaction" style="margin-top:10px;">Submit <b>Transaction</b></figure>
            <section class="box" v-if="error">
                <p>{{error}}</p>
            </section>
        </section>
    </section>
</template>
<script>
    import { mapActions, mapGetters, mapState } from 'vuex'
    import * as Actions from '../store/constants';
    import {RouteNames} from '../vue/Routing'
    import ContractService from '../services/ContractService'
    import axios from "axios";

    export default {
        data(){ return {
            trx:'',
            error:'',
            donationCount:50,
            ethaddr:process.env.ETH_WALLET,
            totalBalance:0,
        }},
        computed: {
            ...mapState([
                'user',
                'scatter'
            ])
        },
        mounted(){
            setTimeout(() => {
                if(this.user) ContractService.getDonationsCount(this.user.keyid).then(count => this.donationCount = count);
            },1000);


            this.getTotalDonations();
        },
        methods: {
            getTotalDonations(){
                const getPrices = async() => {

                    const eosurl = 'https://api.etherscan.io/api'+
                        '?module=account'+
                        '&action=tokenbalance'+
                        '&contractaddress=0x86fa049857e0209aa7d9e616f7eb3b3b78ecfdb0'+
                        '&address='+this.ethaddr+
                        '&tag=latest'+
                        '&apikey=EAVECICTZ9BRSZB92JGFRJYXCQ51ER3KR6';

                    const ethurl = `https://api.etherscan.io/api?module=account&action=balance&address=${this.ethaddr}&tag=latest`;

                    const tickerurl = 'https://api.coinmarketcap.com/v1/ticker/';

                    const decimals = 1000000000000000000;
                    const eosprice = await axios({ method: "GET", url:tickerurl+'eos/' }).then(result => result.data[0].price_usd );
                    const ethprice = await axios({ method: "GET", url:tickerurl+'ethereum/' }).then(result =>  result.data[0].price_usd);
                    const eosbal = await axios({ method: "GET", url:eosurl }).then(result => result.data.result/decimals);
                    const ethbal = await axios({ method: "GET", url:ethurl }).then(result => result.data.result/decimals);
                    return {eosprice, ethprice, eosbal, ethbal};
                };

                getPrices().then(({eosprice, ethprice, eosbal, ethbal}) => {
                    this.totalBalance = Math.floor(ethbal * ethprice + eosbal * eosprice);
                })
            },
            submitTransaction(){
                this.error = null;
                if(!this.trx.length) return false;
                ContractService.getSignature(this.scatter, this.user.key).then(async sig => {
                    if(!sig) return false;
                    const donated = await ContractService.donation(this.user, this.trx, sig).catch(error => {
                        this.error = JSON.parse(error).error.details[0].message.replace('condition: assertion failed: ', '');
                    });
                    if(!donated) return false;
                    ContractService.getDonationsCount(this.user.keyid).then(count => this.donationCount = count);
                })
            },
            ...mapActions([

            ])
        }
    }
</script>

<style lang="scss">

</style>