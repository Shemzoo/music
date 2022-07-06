<template>
  <!-- Auth Modal -->
  <div class="fixed z-10 inset-0 overflow-y-auto" id="modal"
   :class="{ hidden: !authModalShow }">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center
      sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden
        shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">

        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="py-4 text-left px-6">
          <!--Title-->
          <div class="flex justify-between items-center pb-4">
            <p class="text-2xl font-bold">Your Account</p>
            <!-- Modal Close Button -->
            <div class="modal-close cursor-pointer z-50"
            @click.prevent="toggleAuthModal"
            @keydown.esc="toggleAuthModal"
            >
              <i class="fas fa-times"></i>
            </div>
          </div>

          <!-- Tabs -->
          <ul class="flex flex-wrap mb-4">
            <li class="flex-auto text-center">
              <a class="block rounded py-3 px-4 transition " href="#"
                 @click.prevent="tab = 'login'"
                 :class="{
                  'hover:text-white text-white bg-blue-600': tab === 'login',
                  'hover:text-blue-600': tab === 'register'
                  }">Login</a>
            </li>
            <li class="flex-auto text-center">
              <a class="block rounded py-3 px-4 transition hover:text-blue-600"
               @click.prevent="tab = 'register'"
               :class="{
                'hover: hover:text-white text-white bg-blue-600' : tab === 'register',
                'hover:text-blue-600' : tab === 'login'
               }"
                href="#">Register</a>
            </li>
          </ul>

          <!-- Login Form -->
          <form v-show="tab === 'login'">
            <!-- Email -->
            <div class="mb-3">
              <label for="loginEmail" class="inline-block mb-2">
                Email
                  <input type="email" id="loginEmail"
                    class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                      duration-500 focus:outline-none focus:border-black rounded"
                    placeholder="Enter Email"/>
                </label>
            </div>
            <!-- Password -->
            <div class="mb-3">
              <label for="loginPassword" class="inline-block mb-2">
                Password
                  <input type="password" id="loginPassword"
                  class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                    duration-500 focus:outline-none focus:border-black rounded"
                  placeholder="Password" />
                </label>
            </div>
            <button type="submit"
              class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition
                hover:bg-purple-700">
              Submit
            </button>
          </form>
          <!-- Registration Form -->
          <vee-form v-show="tab === 'register'" :validation-schema="schema"
            @submit="register" :initial-values="userData">
            <!-- Name -->
            <div class="mb-3">
               <label class="inline-block mb-2"></label>
                Name
                <vee-field name="name" :bails="false" v-slot=" { field, errors }">
                  <input type="text" class="block w-full py-1.5 px-3 text-gray-800
                   border border-gray-300 transition
                   duration-500 focus:outline-none focus:border-black rounded"
                   placeholder="Enter Name" v-bind="field"/>
                   <div class="text-red-600" v-for="error in errors" :key="error">
                    {{ error }}
                   </div>
                </vee-field>
            </div>
            <!-- Email -->
            <div class="mb-3">
              <label class="inline-block mb-2"></label>
                Email
                <vee-field name="email" :bails="false" v-slot="{ field, errors }">
                  <input type="email"
                    class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                      duration-500 focus:outline-none focus:border-black rounded"
                    placeholder="Enter Email" v-bind="field">
                    <div class="text-red-600" v-for="error in errors" :key="error">
                      {{ error }}
                    </div>
                  </vee-field>
            </div>
            <!-- Age -->
            <div class="mb-3">
              <label class="inline-block mb-2"></label>
                Age
                <vee-field :bails="false" name="age" v-slot="{ errors, field }">
                  <input type="number" v-bind="field"
                   class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                   duration-500 focus:outline-none focus:border-black rounded">
                   <div class="text-red-600" v-for="error in errors">
                    {{ error }}
                   </div>
                </vee-field>
            </div>
            <!-- Password -->
            <div class="mb-3">
              <label class="inline-block mb-2">Password</label>
              <vee-field name="password" :bails="false" v-slot="{ field, errors }">
                <input type="password" class="block w-full py-1.5 px-3 text-gray-800
                  border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
                  placeholder="Password" v-bind="field" />
                  <div class="text-red-600" v-for="error in errors" :key="error">
                  {{ error }}
                </div>
              </vee-field>
            </div>
            <!-- Confirm Password -->
            <div class="mb-3">
              <label class="inline-block mb-2"></label>
                Confirm Password
                <vee-field name="confirm_password" :bails="false" v-slot="{ field, errors }">
                <input type="password" class="block w-full py-1.5 px-3 text-gray-800
                 border border-gray-300 transition
                 first-letter:duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Confirm Password" v-bind="field">
                <div class="text-red-600" v-for="error in errors" :key="error">
                  {{ error }}
                </div>
                </vee-field>
            </div>
            <!-- Country -->
            <div class="mb-3">
              <label class="inline-block mb-2"></label>
                Country
                <vee-field name="country" :bails="false" v-slot="{ field, errors }">
                  <select v-bind="field" class="block w-full py-1.5 px-3 text-gray-800 border
                   border-gray-300 transition
                    duration-500 focus:outline-none focus:border-black rounded">
                     <option value="USA">USA</option>
                      <option value="Mexico">Mexico</option>
                      <option value="Germany">Germany</option>
                      <option value="Antarctica">Antarctica</option>
                  </select>
                  <div class="text-red-600" v-for="error in errors" :key="error">
                    {{ error }}
                  </div>
                </vee-field>
            </div>
            <!-- TOS -->
            <div class="mb-3 pl-6">
              <label class="inline-block"></label>
                <vee-field type="checkbox" name="tos" value="1"
                 class="w-4 h-4 float-left -ml-6 mt-1 rounded" />
                Accept terms of service
                <ErrorMessage class="text-red-600" name="tos" />
            </div>
            <button type="submit"
              class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition
                hover:bg-purple-700">
              Submit
            </button>
          </vee-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'AppAuth',
  data() {
    return {
      tab: 'login',
      schema: {
        name: 'required|min:3|max:100|alphaSpaces',
        email: 'required|min:3|max:100|email',
        age: 'required|minValue:18|maxValue:120',
        password: 'required|min:3|max:100',
        confirm_password: 'passwords_mismatch:@password',
        country: 'required|country_excluded:Antarctica',
        tos: 'tos',
      },
      userData: {
        country: 'USA',
      },
    };
  },
  methods: {
    ...mapMutations(['toggleAuthModal']),
    register(values) {
      console.log(values);
    },
  },
  computed: {
    ...mapState(['authModalShow']),
  },
};

</script>

<style>

</style>
