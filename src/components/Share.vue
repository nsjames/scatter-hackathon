<template>
    <section class="box" style="margin-top:50px;">
        <h2>Share This Page!</h2>
        <p>
            In this day and age it takes a mob to get the word out about anything.
            If you know any developers be sure to let them in on this opportunity.
            <br><br>
            <b>If you are signed up as a user you can share your personal link for a chance to win prizes!</b>
        </p>
        <h5 v-if="user" style="text-decoration: underline">{{shareableURL()}}</h5>


        <figure @click="twitterShare()" class="button">Share on <b>Twitter</b></figure>
        <figure @click="facebookShare()" class="button short-top">Share on <b>Facebook</b></figure>
        <a href="https://t.me/HackTilDawn"><figure class="button short-top">Join our <b>Telegram</b></figure></a>

        <hr/>

        <p>
            <b>Don’t stop there.</b>
            <br><br>

            Write about this on
            <span class="links">
                        <a href="https://steemit.com/">Steemit</a>, <a href="https://busy.org/">Busy</a>,
                    <a href="https://medium.com/">Medium</a> or any other blog platform you participate in.
                    Tell your friends on
                    <a href="https://telegram.org/">Telegram</a>. Post about it on
                    <a href="https://www.reddit.com/">Reddit</a>. Help get the word out any way you can.
                    </span>
        </p>
    </section>
</template>
<script>
    import { mapActions, mapGetters, mapState } from 'vuex'
    import * as Actions from '../store/constants';
    import {RouteNames} from '../vue/Routing'

    export default {
        data(){ return {

        }},
        computed: {
            ...mapState([
                'user',
            ])
        },
        methods: {
            shareableURL(){
                return this.user ? `https://refs.hack-til-dawn.com/${this.user.keyid}` : "https://hack-til-dawn.com/";
            },
            twitterShare(){
                const text = `Check out this completely online #EOS hackathon!`;
                window.open(`http://twitter.com/share?url=${encodeURIComponent(this.shareableURL())}&text=${encodeURIComponent(text)}`, '',
                    'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0');
            },
            facebookShare(){
                const text = `Check out this completely online EOS hackathon!`;
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.shareableURL())}&quote=${text}&hashtag=#EOS`, '',
                    'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0');
            },
            ...mapActions([

            ])
        }
    }
</script>
<style lang="scss">

</style>