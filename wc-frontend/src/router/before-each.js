import TokenService from "@/services/token.service";
import { useAccountStore } from "@/store/account.store";

export default async (to) => {
    const loggedIn = TokenService.accessToken != null;
    const store = useAccountStore();

    if (to.meta && !to.meta.isPublic) {
        if (!loggedIn) {
            return { name: "login" } // če nisi prijavlen te vrže na login
        }
        if (store.user == null) {
            await store.getUser();
        }
    }
}

