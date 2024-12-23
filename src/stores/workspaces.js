import { defineStore } from 'pinia';

export const useWorkspacesStore = defineStore('workspaces', {
  state: () => ({
    workspaces: [],
  }),
  actions: {
    setWorkspaces(workspaces) {
      this.workspaces = workspaces;
    }
  },
});
