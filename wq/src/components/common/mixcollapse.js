 import { mapGetters } from 'vuex'
    export default {
        computed:{
                ...mapGetters([
          'collapse',
        ]),
          colla(){
            return this.collapse
        },
        }
    }