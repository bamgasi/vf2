<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <site-title :title="site.title" />
      <v-spacer />
      <site-sign></site-sign>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer" width="400">
      <site-menu :items="site.menu"></site-menu>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
    <site-footer :footer="site.footer" />
  </v-app>
</template>

<script>
import SiteTitle from '@/views/site/Title'
import SiteFooter from '@/views/site/footer'
import SiteMenu from '@/views/site/menu'
import SiteSign from '@/views/site/sign'

export default {
  name: 'App',
  components: {
    SiteTitle,
    SiteFooter,
    SiteMenu,
    SiteSign,
  },
  data: () => ({
    drawer: false,
    site: {
      title: 'Site Title',
      footer: 'Site Footer',
      menu: [
        {
          title: 'home',
          icon: 'mdi-home',
          subItems: [
            {
              title: 'Dashboard',
              to: '/',
            },
            {
              title: 'About',
              to: '/about',
            },
          ],
          to: '/',
        },
        {
          title: 'About',
          icon: 'mdi-help-box',
          subItems: [
            {
              title: 'XXX',
              to: '/xxx',
            },
          ],
          to: '/about',
          active: true,
        },
      ],
    },
  }),
  created() {
    this.subscribe()
  },
  methods: {
    subscribe() {
      this.$firebase
        .database()
        .ref()
        .child('site')
        .on(
          'value',
          (sn) => {
            const v = sn.val()
            if (!v) {
              this.$firebase.database().ref().child('site').set(this.site)
            } else {
              this.site = v
            }
          },
          (e) => {
            console.log(e.message)
          }
        )
    },
  },
}
</script>
