import { defineStore } from "pinia";
import Cookies from "js-cookie"; // Import js-cookie

export const useUserStore = defineStore("user", {
  state: () => ({
    userId: null, // Initialize with null or get from cookie
  }),
  getters: {
    getUserIdFromCookie() {
      return Cookies.get("userId"); // Use js-cookie to get the userId
    },
  },
  actions: {
    initializeUserIdFromCookie() {
      const userId = this.getUserIdFromCookie();
      if (userId) {
        this.userId = userId;
      }
    },
    setUserIdToCookie(userId) {
      Cookies.set("userId", userId); // Use js-cookie to set the userId
    },
    clearUserIdFromCookie() {
      // Example function to clear userId from cookie
      Cookies.remove("userId"); // Use js-cookie to remove the userId
    },
    // Other actions related to user management
    // ...
  },
});
