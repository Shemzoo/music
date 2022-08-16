<template>
    <div class="text-white text-center font-bold p-5 mb-4"
            v-if="reg_show_alert" :class="reg_alert_variant" >
            {{ reg_alert_msg }}
    </div>
    <vee-form :validation-schema="schema" @submit="register" :initial-values="userData">
    <!-- Name -->
    <div class="mb-3">
        <label class="inline-block mb-2">{{ $t('registerForm.name') }}</label>
        <vee-field name="name" :bails="false" v-slot=" { field, errors }">
            <input type="text" class="block w-full py-1.5 px-3 text-gray-800
            border border-gray-300 transition
            duration-500 focus:outline-none focus:border-black rounded"
            :placeholder="$t('registerForm.name')" v-bind="field"/>
            <div class="text-red-600" v-for="error in errors" :key="error">
            {{ error }}
            </div>
        </vee-field>
    </div>
    <!-- Email -->
    <div class="mb-3">
        <label class="inline-block mb-2">Email</label>
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
        <label class="inline-block mb-2">{{ $t('registerForm.age') }}</label>
        <vee-field :bails="false" name="age" v-slot="{ errors, field }">
            <input type="number" v-bind="field"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
            duration-500 focus:outline-none focus:border-black rounded">
            <div class="text-red-600" v-for="error in errors" :key="error">
            {{ error }}
            </div>
        </vee-field>
    </div>
    <!-- Password -->
    <div class="mb-3">
        <label class="inline-block mb-2">{{ $t('loginForm.password') }}</label>
        <vee-field name="password" :bails="false" v-slot="{ field, errors }">
        <input type="password" class="block w-full py-1.5 px-3 text-gray-800
            border border-gray-300 transition
            duration-500 focus:outline-none focus:border-black rounded"
            :placeholder="$t('loginForm.password')" v-bind="field" />
            <div class="text-red-600" v-for="error in errors" :key="error">
            {{ error }}
        </div>
        </vee-field>
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
        <label class="inline-block mb-2">{{ $t('registerForm.confirm_password') }}</label>
        <vee-field name="confirm_password" :bails="false" v-slot="{ field, errors }">
        <input type="password" class="block w-full py-1.5 px-3 text-gray-800
            border border-gray-300 transition
            first-letter:duration-500 focus:outline-none focus:border-black rounded"
        :placeholder="$t('registerForm.confirm_password')" v-bind="field">
        <div class="text-red-600" v-for="error in errors" :key="error">
            {{ error }}
        </div>
        </vee-field>
    </div>
    <!-- Country -->
    <div class="mb-3">
        <label class="inline-block mb-2">{{ $t('registerForm.country') }}</label>
        <vee-field name="country" :bails="false" v-slot="{ field, errors }">
            <select v-bind="field" class="block w-full py-1.5 px-3 text-gray-800 border
            border-gray-300 transition
            duration-500 focus:outline-none focus:border-black rounded">
                <option value="USA">{{ $t('country.usa') }}</option>
                <option value="Mexico">{{ $t('country.mexico') }}</option>
                <option value="Germany">{{ $t('country.germany') }}</option>
                <option value="Antarctica">{{ $t('country.antarctica') }}</option>
            </select>
            <div class="text-red-600" v-for="error in errors" :key="error">
            {{ error }}
            </div>
        </vee-field>
    </div>
    <!-- Listener / Artist -->
    <div class="mb-3">
        <label class="inline-block mb-2">{{ $t('registerForm.isArtist') }}</label>
        <vee-field name="type" :bails="false" v-slot="{ field, errors }">
            <select v-bind="field" name="isArtist"
             class="block w-full py-1.5 px-3 text-gray-800 border
              border-gray-300 transition duration-500
              focus:outline-none focus:border-black rounded">
                <option value="listener">{{ $t('registerForm.listener') }}</option>
                <option value="artist">{{ $t('registerForm.artist') }}</option>
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
        <i18n-t class="inline-block" keypath="register.accept" tag="label">
            <a href="#">{{ $t('register.TOS') }}</a>
        </i18n-t>
        <ErrorMessage class="text-red-600" name="tos" />
    </div>
    <button type="submit" :disabled="reg_in_sumbission"
        class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition
        hover:bg-purple-700">
        Submit
    </button>
    </vee-form>
</template>

<script>

export default {
  name: 'RegisterForm',
  data() {
    return {
      schema: {
        name: 'required|min:3|max:100|alphaSpaces',
        email: 'required|min:3|max:100|email',
        age: 'required|minValue:18|maxValue:120',
        password: 'required|min:6|max:100',
        confirm_password: 'passwords_mismatch:@password',
        country: 'required|country_excluded:Antarctica',
        type: 'required',
        tos: 'tos',
      },
      userData: {
        country: 'USA',
      },
      reg_in_sumbission: false,
      reg_show_alert: false,
      reg_alert_variant: 'bg-blue-500',
      reg_alert_msg: 'Please wait! Your account is being created.',
    };
  },
  methods: {
    async register(values) {
      this.reg_show_alert = true;
      this.reg_in_sumbission = true;
      this.reg_alert_variant = 'bg-blue-500';
      this.reg_alert_msg = 'Please wait! Your account is being created.';

      try {
        await this.$store.dispatch('register', values);
      } catch (error) {
        this.reg_in_sumbission = false;
        this.reg_alert_variant = 'bg-red-500';
        this.reg_alert_msg = 'An unexpected error occured. Please try again later';
        return;
      }

      this.reg_alert_variant = 'bg-green-500';
      this.reg_alert_msg = 'Success! Your account has been created!';
      window.location.reload();
    },
  },
};

</script>
