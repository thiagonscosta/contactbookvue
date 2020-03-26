<template>
  <v-content>
    <v-sheet class="overflow-hidden">
      <v-app-bar
        class="py-3"
        absolute
        color="teal"
        dark
      >
        <v-app-bar-nav-icon @click="openDrawer"></v-app-bar-nav-icon>

        <v-toolbar-title>Contact Book</v-toolbar-title>
        <template
          slot="extension"
        >
          <v-tabs
            class="mt-3"
            background-color="teal"
            dark
            grow
          >
            <v-tab>
              Contacts
            </v-tab>
            <v-tab>
              Chats
            </v-tab>

            <v-tab-item>
              <list-contacts />                     
            </v-tab-item>

            <v-tab-item >
                                  
            </v-tab-item>

          </v-tabs>
        </template>

      </v-app-bar>
    </v-sheet>
    <navigation-drawer />
  </v-content>
  

</template>

<script>
import ListContacts from '@/components/ListContacts.vue'
import NavigationDrawer from '@/components/NavigationDrawer.vue'

export default {
  name: 'home',
  
  components: {
    ListContacts,
    NavigationDrawer
  },

  data () {
    return {
      username: {},
    }
  },

  computed: {
    user () {
      return this.$store.getters.getUser
    }
  },

  created: function () {
    this.username = this.$store.state.auth.user;
  },

  methods: {
    openDrawer () {
      this.$bus.$emit('drawer', true)
    }
  }

}
</script>
