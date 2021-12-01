Vue.component('filter-el', {
    data(){
      return {
          userSearch: ''
      }
    },
    template: `<form action="#" class="search-form" @submit.prevent="$parent.$refs.products.filter(userSearch)">
                <input type="text" class="search-field" v-model="userSearch">
                <button type="submit" class="btn-search">
                    <i class="fas fa-search"></i>
                </button>
            </form>`
})


    // < form action = "#" class="search-form" @submit.prevent="filter" >
    //     <input type="text" class="search-field" v-model="userSearch" >
    //         <button class="btn-search" type="submit">
    //             <i class="fas fa-search"></i>
    //         </button>
    //     </form>