<template>
  <main class="min-h-screen">
    <div class="p-6 flex flex-col gap-6">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold text-heading-100">Overview</h1>
        <!-- Date Range Selector -->
        <div class="flex items-center gap-4">
          <Calendar class="h-5 w-5" />
          <input
            type="date"
            :value="dateRange[0]"
            @input="updateStartDate"
            class="border rounded p-2"
          />
          <span>to</span>
          <input
            type="date"
            :value="dateRange[1]"
            @input="updateEndDate"
            class="border rounded p-2"
          />
        </div>
      </div>
      <!-- Summary Cards -->
      <div class="grid grid-cols-2 gap-4">
        <div class="border border-border-100 rounded-xl bg-white-100 p-4">
          <div class="flex items-center gap-4">
            <div
              class="flex items-center justify-center w-[50px] h-[50px] rounded-lg bg-primary-100 bg-opacity-10 text-primary-100"
            >
              <Phone :size="30" :stroke-width="1.75" />
            </div>
            <div>
              <h4 class="text-2xl font-bold text-heading-100 mb-1 uppercase">
                {{ summary.totalCalls }}
              </h4>
              <span class="text-[17px] capitalize">Total Calls</span>
            </div>
          </div>
        </div>
        <div class="border border-border-100 rounded-xl bg-white-100 p-4">
          <div class="flex items-center gap-4">
            <div
              class="flex items-center justify-center w-[50px] h-[50px] rounded-lg bg-success-100 bg-opacity-10 text-success-100"
            >
              <PhoneCall :size="30" :stroke-width="1.75" />
            </div>
            <div>
              <h4 class="text-2xl font-bold text-heading-100 mb-1 uppercase">
                {{ summary.connectedCalls }}
              </h4>
              <span class="text-[17px] capitalize">Connected Calls</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Call History Table -->
      <div class="rounded-xl bg-white-100 border border-border-100 overflow-hidden">
        <div class="border-b border-border-100 p-4">
          <div class="flex items-center justify-between">
            <span class="text-xl font-bold text-heading-100">Customers</span>
          </div>
        </div>
        <div class="max-w-full overflow-x-auto without-scrollbar">
          <table class="w-full">
            <thead>
              <tr class="bg-[#F8F7FA] border-b border-border-100">
                <th
                  class="p-4 text-left text-heading-100 text-[15px] tracking-wider uppercase font-semibold"
                ></th>
                <th
                  class="p-4 text-left text-heading-100 text-[15px] tracking-wider uppercase font-semibold"
                >
                  Date/Time
                </th>
                <th
                  class="p-4 text-left text-heading-100 text-[15px] tracking-wider uppercase font-semibold"
                >
                  Business
                </th>
                <th
                  class="p-4 text-left text-heading-100 text-[15px] tracking-wider uppercase font-semibold"
                >
                  Phone
                </th>
                <th
                  class="p-4 text-left text-heading-100 text-[15px] tracking-wider uppercase font-semibold"
                >
                  Duration
                </th>
                <th
                  class="p-4 text-left text-heading-100 text-[15px] tracking-wider uppercase font-semibold"
                >
                  Status
                </th>
                <th
                  class="p-4 text-left text-heading-100 text-[15px] tracking-wider uppercase font-semibold"
                >
                  Call Count
                </th>
                <th
                  class="p-4 text-left text-heading-100 text-[15px] tracking-wider uppercase font-semibold"
                >
                  Funded Amount
                </th>
                <th
                  class="p-4 text-left text-heading-100 text-[15px] tracking-wider uppercase font-semibold"
                >
                  Lender
                </th>
                <th
                  class="p-4 text-left text-heading-100 text-[15px] tracking-wider uppercase font-semibold"
                >
                  Stage
                </th>
                <th
                  class="p-4 text-left text-heading-100 text-[15px] tracking-wider uppercase font-semibold"
                >
                  Notes
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border-100">
              <template v-for="call in callData" :key="call.id">
                <tr>
                  <td class="p-4 text-left font-medium">
                    <button @click="toggleExpandedRow(call.id)" class="mt-1.5">
                      <ChevronDown
                        :class="[
                          'transform',
                          'transition-transform',
                          { 'rotate-180': expandedRowId === call.id },
                        ]"
                        :size="24"
                        :stroke-width="1.75"
                      />
                    </button>
                  </td>
                  <td class="p-4 text-left font-medium">{{ call.date }}</td>
                  <td class="p-4 text-left font-medium">{{ call.businessName }}</td>
                  <td class="p-4 text-left font-medium">{{ call.phone }}</td>
                  <td class="p-4 text-left font-medium">
                    {{ call.duration }}
                  </td>
                  <td class="p-4 text-left font-medium">
                    <span
                      class="inline-flex items-center text-center h-8 px-2 text-[15px] rounded-md bg-opacity-10"
                      :class="
                        [call.status.toLowerCase() === 'Connected']
                          ? 'bg-success-100 text-success-100'
                          : 'bg-danger-100 text-danger-100'
                      "
                    >
                      {{ call.status }}
                    </span>
                  </td>
                  <td class="p-4 text-left font-medium">{{ call.callCount }}</td>
                  <td class="p-4 text-left font-medium">
                    ${{ call.fundedAmount.toLocaleString() }}
                  </td>
                  <td class="p-4 text-left font-medium">{{ call.lender }}</td>
                  <td class="p-4 text-left font-medium">
                    <div class="relative flex items-center">
                      <select
                        :value="call.stage"
                        @change="updateStage($event, call)"
                        class="w-full border border-border-100 h-10 rounded-md outline-none px-4 appearance-none cursor-pointer"
                      >
                        <option v-for="stage in stages" :key="stage" :value="stage">
                          {{ stage }}
                        </option>
                      </select>
                      <span class="absolute right-4 pointer-events-none">
                        <ChevronDown :size="18" :stroke-width="1.75" />
                      </span>
                    </div>
                  </td>
                  <td class="p-4 text-left font-medium">
                    <div class="flex items-center gap-2">
                      <span
                        @click="showNotePreviewModal(call)"
                        class="cursor-pointer transition-colors duration-150 hover:text-info-100"
                        title="Show Note"
                      >
                        <View :size="20" :stroke-width="1.75" />
                      </span>
                      <span
                        @click="showUpdateNoteModal(call)"
                        class="cursor-pointer transition-colors duration-150 hover:text-success-100"
                        title="Edit Note"
                      >
                        <FilePenLine :size="20" :stroke-width="1.75" />
                      </span>
                    </div>
                  </td>
                </tr>
                <tr v-if="expandedRowId === call.id">
                  <td colspan="11" class="bg-[#F8F7FA] p-4">
                    <div class="grid grid-cols-3 gap-4">
                      <div class="bg-white-100 border border-border-100 rounded-md">
                        <div class="border-b border-border-100 p-4">
                          <h3 class="font-semibold text-heading-100">Business Details</h3>
                        </div>
                        <div class="p-4 grid gap-2">
                          <p>
                            <span class="font-medium text-heading-100">Industry</span>:
                            {{ call.industry }}
                          </p>
                          <p>
                            <span class="font-medium text-heading-100">Address</span>:
                            {{ call.address }}
                          </p>
                          <p>
                            <span class="font-medium text-heading-100">City</span>: {{ call.city }}
                          </p>
                          <p>
                            <span class="font-medium text-heading-100">State</span>:
                            {{ call.state }}
                          </p>
                          <p>
                            <span class="font-medium text-heading-100">ZIP</span>: {{ call.zip }}
                          </p>
                          <p>
                            <span class="font-medium text-heading-100">Monthly Revenue</span>: ${{
                              call.monthlyRevenue.toLocaleString()
                            }}
                          </p>
                          <p>
                            <span class="font-medium text-heading-100">Email</span>:
                            {{ call.email }}
                          </p>
                        </div>
                      </div>
                      <div class="bg-white-100 border border-border-100 rounded-md">
                        <div class="border-b border-border-100 p-4">
                          <h3 class="font-semibold text-heading-100">Call Details</h3>
                        </div>
                        <div class="p-4 grid gap-2">
                          <p>
                            <span class="font-medium text-heading-100">Call ID</span>:
                            {{ call.callId }}
                          </p>
                          <p>
                            <span class="font-medium text-heading-100">Disconnection Reason</span>:
                            {{ call.disconnectionReason }}
                          </p>
                          <p>
                            <span class="font-medium text-heading-100">User Sentiment</span>:
                            {{ call.userSentiment }}
                          </p>
                          <p>
                            <span class="font-medium text-heading-100">Call From</span>:
                            {{ call.from }}
                          </p>
                          <p>
                            <span class="font-medium text-heading-100">Call To</span>: {{ call.to }}
                          </p>
                          <p>
                            <span class="font-medium text-heading-100">End to End Latency</span>:
                            {{ call.latency }}ms
                          </p>
                        </div>
                      </div>
                      <div class="bg-white-100 border border-border-100 rounded-md">
                        <div class="border-b border-border-100 p-4">
                          <h3 class="font-semibold text-heading-100">Position Details</h3>
                        </div>
                        <div class="p-4 grid gap-4">
                          <template v-for="num in 5" :key="num">
                            <div v-if="call[`positions_${num}`]" class="grid gap-2">
                              <p>
                                <span class="font-medium text-heading-100">Position {{ num }}</span
                                >: {{ call[`positions_${num}`] }}
                              </p>
                              <p>
                                <span class="font-medium text-heading-100">Info</span>:
                                {{ call[`positions_info_${num}`] }}
                              </p>
                              <p>
                                <span class="font-medium text-heading-100">Frequency</span>:
                                {{ call[`frequency_${num}`] }}
                              </p>
                            </div>
                          </template>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div
      v-if="updateNoteModal && updateNoteModal.id === currentCallToHanlde.id"
      class="bg-opacity-40 fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-heading-100"
    >
      <div class="max-w-2xl rounded-xl w-full mx-auto bg-white-100">
        <div class="flex items-center justify-between p-4 border-b border-border-100">
          <h5 class="font-semibold leading-none text-lg text-heading-100">Update Note</h5>
          <span
            @click="closeUpdateNoteModal"
            class="cursor-pointer transition-colors duration-100 hover:text-heading-100"
          >
            <X :size="24" :stroke-width="1.75" />
          </span>
        </div>
        <div class="without-scrollbar max-h-modal overflow-y-auto p-4">
          <div>
            <textarea
              class="w-full border border-border-100 rounded-md px-4 py-3 outline-none"
              placeholder="Add notes..."
              :value="currentCallToHanlde.notes"
              @input="updateNotes($event, currentCallToHanlde)"
              rows="2"
            ></textarea>
          </div>
        </div>
        <div class="flex items-center justify-end p-4 border-t border-border-100 space-x-2">
          <button
            @click="closeUpdateNoteModal"
            type="button"
            class="flex items-center h-10 px-4 bg-[#E3E6EF] text-heading-100 rounded-md leading-none font-medium"
          >
            Close
          </button>
          <button
            type="button"
            class="flex items-center h-10 px-4 bg-primary-100 text-white-100 rounded-md leading-none transition-all duration-150 hover:brightness-125 font-medium"
          >
            Update
          </button>
        </div>
      </div>
    </div>
    <div
      v-if="showNoteModal && showNoteModal.id === currentCallToHanlde.id"
      class="bg-opacity-40 fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-heading-100"
    >
      <div class="max-w-2xl rounded-xl w-full mx-auto bg-white-100">
        <div class="flex items-center justify-between p-4 border-b border-border-100">
          <h5 class="font-semibold leading-none text-lg text-heading-100">Note</h5>
          <span
            @click="closeUpdateNoteModal"
            class="cursor-pointer transition-colors duration-100 hover:text-heading-100"
          >
            <X :size="24" :stroke-width="1.75" />
          </span>
        </div>
        <div class="without-scrollbar max-h-modal overflow-y-auto p-4">
          <div class="p-4 bg-[#F8F7FA] border border-border-100 rounded-md">
            <p class="text-heading-100">{{ currentCallToHanlde.notes }}</p>
          </div>
        </div>
        <div class="flex items-center justify-end p-4 border-t border-border-100 space-x-2">
          <button
            @click="closeUpdateNoteModal"
            type="button"
            class="flex items-center h-10 px-4 bg-[#E3E6EF] text-heading-100 rounded-md leading-none font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { Calendar, ChevronDown, Phone, PhoneCall, View, FilePenLine, X } from 'lucide-vue-next'
import ApiRequest from '@/libs/ApiRequest'

export default {
  components: {
    Calendar,
    ChevronDown,
    Phone,
    PhoneCall,
    View,
    FilePenLine,
    X,
  },
  data() {
    const today = new Date().toISOString().split('T')[0]
    return {
      dateRange: [today, today],
      expandedRowId: null,
      callData: [
        {
          id: 1,
          date: today,
          businessName: 'ABC Corp',
          phone: '+1234567890',
          duration: '5:23',
          status: 'Connected',
          callCount: 3,
          fundedAmount: 50000,
          lender: 'XYZ Capital',
          stage: '1. Closer qualified, follow up',
          notes: 'Initial discussion about refinancing',
          industry: 'Technology',
          address: '123 Main St',
          city: 'San Francisco',
          state: 'CA',
          zip: '94105',
          monthlyRevenue: 100000,
          email: 'contact@abccorp.com',
          callId: 'CALL123',
          disconnectionReason: 'Call completed normally',
          userSentiment: 'Positive',
          from: '+1234567890',
          to: '+9876543210',
          latency: 150,
          positions_1: 'CEO',
          positions_info_1: 'Primary decision maker',
          frequency_1: 'Weekly',
          positions_2: 'CFO',
          positions_info_2: 'Financial approval',
          frequency_2: 'Monthly',
        },
        {
          id: 2,
          date: today,
          businessName: 'XYZ Industries',
          phone: '+1987654320',
          duration: '3:45',
          status: 'Connected',
          callCount: 2,
          fundedAmount: 75000,
          lender: 'ABC Financial',
          stage: '2. Quote sent, awaiting agreements',
          notes: 'Follow-up on proposal',
          industry: 'Manufacturing',
          address: '456 Industrial Ave',
          city: 'Chicago',
          state: 'IL',
          zip: '60601',
          monthlyRevenue: 200000,
          email: 'info@xyzind.com',
          callId: 'CALL124',
          disconnectionReason: 'Call completed normally',
          userSentiment: 'Neutral',
          from: '+1987654320',
          to: '+9876543211',
          latency: 120,
          positions_1: 'Owner',
          positions_info_1: 'Final decision maker',
          frequency_1: 'Bi-weekly',
        },
      ],
      stages: [
        '1. Closer qualified, follow up',
        '2. Quote sent, awaiting agreements',
        '3. Agreements received',
        '4. Closing call follow up',
        '5. Closed',
        '6. Paid',
      ],
      summary: {
        totalCalls: 145,
        connectedCalls: 89,
      },
      updateNoteModal: null,
      showNoteModal: null,
      currentCallToHanlde: {},
    }
  },
  mounted() {
    this.loadCalls()
  },
  methods: {
    async loadCalls() {
      // const { data } = await ApiRequest().get(`/call-history`)
      // console.log(data)
    },
    updateStartDate(event) {
      this.dateRange = [event.target.value, this.dateRange[1]]
    },
    updateEndDate(event) {
      this.dateRange = [this.dateRange[0], event.target.value]
    },
    toggleExpandedRow(id) {
      this.expandedRowId = this.expandedRowId === id ? null : id
    },
    updateStage(event, call) {
      // In a real app, you'd typically update this via an API
      const index = this.callData.findIndex((c) => c.id === call.id)
      if (index !== -1) {
        this.callData[index].stage = event.target.value
      }
    },
    updateNotes(event, call) {
      // In a real app, you'd typically update this via an API
      const index = this.callData.findIndex((c) => c.id === call.id)
      if (index !== -1) {
        this.callData[index].notes = event.target.value
      }
    },
    showUpdateNoteModal(call) {
      this.currentCallToHanlde = call
      this.updateNoteModal = {
        id: call.id,
      }
    },
    showNotePreviewModal(call) {
      this.currentCallToHanlde = call
      this.showNoteModal = {
        id: call.id,
      }
    },
    closeUpdateNoteModal() {
      this.updateNoteModal = null
      this.showNoteModal = null
      this.currentCallToHanlde = {}
    },
  },
}
</script>
