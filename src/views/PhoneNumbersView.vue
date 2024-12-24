<template>
  <Topbar :title="'Phone Numbers'"></Topbar>
  <main class="min-h-screen">
    <div class="p-6">
      <div class="rounded-xl bg-white-100 border border-border-100 overflow-hidden">
        <div class="border-b border-border-100 p-4">
          <div class="flex items-center justify-between">
            <div>
              <span class="text-lg font-semibold text-heading-100 block">Phone Numbers</span>
              <p>Manage your phone numbers and their configurations</p>
            </div>
            <button
              class="flex items-center gap-2 h-11 px-4 bg-primary-100 text-white-100 rounded-md leading-none transition-all duration-150 hover:brightness-125 font-medium"
              @click="addPhoneNumber"
            >
              <Plus :size="18" :stroke-width="1.75" class="mt-[2px]" />
              Add Phone Number
            </button>
          </div>
        </div>
        <div v-if="phoneNumbers.length > 0" class="p-4">
          <div class="grid gap-4">
            <div
              v-for="(number, key) in phoneNumbers"
              :key="key"
              class="rounded-xl bg-white-100 border border-border-100"
            >
              <div class="border-b border-border-100 p-4">
                <div class="flex items-start justify-between">
                  <div>
                    <h2 class="text-lg font-bold text-primary-100">
                      {{ number.phone_number_pretty }}
                    </h2>
                    <p class="text-sm">ID: {{ number.phone_number }}</p>
                  </div>
                  <button
                    class="flex items-center gap-2 h-10 px-3 bg-success-100 text-white-100 rounded-md leading-none transition-all duration-150 hover:brightness-125 font-medium"
                    @click="makeOutboundCall(number)"
                  >
                    Make an outbound call
                  </button>
                </div>
              </div>
              <div class="p-4">
                <div class="space-y-4">
                  <!-- Agent Configuration -->
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="text-[15px] mb-1 font-medium block">Inbound call agent</label>
                      <div class="relative flex items-center border border-border-100 rounded-md">
                        <select
                          class="w-full h-11 outline-none px-4 appearance-none cursor-pointer text-heading-100 rounded-md"
                        >
                          <option
                            :value="agent.agent_name"
                            v-for="(agent, key) in agents"
                            :key="key"
                            :selected="agent.agent_id === number?.inbound_agent_id"
                          >
                            {{ agent.agent_name }}
                          </option>
                        </select>
                        <span
                          class="absolute top-0 right-0 bottom-0 w-[40px] bg-white-100 pointer-events-none flex items-center justify-center rounded-tr-md rounded-br-md"
                        >
                          <ChevronDown :size="18" :stroke-width="1.75" />
                        </span>
                      </div>
                    </div>
                    <div>
                      <label class="text-[15px] mb-1 font-medium block">Outbound call agent</label>
                      <div class="relative flex items-center border border-border-100 rounded-md">
                        <select
                          class="w-full h-11 outline-none px-4 appearance-none cursor-pointer text-heading-100 rounded-md"
                        >
                          <option
                            :value="agent.agent_name"
                            v-for="(agent, key) in agents"
                            :key="key"
                            :selected="agent.agent_id === number.outbound_agent_id"
                          >
                            {{ agent.agent_name }}
                          </option>
                        </select>
                        <span
                          class="absolute top-0 right-0 bottom-0 w-[40px] bg-white-100 pointer-events-none flex items-center justify-center rounded-tr-md rounded-br-md"
                        >
                          <ChevronDown :size="18" :stroke-width="1.75" />
                        </span>
                      </div>
                    </div>
                  </div>

                  <!-- Advanced Add-Ons -->
                  <div>
                    <h3 class="text-lg font-medium mb-2 text-heading-100">Advanced Add-Ons</h3>
                    <div class="grid gap-2">
                      <!-- Verified Phone Number -->
                      <div class="border-2 rounded-md border-dashed p-4">
                        <div class="flex items-start justify-between">
                          <div class="flex-1">
                            <div class="flex items-center gap-2">
                              <ShieldCheck :size="22" class="text-info-100" />
                              <h4 class="font-medium">Verified Phone Number</h4>
                            </div>
                            <p class="text-sm mt-1">
                              Set up verification to prevent your phone number from being marked as
                              "Spam Likely". ($100.00/month)
                            </p>
                          </div>
                          <button
                            class="flex items-center gap-2 h-9 text-sm px-2 text-white-100 rounded-md leading-none transition-all duration-150 hover:brightness-125 font-medium"
                            :class="[number.isVerified ? 'bg-success-100' : 'bg-primary-100']"
                            @click="toggleVerification(number)"
                          >
                            {{ number.isVerified ? 'Configured' : 'Set Up' }}
                          </button>
                        </div>
                      </div>

                      <!-- Branded Call -->
                      <div class="border-2 rounded-md border-dashed p-4">
                        <div class="flex items-start justify-between">
                          <div class="flex-1">
                            <div class="flex items-center gap-2">
                              <Building :size="22" class="text-info-100" />
                              <h4 class="font-medium">Branded Call</h4>
                            </div>
                            <p class="text-sm mt-1">
                              Display your verified business name as the caller ID. ($0.1/outbound
                              call)
                            </p>
                          </div>
                          <button
                            class="flex items-center gap-2 h-9 text-sm px-2 text-white-100 rounded-md leading-none transition-all duration-150 hover:brightness-125 font-medium"
                            :class="[number.hasBrandedCalls ? 'bg-success-100' : 'bg-primary-100']"
                            @click="toggleBrandedCalls(number)"
                          >
                            {{ number.hasBrandedCalls ? 'Configured' : 'Set Up' }}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { Plus, ChevronDown, ShieldCheck, Building } from 'lucide-vue-next'
import Topbar from '@/components/Topbar.vue'
import { useLoaderStore } from '@/stores/loader'
import ApiRequest from '@/libs/ApiRequest'

export default {
  name: 'PhoneNumbersPage',
  components: {
    Topbar,
    Plus,
    ChevronDown,
    ShieldCheck,
    Building,
  },
  setup() {
    const loaderStore = useLoaderStore()
    return { loaderStore }
  },
  mounted() {
    this.getAgents()
    this.getPhoneNumbers()
  },
  data() {
    return {
      phoneNumbers: [
        {
          number: '+1 (860) 421-1038',
          id: '+18604211038',
          inboundAgent: 'none',
          outboundAgent: 'mendez',
          isVerified: false,
          hasBrandedCalls: false,
        },
        {
          number: '+1 (717) 734-7821',
          id: '+17177347821',
          inboundAgent: 'support',
          outboundAgent: 'sales',
          isVerified: true,
          hasBrandedCalls: true,
        },
        {
          number: '+1 (681) 412-2054',
          id: '+16814122054',
          inboundAgent: 'none',
          outboundAgent: 'support',
          isVerified: false,
          hasBrandedCalls: false,
        },
      ],
      agents: [],
    }
  },
  methods: {
    async getPhoneNumbers() {
      this.loaderStore.setIsLoading(true)
      try {
        const { data } = await ApiRequest().get(`/api/v1/numbers/list`)
        this.phoneNumbers = data
      } catch (e) {
        console.error(e)
      } finally {
        this.loaderStore.setIsLoading(false)
      }
    },
    async getAgents() {
      this.loaderStore.setIsLoading(true)
      try {
        const { data } = await ApiRequest().get(`/api/v1/agents/list`)
        this.agents = data
      } catch (e) {
        console.error(e)
      } finally {
        this.loaderStore.setIsLoading(false)
      }
    },
    addPhoneNumber() {
      console.log('Adding new phone number')
    },
    makeOutboundCall(number) {
      console.log('Making outbound call to:', number.number)
    },
    toggleVerification(number) {
      number.isVerified = !number.isVerified
      console.log('Toggling verification for:', number.number)
    },
    toggleBrandedCalls(number) {
      number.hasBrandedCalls = !number.hasBrandedCalls
      console.log('Toggling branded calls for:', number.number)
    },
  },
  computed: {
    outboundCallAgent() {
      return this.agents.find((agent) => agent.agent_id === this.phoneNumbers[0].outbound_agent_id)
        ?.agent_name
    },
  },
}
</script>
