import {defineCliConfig} from 'sanity/cli'

// Simple change to reload Vercel App.
export default defineCliConfig({
  api: {
    projectId: 'syfir0ag',
    dataset: 'production',
  },
})
