<template>
    <section>
        <hero></hero>
        <floating-menu></floating-menu>
        <section class="container">

        </section>

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
                'scatter'
            ])
        },
        methods: {
            ...mapActions([

            ])
        }
    }
</script>

<style lang="scss">

</style>