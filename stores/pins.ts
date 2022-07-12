import { defineStore } from 'pinia';

export const useStore = defineStore('pins', {
  state: () => ({
    pins: [],
    currentPin: null,
  }),

  getters: {
    getAllPins: (state) => state.pins,
  },
  actions: {
    // User registration
    userRegister: async (payload) => {
      try {
        const router = useRouter();
        const client = useSupabaseClient();
        const { error } = await client.auth.signUp(payload);
        router.push('/');
        if (error) throw error;
      } catch (error) {
        console.log(error);
      }
    },

    // User login
    userLogin: async (payload) => {
      try {
        const router = useRouter();
        const client = useSupabaseClient();
        const { error } = await client.auth.signIn(payload);
        router.push('/');
        if (error) throw error;
      } catch (error) {
        console.log(error);
      }
    },

    userLogout: async () => {
      try {
        const router = useRouter();
        const client = useSupabaseClient();
        const { error } = await client.auth.signOut();
        router.push('/login');
        if (error) throw error;
      } catch (error) {
        console.log(error);
      }
    },

    // get all pins from supabase
    async getPins() {
      const client = useSupabaseClient();

      const { data: pins } = await useAsyncData(
        'pins',
        async () => {
          return await client.from('pins').select('*');
        },
        {
          transform: (result) => result.body,
        }
      );

      this.pins = pins;
    },
    async getSinglePin(id) {
      const client = useSupabaseClient();
      const { data: currentPin } = await useAsyncData(
        'pin',
        async () => {
          return await client.from('pins').select('*').eq('id', id);
        },
        {
          transform: (result) => result.body,
        }
      );

      this.currentPin = currentPin;
    },

    // Create a new pin
    async createPin(payload) {
      try {
        const client = useSupabaseClient();
        const { error } = await client.from('pins').insert([payload]);
        if (error) throw error;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
