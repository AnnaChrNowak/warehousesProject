<template>
  <div class="login">
    <h2>{{ $t('auth.welcome') }}</h2>
    <form name="login" @submit.prevent="sendRequest">
      <div class="form-group">
        <div class="input-group">
          <input type="text" id="email" v-model="username" required="required" placeholder="username"/>

          <i class="bar"/>
        </div>
      </div>
      <div class="form-group">
        <div class="input-group">
          <input type="password" id="password" v-model="password" required="required" placeholder="password"/>

          <i class="bar"/>
        </div>
      </div>
      <div class="d-flex align--center justify--space-between">
        <button class="btn btn-primary" type="submit">
          {{ $t('auth.login') }}
        </button>
        <router-link class='link flex-center pl-2 text-center' :to="{name: 'signup'}">
          {{ $t('auth.createAccount') }}
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>

export default {
  name: 'login',
  data () {
    return {
      token : '',
      password: '',
      username: ''
    }
  },
  methods: {
    sendRequest () {
      const { password, username } = this;
      this.$store.dispatch('login', {password, username})
        .then(()=>{
          console.log(localStorage.getItem('user_token'))
          this.$router.push('*')
          console.log('lel')
      })
    }
  }
}
</script>

<style lang="scss">
.login {

  @include media-breakpoint-down(md) {
    width: 100%;
    padding-right: 2rem;
    padding-left: 2rem;
    .down-container {
      display: none;
    }
  }

  h2 {
    text-align: center;
  }
  width: 21.375rem;

  .down-container {
    margin-top: 3.125rem;
  }
}
</style>
