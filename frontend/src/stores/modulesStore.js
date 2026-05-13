import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const path = process.env.NEXT_PUBLIC_API_URL;

async function fetchModulesRequest() {
  const res = await fetch(path + "/modules", {
    method: "GET",
    credentials: "include",
    cache: "no-store"
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar módulos");
  }

  return res.json();
}

// export const useModuleStore = create((set) => ({
//   modules: [],
//   setModules: data  => set((state) => ({modules: data})),
//   clear: () => set({
//     modules: [],
//   })
// }))

export const useModuleStore= create(
  persist(
    (set, get) => ({
      modules: [],
      loading: false,
      loaded: false,

      fetchModules: async (force = false) => {
        const { loaded, loading } = get();

        if ((loaded && !force) || loading) return;

        set({ loading: true });

        try {
          const data = await fetchModulesRequest();

          set({
            modules: data,
            loaded: true,
            loading: false
          });

        } catch (err) {
          console.error(err);
          set({ loading: false });
        }
      },

      clearModules: () => 
        set({
          modules: [],
          loaded: false,
          loading: false
        })
    }),
    {
      name: "modules-session",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        modules: state.modules,
        loaded: state.loaded
      })
    }
  )
)