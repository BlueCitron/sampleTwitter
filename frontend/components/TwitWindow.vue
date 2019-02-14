<template>
  <v-flex class="mx-5">
    <v-flex md8 :class="{ 'mx-5': true, 'my-3': index != 0 }" v-for="(item, index) in [1, 2, 3, 4, 5, 6, 7, 8, 9, ]">
      <v-card>
        <v-card-title>
          <h3> BlueCitron </h3>
          <h6 class="mx-4"> 1시간 전</h6>
        </v-card-title>
        <v-card-text>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </div>

          <h5 class="mt-4">#Lorem #ipsum</h5>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-flex>
</template>
<script>
export default {

}
</script>
