import { defineStore } from 'pinia';
export const useStore = defineStore('pins', {
  state: () => ({
    pins: [],
  }),
  actions: {
    // User registration
    userRegister: async (payload) => {
      try {
        const client = useSupabaseClient();
        const { error } = await client.auth.signUp(payload);
        if (error) throw error;
      } catch (error) {
        console.log(error);
      }
    },

    // User login
    userLogin: async (payload) => {
      try {
        const client = useSupabaseClient();
        const { error } = await client.auth.signIn(payload);
        if (error) throw error;
      } catch (error) {
        console.log(error);
      }
    },

    // get all pins from supabase
    getPins: async (state) => {
      const client = useSupabaseClient();
      const { data: pins, error } = await useAsyncData('pins', async () => {
        const { data } = await client.from('pins').select('*');
        return data;
      });
      // console.log();

      // state.pins = pins;
    },
  },
  getters: {
    getAllPins: (state) => state.pins,
    getSinglePin: (state) => (id) => {
      return state.pins.find((pin) => pin.id === id);
    },
  },
});
