//import VuexORMisDirtyPlugin from '@vuex-orm/plugin-change-flags';
import VuexORMSearch from '@vuex-orm/plugin-search'
import VuexORM from '@vuex-orm/core'
import database from '~/database'

//VuexORM.use(VuexORMisDirtyPlugin);
VuexORM.use(VuexORMSearch, {
    // Configure default fuse.js options here (see "Configuration" section below).
})


export const plugins = [
    VuexORM.install(database)
];


import Show from "~/models/Show";
import Episode from "~/models/Episode";

export const actions = {
    async nuxtServerInit(store, {$auth, $axios}) {
        if ($auth.loggedIn) {
            Show.create({data: await this.$axios.$get('/api/shows')});
            Episode.create({data: await this.$axios.$get('/api/episodes')});
            store.state.lastUpdated = Math.floor(Date.now() / 1000);
        }
    }
};


export const mutations  = {
    updateTimestamp (state) {
        state.lastUpdated = Math.floor(Date.now() / 1000);
    }
}