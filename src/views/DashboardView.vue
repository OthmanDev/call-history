<template>
  <main class="min-h-screen">
    <div class="p-6 flex flex-col gap-6">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold text-heading-100">Overview</h1>
        <div class="relative w-[190px]">
          <div
            @click="isActivePeriod = !isActivePeriod"
            class="border border-border-100 rounded-md flex items-center bg-white-100 px-3 h-11 gap-2 cursor-pointer"
          >
            <span><Calendar :size="20" :stroke-width="1.75" /></span
            ><span class="flex-1 pt-[3px] font-medium text-[15px] first-letter:capitalize">{{
              currentPediod.label
            }}</span
            ><span class="text-heading-100 mt-0.5">
              <ChevronDown
                :size="18"
                class="transform transition-transform"
                :class="[isActivePeriod ? 'rotate-180' : '']"
              />
            </span>
          </div>
          <div
            v-if="isActivePeriod"
            class="absolute left-0 right-0 border border-border-100 rounded-md bg-white-100 z-10 top-full mt-0.5"
          >
            <div class="p-3 grid gap-2">
              <span
                @click="getInsightsByPeriod('today')"
                class="cursor-pointer text-[15px]"
                :class="[currentPediod.value === 'today' ? 'text-primary-100 font-medium' : '']"
                >Today</span
              >
              <span
                @click="getInsightsByPeriod('yesterday')"
                class="cursor-pointer text-[15px]"
                :class="[currentPediod.value === 'yesterday' ? 'text-primary-100 font-medium' : '']"
                >Yesterday</span
              >
              <span
                @click="getInsightsByPeriod('last_7_days')"
                class="cursor-pointer text-[15px]"
                :class="[
                  currentPediod.value === 'last_7_days' ? 'text-primary-100 font-medium' : '',
                ]"
                >Last 7 days</span
              >
              <span
                @click="getInsightsByPeriod('last_14_days')"
                class="cursor-pointer text-[15px]"
                :class="[
                  currentPediod.value === 'last_14_days' ? 'text-primary-100 font-medium' : '',
                ]"
                >Last 14 days</span
              >
              <span
                @click="getInsightsByPeriod('last_30_days')"
                class="cursor-pointer text-[15px]"
                :class="[
                  currentPediod.value === 'last_30_days' ? 'text-primary-100 font-medium' : '',
                ]"
                >Last 30 days</span
              >
              <span
                @click="getInsightsByPeriod('all_time')"
                class="cursor-pointer text-[15px]"
                :class="[currentPediod.value === 'all_time' ? 'text-primary-100 font-medium' : '']"
                >All time</span
              >
            </div>
          </div>
        </div>
      </div>
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
      <div class="rounded-xl bg-white-100 border border-border-100 overflow-hidden">
        <div class="border-b border-border-100 p-4">
          <div class="flex items-center justify-between">
            <span class="text-xl font-bold text-heading-100">Customers</span>
            <div class="flex items-center gap-2">
              <button
                @click="moreFilters = !moreFilters"
                class="flex items-center h-11 gap-5 px-4 bg-primary-100 text-white-100 rounded-md leading-none transition-all duration-150 hover:brightness-125 font-medium"
              >
                Filters
                <ChevronDown
                  :size="18"
                  :stroke-width="1.75"
                  class="-mx-1 mt-[2px] transform transition-transform"
                  :class="[moreFilters ? 'rotate-180' : '']"
                />
              </button>
              <button
                @click="exportCSV"
                class="flex items-center h-11 px-4 bg-primary-100 text-white-100 rounded-md leading-none transition-all duration-150 hover:brightness-125 font-medium"
              >
                Export CSV
              </button>
            </div>
          </div>
        </div>
        <div v-if="moreFilters" class="border-b border-border-100 p-4">
          <div class="flex items-center gap-2">
            <div
              class="relative flex items-center overflow-hidden border border-border-100 rounded-md max-w-[200px]"
            >
              <select
                class="w-full h-11 outline-none px-4 appearance-none cursor-pointer text-heading-100"
              >
                <option selected disabled value="-1">Disposition</option>
                <option v-for="(filter, key) in dispositionFilter" :key="key" :value="filter">
                  {{ filter }}
                </option>
              </select>
              <span
                class="absolute top-0 right-0 bottom-0 w-[40px] bg-white-100 pointer-events-none flex items-center justify-center"
              >
                <ChevronDown :size="18" :stroke-width="1.75" />
              </span>
            </div>
            <div
              class="relative flex items-center overflow-hidden border border-border-100 rounded-md max-w-[200px]"
            >
              <select
                class="w-full h-11 outline-none px-4 appearance-none cursor-pointer text-heading-100"
              >
                <option selected disabled value="-1">Disconnection Reason</option>
                <option
                  v-for="(filter, key) in disconnectionReasonFilter"
                  :key="key"
                  :value="filter"
                >
                  {{ filter }}
                </option>
              </select>
              <span
                class="absolute top-0 right-0 bottom-0 w-[40px] bg-white-100 pointer-events-none flex items-center justify-center"
              >
                <ChevronDown :size="18" :stroke-width="1.75" />
              </span>
            </div>
            <div class="h-11 border border-border-100 rounded-md px-4 flex items-center">
              <div class="switcher">
                <input
                  id="has-debt"
                  type="checkbox"
                  :checked="hasDebtFilter"
                  :value="hasDebtFilter"
                />
                <label for="has-debt">Has Debt</label>
              </div>
            </div>
            <div
              class="relative flex items-center overflow-hidden border border-border-100 rounded-md min-w-[110px]"
            >
              <select
                class="w-full h-11 outline-none px-4 appearance-none cursor-pointer text-heading-100"
              >
                <option selected disabled value="-1">Dialed</option>
                <option v-for="(filter, key) in dialedFilter" :key="key" :value="filter">
                  {{ filter }}
                </option>
              </select>
              <span
                class="absolute top-0 right-0 bottom-0 w-[40px] bg-white-100 pointer-events-none flex items-center justify-center"
              >
                <ChevronDown :size="18" :stroke-width="1.75" />
              </span>
            </div>
            <div class="h-11 border border-border-100 rounded-md px-4 flex items-center">
              <div class="switcher">
                <input
                  id="dial-again"
                  type="checkbox"
                  :checked="dialAgainFilter"
                  :value="dialAgainFilter"
                />
                <label for="dial-again">Dial Again</label>
              </div>
            </div>
            <div
              class="relative flex items-center overflow-hidden border border-border-100 rounded-md max-w-[200px]"
            >
              <select
                class="w-full h-11 outline-none px-4 appearance-none cursor-pointer text-heading-100"
              >
                <option selected disabled value="-1">Stage</option>
                <option v-for="(filter, key) in stages" :key="key" :value="filter">
                  {{ filter }}
                </option>
              </select>
              <span
                class="absolute top-0 right-0 bottom-0 w-[40px] bg-white-100 pointer-events-none flex items-center justify-center"
              >
                <ChevronDown :size="18" :stroke-width="1.75" />
              </span>
            </div>
            <div
              class="relative flex items-center overflow-hidden border border-border-100 rounded-md min-w-[110px] max-w-[200px]"
            >
              <select
                class="w-full h-11 outline-none px-4 appearance-none cursor-pointer text-heading-100"
              >
                <option selected disabled value="-1">State</option>
                <option v-for="(filter, key) in satesFilter" :key="key" :value="filter">
                  {{ filter }}
                </option>
              </select>
              <span
                class="absolute top-0 right-0 bottom-0 w-[40px] bg-white-100 pointer-events-none flex items-center justify-center"
              >
                <ChevronDown :size="18" :stroke-width="1.75" />
              </span>
            </div>
            <div
              class="relative flex items-center overflow-hidden border border-border-100 rounded-md max-w-[200px]"
            >
              <input
                type="text"
                class="w-full h-11 outline-none px-4 text-heading-100"
                placeholder="Debt Amount"
              />
            </div>
            <div
              class="relative flex items-center overflow-hidden border border-border-100 rounded-md max-w-[200px]"
            >
              <input
                type="text"
                class="w-full h-11 outline-none px-4 text-heading-100"
                placeholder="Payment"
              />
            </div>
          </div>
        </div>
        <div class="max-w-full overflow-x-auto without-scrollbar">
          <table class="w-full">
            <thead>
              <tr class="bg-[#F8F7FA] border-b border-border-100">
                <th
                  class="p-3 text-left text-heading-100 text-[15px] capitalize font-semibold"
                ></th>
                <th class="p-3 text-left text-heading-100 text-[15px] capitalize font-semibold">
                  Time Called
                </th>
                <th class="p-3 text-left text-heading-100 text-[15px] capitalize font-semibold">
                  Name
                </th>
                <th class="p-3 text-left text-heading-100 text-[15px] capitalize font-semibold">
                  Business
                </th>
                <th class="p-3 text-left text-heading-100 text-[15px] capitalize font-semibold">
                  Phone
                </th>
                <th class="p-3 text-left text-heading-100 text-[15px] capitalize font-semibold">
                  State
                </th>
                <th class="p-3 text-left text-heading-100 text-[15px] capitalize font-semibold">
                  Duration
                </th>
                <th class="p-3 text-left text-heading-100 text-[15px] capitalize font-semibold">
                  Status
                </th>
                <th class="p-3 text-left text-heading-100 text-[15px] capitalize font-semibold">
                  Disconnection reasosn
                </th>
                <th class="p-3 text-left text-heading-100 text-[15px] capitalize font-semibold">
                  Call Count
                </th>
                <th class="p-3 text-left text-heading-100 text-[15px] capitalize font-semibold">
                  Weekly payments
                </th>
                <th class="p-3 text-left text-heading-100 text-[15px] capitalize font-semibold">
                  has debt
                </th>
                <th class="p-3 text-left text-heading-100 text-[15px] capitalize font-semibold">
                  total debt
                </th>
                <th class="p-3 text-left text-heading-100 text-[15px] capitalize font-semibold">
                  Advances
                </th>
                <th class="p-3 text-left text-heading-100 text-[15px] capitalize font-semibold">
                  Disposition
                </th>
                <th class="p-3 text-left text-heading-100 text-[15px] capitalize font-semibold">
                  Stage
                </th>
                <th
                  class="p-3 text-left text-heading-100 text-[15px] capitalize font-semibold"
                ></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border-100">
              <template v-for="(customer, index) in customers" :key="index">
                <tr>
                  <td class="p-3 text-left font-medium text-[15px]">
                    <button @click="toggleExpandedRow(index)" class="mt-1.5">
                      <ChevronDown
                        :class="[
                          'transform',
                          'transition-transform',
                          { 'rotate-180': expandedRowId === index },
                        ]"
                        :size="24"
                        :stroke-width="1.75"
                      />
                    </button>
                  </td>
                  <td class="p-3 text-left font-medium text-[15px]">
                    {{ formatDate(customer.call_history[0]?.start_timestamp) }}
                  </td>
                  <td class="p-3 text-left font-medium text-[15px]">
                    {{ customer.customer_data.OWNER || '-' }}
                  </td>
                  <td class="p-3 text-left font-medium text-[15px]">
                    {{ customer.customer_data.BUSINESS || '-' }}
                  </td>
                  <td class="p-3 text-left font-medium text-[15px]">
                    {{ customer.customer_data.PHONE || '-' }}
                  </td>
                  <td class="p-3 text-left font-medium text-[15px]">
                    {{ customer.customer_data.STATE || '-' }}
                  </td>
                  <td class="p-3 text-left font-medium text-[15px]">
                    {{
                      formatDuration(
                        customer.call_history[0].end_timestamp,
                        customer.call_history[0].start_timestamp,
                      )
                    }}
                  </td>
                  <td class="p-3 text-left font-medium text-[15px]">
                    <span
                      class="inline-flex items-center text-center h-8 px-2 text-[15px] rounded-md bg-opacity-10 capitalize"
                      :class="callStatus(customer.call_history[0].call_status)"
                    >
                      {{ customer.call_history[0].call_status }}
                    </span>
                  </td>
                  <td class="p-3 text-left font-medium text-[15px]">
                    <span
                      class="inline-flex items-center text-center h-8 px-2 text-[15px] rounded-md bg-[#F8F7FA]"
                    >
                      {{ customer.call_history[0].disconnection_reason }}
                    </span>
                  </td>
                  <td class="p-3 text-left font-medium text-[15px]">
                    {{ customer.call_history.length }}
                  </td>
                  <td class="p-3 text-left font-medium text-[15px]">
                    <span>
                      {{
                        customer.call_history[0].call_analysis.custom_analysis_data.hasOwnProperty(
                          'weekly_payments',
                        )
                          ? customer.call_history[0].call_analysis.custom_analysis_data
                              .weekly_payments
                          : '-'
                      }}</span
                    >
                  </td>
                  <td class="p-3 text-left font-medium text-[15px]">
                    <span
                      v-if="
                        customer.call_history[0].call_analysis.custom_analysis_data.hasOwnProperty(
                          'has_debt',
                        )
                      "
                      class="inline-flex items-center text-center h-8 px-2 text-[15px] rounded-md bg-[#F8F7FA]"
                    >
                      {{
                        customer.call_history[0].call_analysis.custom_analysis_data.has_debt
                      }}</span
                    >
                    <span v-else>-</span>
                  </td>
                  <td class="p-3 text-left font-medium text-[15px]">
                    <span>
                      {{
                        customer.call_history[0].call_analysis.custom_analysis_data.hasOwnProperty(
                          'total_debt',
                        )
                          ? customer.call_history[0].call_analysis.custom_analysis_data.total_debt
                          : '-'
                      }}</span
                    >
                  </td>
                  <td class="p-3 text-left font-medium text-[15px]">
                    <span>
                      {{
                        customer.call_history[0].call_analysis.custom_analysis_data.hasOwnProperty(
                          'advances',
                        )
                          ? customer.call_history[0].call_analysis.custom_analysis_data.advances
                          : '-'
                      }}</span
                    >
                  </td>
                  <td class="p-3 text-left font-medium text-[15px]">
                    <span>
                      {{
                        customer.call_history[0].call_analysis.custom_analysis_data.hasOwnProperty(
                          'disposition',
                        )
                          ? customer.call_history[0].call_analysis.custom_analysis_data.disposition
                          : '-'
                      }}</span
                    >
                  </td>
                  <td class="p-3 text-left font-medium text-[15px]">
                    <div
                      class="relative flex items-center overflow-hidden border border-border-100 rounded-md"
                    >
                      <select
                        :value="customer.customer_data.stage"
                        @change="updateStage($event, customer)"
                        class="w-full h-10 outline-none px-2 appearance-none cursor-pointer text-heading-100"
                      >
                        <option disabled selected value="-1">Stage</option>
                        <option v-for="stage in stages" :key="stage" :value="stage">
                          {{ stage }}
                        </option>
                      </select>
                      <span
                        class="absolute top-0 right-0 bottom-0 w-[30px] bg-white-100 pointer-events-none flex items-center justify-center"
                      >
                        <ChevronDown :size="18" :stroke-width="1.75" />
                      </span>
                    </div>
                  </td>
                  <td class="p-3 text-left font-medium text-[15px]">
                    <div class="flex items-center gap-2">
                      <span
                        @click="showTranscriptPreviewModal(customer)"
                        class="cursor-pointer transition-colors duration-150 hover:text-info-100"
                        title="Show Transcript"
                      >
                        <View :size="20" :stroke-width="1.75" />
                      </span>
                      <span
                        @click="showUpdateNoteModal(customer)"
                        class="cursor-pointer transition-colors duration-150 hover:text-success-100"
                        title="Update Note"
                      >
                        <FilePenLine :size="20" :stroke-width="1.75" />
                      </span>
                    </div>
                  </td>
                </tr>
                <tr v-if="expandedRowId === index">
                  <td colspan="17" class="bg-[#F8F7FA] p-4">
                    <div class="grid grid-cols-3 gap-4">
                      <div class="bg-white-100 border border-border-100 rounded-md">
                        <div class="border-b border-border-100 p-4">
                          <h3 class="font-semibold text-heading-100">Business Details</h3>
                        </div>
                        <div class="p-4 grid gap-2">
                          <p v-if="customer.customer_data.lead_source">
                            <span class="font-medium text-heading-100">Lead Source</span>:
                            {{ customer.customer_data.lead_source }}
                          </p>
                          <p v-if="customer.customer_data.added_data">
                            <span class="font-medium text-heading-100">Date Contact Added</span>:
                            {{ formatDate(customer.customer_data.added_data) }}
                          </p>
                          <p v-if="customer.customer_data.OWNER">
                            <span class="font-medium text-heading-100">Contact Name</span>:
                            {{ customer.customer_data.OWNER }}
                          </p>
                          <p v-if="customer.customer_data.BUSINESS">
                            <span class="font-medium text-heading-100">Business Name</span>:
                            {{ customer.customer_data.BUSINESS }}
                          </p>
                          <p v-if="customer.customer_data.CITY">
                            <span class="font-medium text-heading-100">City</span>:
                            {{ customer.customer_data.CITY }}
                          </p>
                          <p v-if="customer.customer_data.STATE">
                            <span class="font-medium text-heading-100">State</span>:
                            {{ customer.customer_data.STATE }}
                          </p>
                          <p v-if="customer.customer_data.EMAIL">
                            <span class="font-medium text-heading-100">Email</span>:
                            {{ customer.customer_data.EMAIL }}
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
                            {{ customer.call_history[0].call_id }}
                          </p>
                          <p v-if="customer.call_history[0].disconnection_reason">
                            <span class="font-medium text-heading-100">Disconnection Reason</span>:
                            {{ customer.call_history[0].disconnection_reason }}
                          </p>
                          <p v-if="customer.call_history[0].call_analysis?.user_sentiment">
                            <span class="font-medium text-heading-100">User Sentiment</span>:
                            {{ customer.call_history[0].call_analysis.user_sentiment }}
                          </p>
                          <p>
                            <span class="font-medium text-heading-100">Call From</span>:
                            {{ customer.call_history[0].from_number }}
                          </p>
                          <p>
                            <span class="font-medium text-heading-100">Call To</span>:
                            {{ customer.call_history[0].to_number }}
                          </p>
                          <p>
                            <span class="font-medium text-heading-100">End to End Latency</span>:
                            {{ customer.call_history[0].llm_latency.max }}ms
                          </p>
                        </div>
                      </div>
                      <div class="bg-white-100 border border-border-100 rounded-md">
                        <div class="border-b border-border-100 p-4">
                          <h3 class="font-semibold text-heading-100">Position Details</h3>
                        </div>
                        <div class="p-4 grid gap-4">
                          <div v-if="customer.customer_data['POSITIONS']" class="grid gap-2">
                            <p>
                              <span class="font-medium text-heading-100">Position 1</span>:
                              {{ customer.customer_data['POSITIONS'] }}
                            </p>
                            <p v-if="customer.customer_data['POSITIONS INFO']">
                              <span class="font-medium text-heading-100">Info</span>:
                              {{ customer.customer_data['POSITIONS INFO'] }}
                            </p>
                            <p v-if="customer.customer_data['FREQUENCY']">
                              <span class="font-medium text-heading-100">Frequency</span>:
                              {{ customer.customer_data['FREQUENCY'] }}
                            </p>
                          </div>
                          <div v-if="customer.customer_data['POSITIONS 2']" class="grid gap-2">
                            <p>
                              <span class="font-medium text-heading-100">Position 2</span>:
                              {{ customer.customer_data['POSITIONS 2'] }}
                            </p>
                            <p v-if="customer.customer_data['POSITIONS INFO 2']">
                              <span class="font-medium text-heading-100">Info</span>:
                              {{ customer.customer_data['POSITIONS INFO 2'] }}
                            </p>
                            <p v-if="customer.customer_data['FREQUENCY 2']">
                              <span class="font-medium text-heading-100">Frequency</span>:
                              {{ customer.customer_data['FREQUENCY 2'] }}
                            </p>
                          </div>
                          <div v-if="customer.customer_data['POSITIONS 3']" class="grid gap-2">
                            <p>
                              <span class="font-medium text-heading-100">Position 3</span>:
                              {{ customer.customer_data['POSITIONS 3'] }}
                            </p>
                            <p v-if="customer.customer_data['POSITIONS INFO 3']">
                              <span class="font-medium text-heading-100">Info</span>:
                              {{ customer.customer_data['POSITIONS INFO 3'] }}
                            </p>
                            <p v-if="customer.customer_data['FREQUENCY 3']">
                              <span class="font-medium text-heading-100">Frequency</span>:
                              {{ customer.customer_data['FREQUENCY 3'] }}
                            </p>
                          </div>
                          <div v-if="customer.customer_data['POSITIONS 4']" class="grid gap-2">
                            <p>
                              <span class="font-medium text-heading-100">Position 4</span>:
                              {{ customer.customer_data['POSITIONS 4'] }}
                            </p>
                            <p v-if="customer.customer_data['POSITIONS INFO 4']">
                              <span class="font-medium text-heading-100">Info</span>:
                              {{ customer.customer_data['POSITIONS INFO 4'] }}
                            </p>
                            <p v-if="customer.customer_data['FREQUENCY 4']">
                              <span class="font-medium text-heading-100">Frequency</span>:
                              {{ customer.customer_data['FREQUENCY 4'] }}
                            </p>
                          </div>
                          <div v-if="customer.customer_data['POSITIONS 5']" class="grid gap-2">
                            <p>
                              <span class="font-medium text-heading-100">Position 5</span>:
                              {{ customer.customer_data['POSITIONS 5'] }}
                            </p>
                            <p v-if="customer.customer_data['POSITIONS INFO 5']">
                              <span class="font-medium text-heading-100">Info</span>:
                              {{ customer.customer_data['POSITIONS INFO 5'] }}
                            </p>
                            <p v-if="customer.customer_data['FREQUENCY 5']">
                              <span class="font-medium text-heading-100">Frequency</span>:
                              {{ customer.customer_data['FREQUENCY 5'] }}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <div
          class="border-t-4 rounded-bl-xl rounded-br-xl"
          :class="mode === 'dark' ? 'bg-dark-70 border-dark-50' : 'bg-white-100'"
        >
          <div class="flex items-center px-4 py-3 justify-between">
            <nav class="flex items-center gap-2">
              <button
                :class="[currentPage === 0 ? 'pointer-events-none opacity-50' : '']"
                class="flex items-center h-11 px-4 bg-primary-100 text-white-100 rounded-md leading-none transition-all duration-150 hover:brightness-125 font-medium"
                @click="loadCustomers('prev')"
              >
                Previous
              </button>
              <button
                class="flex items-center h-11 px-4 bg-primary-100 text-white-100 rounded-md leading-none transition-all duration-150 hover:brightness-125 font-medium"
                @click="loadCustomers('next')"
              >
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="updateNoteModal && updateNoteModal.id === currentCallToHanlde.customer_data._id"
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
              placeholder="Notes..."
              :value="currentCallToHanlde.customer_data.NOTES"
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
      v-if="showTranscriptModal && showTranscriptModal.id === currentCallToHanlde.customer_data._id"
      class="bg-opacity-40 fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-heading-100"
    >
      <div class="max-w-2xl rounded-xl w-full mx-auto bg-white-100">
        <div class="flex items-center justify-between p-4 border-b border-border-100">
          <h5 class="font-semibold leading-none text-lg text-heading-100">Transcript</h5>
          <span
            @click="closeUpdateNoteModal"
            class="cursor-pointer transition-colors duration-100 hover:text-heading-100"
          >
            <X :size="24" :stroke-width="1.75" />
          </span>
        </div>
        <div class="without-scrollbar max-h-modal overflow-y-auto p-4">
          <div class="p-4 bg-[#F8F7FA] border border-border-100 rounded-md">
            <div
              class="text-heading-100 grid gap-1"
              v-html="formattedTranscript(currentCallToHanlde.call_history[0].transcript)"
            ></div>
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
    <div
      v-if="isLoading"
      class="bg-opacity-40 fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-heading-100 text-white-100"
    >
      <LoaderCircle :size="50" :stroke-width="1" class="spin" />
    </div>
  </main>
</template>

<script>
import {
  Calendar,
  ChevronDown,
  Phone,
  PhoneCall,
  View,
  FilePenLine,
  X,
  LoaderCircle,
} from 'lucide-vue-next'
import ApiRequest from '@/libs/ApiRequest'
import moment from 'moment'

export default {
  components: {
    Calendar,
    ChevronDown,
    Phone,
    PhoneCall,
    View,
    FilePenLine,
    X,
    LoaderCircle,
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
        'Closer qualified, follow up',
        'Quote sent, awaiting agreements',
        'Agreements received',
        'Closing call follow up',
        'Closed',
        'Paid',
      ],
      summary: {
        totalCalls: 145,
        connectedCalls: 89,
      },
      updateNoteModal: null,
      showTranscriptModal: null,
      currentCallToHanlde: {},
      customers: [],
      currentPage: 0,
      isLoading: false,
      dispositionFilter: [
        'Has Debt and Interested',
        'Has Debt and Not Interested',
        'Does Not Have Debt',
        'Uncertain/Unable to Determine',
      ],
      disconnectionReasonFilter: [
        'User Hangup',
        'Agent Hangup',
        'Call Transfer',
        'Voicemail Reached',
        'Inactivity',
        'Machine Detected',
        'Max Duration Reached',
        'Concurrency Limit Reached',
        'No Valid Payment',
        'Scam Detected',
        'Error Inbound Webhook',
        'Dial Busy',
        'Dial Failed',
        'Dial No Answer',
        'Error Llm Websocket Open',
        'Error Llm Websocket Lost Connection',
        'Error Llm Websocket Runtime',
        'Error Llm Websocket Corrupt Payload',
        'Error Frontend Corrupted Payload',
        'Error Twilio',
        'Error No Audio Received',
        'Error Asr',
        'Error Retell',
        'Error Unknown',
        'Error User Not Joined',
        'Registered Call Timeout',
      ],
      hasDebtFilter: false,
      dialedFilter: [0, 1, 2, 3, 4, 5],
      dialAgainFilter: false,
      currentPediod: {
        label: 'Today',
        value: 'today',
      },
      isActivePeriod: false,
      periods: [
        {
          label: 'Today',
          value: 'today',
        },
        {
          label: 'Yesterday',
          value: 'yesterday',
        },
        {
          label: 'Last 7 days',
          value: 'last_7_days',
        },
        {
          label: 'Last 14 days',
          value: 'last_14_days',
        },
        {
          label: 'Last 30 days',
          value: 'last_30_days',
        },
        {
          label: 'All time',
          value: 'all_time',
        },
      ],
      moreFilters: false,
      satesFilter: ['FL', 'MD', 'TX', 'NY'],
    }
  },
  mounted() {
    this.loadCustomers(this.currentPage)
  },
  methods: {
    async loadCustomers(page) {
      this.isLoading = true
      try {
        if (page === 'next') {
          this.currentPage += 1
        } else if (page === 'prev') {
          this.currentPage -= 1
        } else {
          this.currentPage = 0
        }
        let queries = {
          skip: this.currentPage,
          limit: 20,
        }
        queries = new URLSearchParams(queries).toString()
        const { data } = await ApiRequest().get(`/merged-data?${queries}`)
        this.customers = data.data
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
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
    showUpdateNoteModal(customer) {
      this.currentCallToHanlde = customer
      this.updateNoteModal = {
        id: customer.customer_data._id,
      }
    },
    showTranscriptPreviewModal(customer) {
      this.currentCallToHanlde = customer
      this.showTranscriptModal = {
        id: customer.customer_data._id,
      }
    },
    closeUpdateNoteModal() {
      this.updateNoteModal = null
      this.showTranscriptModal = null
      this.currentCallToHanlde = {}
    },
    formatDate(value) {
      if (!value) return '-'
      return moment(value).format('MM/DD/YYYY HH:mm')
    },
    formatDuration(start, end) {
      if (!start || !end) return '-'
      const duration = moment.duration(end - start)
      return moment.utc(duration.asMilliseconds()).format('m:ss')
    },
    callStatus(value) {
      if (!value) return ''
      if (value === 'error') return 'bg-danger-100 text-danger-100'
      if (value === 'ended') return 'bg-success-100 text-success-100'
    },
    formattedTranscript(value) {
      return value.replace(/\n/g, '<span></span>')
    },
    getInsightsByPeriod(period) {
      this.isActivePeriod = false
      this.currentPediod = this.periods.find((p) => p.value === period)
    },
    exportCSV() {
      const headers = [
        'Time Called',
        'Name',
        'Business',
        'Phone',
        'State',
        'Duration',
        'Status',
        'Disconnection reasosn',
        'Call Count',
        'Weekly Payments',
        'Has Debt',
        'Total Debt',
        'Advances',
        'Disposition',
        'Stage',
      ]
      const csv = []
      csv.push(headers.join(','))
      this.customers.forEach((customer) => {
        const row = {
          dateTime: this.formatDate(customer.call_history[0]?.start_timestamp),
          name: customer.customer_data.OWNER || '-',
          business: customer.customer_data.BUSINESS || '-',
          phone: customer.customer_data.PHONE || '-',
          state: customer.customer_data.STATE || '-',
          duration: this.formatDuration(
            customer.call_history[0].end_timestamp,
            customer.call_history[0].start_timestamp,
          ),
          status: customer.call_history[0].call_status,
          disconnectionReason: customer.call_history[0].disconnection_reason,
          callCount: customer.call_history.length,
          weeklyPayments:
            customer.call_history[0].call_analysis.custom_analysis_data.hasOwnProperty(
              'weekly_payments',
            )
              ? customer.call_history[0].call_analysis.custom_analysis_data.weekly_payments
              : '-',
          hasDebt: customer.call_history[0].call_analysis.custom_analysis_data.hasOwnProperty(
            'has_debt',
          )
            ? customer.call_history[0].call_analysis.custom_analysis_data.has_debt
            : '-',
          TotalDebt: customer.call_history[0].call_analysis.custom_analysis_data.hasOwnProperty(
            'total_debt',
          )
            ? customer.call_history[0].call_analysis.custom_analysis_data.total_debt
            : '-',
          TotalDebt: customer.call_history[0].call_analysis.custom_analysis_data.hasOwnProperty(
            'advances',
          )
            ? customer.call_history[0].call_analysis.custom_analysis_data.advances
            : '-',
          Disposition: customer.call_history[0].call_analysis.custom_analysis_data.hasOwnProperty(
            'disposition',
          )
            ? customer.call_history[0].call_analysis.custom_analysis_data.disposition
            : '-',
          Stage: '-',
        }
        csv.push(Object.values(row).join(','))
      })
      const csvString = csv.join('\n')
      const link = document.createElement('a')
      link.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvString)
      link.download = 'data.csv'
      link.click()
    },
  },
  computed: {},
}
</script>
