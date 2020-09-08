<template>
    <div>
     <span style="text-align:center;">
      <h1>Login</h1>
<img style="margin-left:40%" src="@/assets/Group_127.svg" />
      </span>
<b-row class="h-100">
    <b-col sm="6" md="6" class="mx-auto my-auto">
<b-form class="m-5" @submit.prevent="login">
      <b-form-group
        id=""
        label="Email:"
        label-for=""
         class="text-left">
        <b-form-input
          id=""
          type="email"
          v-model="form.username"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id=""
        label="Password:"
        label-for=""
         class="text-left">
        <b-form-input
          id=""
          type="password"
          v-model="form.password"
        ></b-form-input>
      </b-form-group>
               <div class="d-flex justify-content-between">
               <b-form-checkbox >Remember me</b-form-checkbox><p><router-link tag="a" to="/user/forgot-password">Forgot Password</router-link></p>
               </div>
                <b-button block type="submit" class="mt-4 btn">LOGIN</b-button>
                <p class="mt-5">Don't have an account? <router-link to="/user/register">Sign Up now</router-link></p>

</b-form>
    </b-col>
</b-row>

    </div>
</template>

<script>
    export default {
        data(){
          return{
            form:{
              username:'',
              password:''
            }
          }
        },
        methods:{
          login(){
            this.$router.push({name:'Home'});
            return
            this.$store.dispatch('login',this.form)
            .then(res=>{
              if ("access_token" in res.data) {
                this.$router.push('/');
              }
            })
            .catch(err=>{
              console.log(err)
            })
          }
        }
    }
</script>

<style lang="scss" scoped>
.btn{
background-color: #867AB4
}

</style>