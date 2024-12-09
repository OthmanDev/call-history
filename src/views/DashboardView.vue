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
                @click="getCustomersByPeriod('today')"
                class="cursor-pointer text-[15px]"
                :class="[currentPediod.value === 'today' ? 'text-primary-100 font-medium' : '']"
                >Today</span
              >
              <span
                @click="getCustomersByPeriod('yesterday')"
                class="cursor-pointer text-[15px]"
                :class="[currentPediod.value === 'yesterday' ? 'text-primary-100 font-medium' : '']"
                >Yesterday</span
              >
              <span
                @click="getCustomersByPeriod('last_3_days')"
                class="cursor-pointer text-[15px]"
                :class="[
                  currentPediod.value === 'last_3_days' ? 'text-primary-100 font-medium' : '',
                ]"
                >Last 3 days</span
              >
              <span
                @click="getCustomersByPeriod('last_7_days')"
                class="cursor-pointer text-[15px]"
                :class="[
                  currentPediod.value === 'last_7_days' ? 'text-primary-100 font-medium' : '',
                ]"
                >Last 7 days</span
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
                {{ totalCalls }}
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
                {{ connectedCalls }}
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
                :class="[customers.length === 0 ? 'pointer-events-none opacity-50' : '']"
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
                :class="[customers.length === 0 ? 'pointer-events-none opacity-50' : '']"
                @click="exportCSV"
                class="flex items-center h-11 px-4 bg-primary-100 text-white-100 rounded-md leading-none transition-all duration-150 hover:brightness-125 font-medium"
              >
                Export CSV
              </button>
            </div>
          </div>
        </div>
        <div v-if="moreFilters" class="border-b border-border-100 p-4">
          <div class="flex items-center flex-wrap gap-2">
            <div class="relative flex items-center border border-border-100 rounded-md flex-1">
              <select
                v-model="selectedDisposition"
                class="w-full h-11 outline-none px-4 appearance-none cursor-pointer text-heading-100 rounded-md"
              >
                <option selected disabled value="">Disposition</option>
                <option v-for="(filter, key) in dispositionFilter" :key="key" :value="filter">
                  {{ filter }}
                </option>
              </select>
              <span
                class="absolute top-0 right-0 bottom-0 w-[40px] bg-white-100 pointer-events-none flex items-center justify-center rounded-tr-md rounded-br-md"
              >
                <ChevronDown :size="18" :stroke-width="1.75" />
              </span>
              <span
                v-if="selectedDisposition !== ''"
                @click="selectedDisposition = ''"
                class="absolute -top-1 -right-1 w-[14px] h-[14px] bg-danger-100 text-white-100 flex items-center justify-center cursor-pointer rounded-full"
              >
                <X :size="10" :stroke-width="2" />
              </span>
            </div>
            <div class="relative flex items-center border border-border-100 rounded-md flex-1">
              <select
                v-model="selectedDisconnectionReason"
                class="w-full h-11 outline-none px-4 appearance-none cursor-pointer text-heading-100 rounded-md"
              >
                <option selected disabled value="">Disconnection Reason</option>
                <option
                  v-for="(filter, key) in disconnectionReasonFilter"
                  :key="key"
                  :value="filter"
                >
                  {{ filter }}
                </option>
              </select>
              <span
                class="absolute top-0 right-0 bottom-0 w-[40px] bg-white-100 pointer-events-none flex items-center justify-center rounded-tr-md rounded-br-md"
              >
                <ChevronDown :size="18" :stroke-width="1.75" />
              </span>
              <span
                v-if="selectedDisconnectionReason !== ''"
                @click="selectedDisconnectionReason = ''"
                class="absolute -top-1 -right-1 w-[14px] h-[14px] bg-danger-100 text-white-100 flex items-center justify-center cursor-pointer rounded-full"
              >
                <X :size="10" :stroke-width="2" />
              </span>
            </div>
            <div
              class="relative flex items-center border border-border-100 rounded-md min-w-[130px]"
            >
              <select
                v-model="selectedDebt"
                class="w-full h-11 outline-none px-4 appearance-none cursor-pointer text-heading-100 rounded-md"
              >
                <option selected disabled value="">Has Debt</option>
                <option v-for="(filter, key) in hasDebtFilter" :key="key" :value="filter">
                  {{ filter }}
                </option>
              </select>
              <span
                class="absolute top-0 right-0 bottom-0 w-[40px] bg-white-100 pointer-events-none flex items-center justify-center rounded-tr-md rounded-br-md"
              >
                <ChevronDown :size="18" :stroke-width="1.75" />
              </span>
              <span
                v-if="selectedDebt !== ''"
                @click="selectedDebt = ''"
                class="absolute -top-1 -right-1 w-[14px] h-[14px] bg-danger-100 text-white-100 flex items-center justify-center cursor-pointer rounded-full"
              >
                <X :size="10" :stroke-width="2" />
              </span>
            </div>
            <div class="relative flex items-center border border-border-100 rounded-md w-[200px]">
              <input
                v-model="selectedLeadSource"
                type="text"
                class="w-full h-11 outline-none px-4 text-heading-100 rounded-md"
                placeholder="Lead Source"
              />
              <span
                v-if="selectedLeadSource !== ''"
                @click="selectedLeadSource = ''"
                class="absolute -top-1 -right-1 w-[14px] h-[14px] bg-danger-100 text-white-100 flex items-center justify-center cursor-pointer rounded-full"
              >
                <X :size="10" :stroke-width="2" />
              </span>
            </div>
            <div
              v-if="false"
              class="relative flex items-center border border-border-100 rounded-md min-w-[110px]"
            >
              <select
                v-model="selectedDialed"
                class="w-full h-11 outline-none px-4 appearance-none cursor-pointer text-heading-100 rounded-md"
              >
                <option selected disabled value="">Dialed</option>
                <option v-for="(filter, key) in dialedFilter" :key="key" :value="filter">
                  {{ filter }}
                </option>
              </select>
              <span
                class="absolute top-0 right-0 bottom-0 w-[40px] bg-white-100 pointer-events-none flex items-center justify-center rounded-tr-md rounded-br-md"
              >
                <ChevronDown :size="18" :stroke-width="1.75" />
              </span>
              <span
                v-if="selectedDialed !== ''"
                @click="selectedDialed = ''"
                class="absolute -top-1 -right-1 w-[14px] h-[14px] bg-danger-100 text-white-100 flex items-center justify-center cursor-pointer rounded-full"
              >
                <X :size="10" :stroke-width="2" />
              </span>
            </div>
            <div
              class="relative flex items-center border border-border-100 rounded-md min-w-[150px]"
            >
              <select
                v-model="selectedDialAgain"
                class="w-full h-11 outline-none px-4 appearance-none cursor-pointer text-heading-100 rounded-md"
              >
                <option selected disabled value="">Dialed Again</option>
                <option v-for="(filter, key) in dialAgainFilter" :key="key" :value="filter">
                  {{ filter ? 'Yes' : 'No' }}
                </option>
              </select>
              <span
                class="absolute top-0 right-0 bottom-0 w-[40px] bg-white-100 pointer-events-none flex items-center justify-center rounded-tr-md rounded-br-md"
              >
                <ChevronDown :size="18" :stroke-width="1.75" />
              </span>
              <span
                v-if="selectedDialAgain !== ''"
                @click="selectedDialAgain = ''"
                class="absolute -top-1 -right-1 w-[14px] h-[14px] bg-danger-100 text-white-100 flex items-center justify-center cursor-pointer rounded-full"
              >
                <X :size="10" :stroke-width="2" />
              </span>
            </div>
            <div class="relative flex items-center border border-border-100 rounded-md w-[150px]">
              <select
                v-model="selectedStage"
                class="w-full h-11 outline-none px-4 appearance-none cursor-pointer text-heading-100 rounded-md"
              >
                <option selected disabled value="-1">Stage</option>
                <option v-for="(filter, key) in stages" :key="key" :value="filter.key">
                  {{ filter.value }}
                </option>
              </select>
              <span
                class="absolute top-0 right-0 bottom-0 w-[40px] bg-white-100 pointer-events-none flex items-center justify-center rounded-tr-md rounded-br-md"
              >
                <ChevronDown :size="18" :stroke-width="1.75" />
              </span>
              <span
                v-if="selectedStage !== '-1'"
                @click="selectedStage = '-1'"
                class="absolute -top-1 -right-1 w-[14px] h-[14px] bg-danger-100 text-white-100 flex items-center justify-center cursor-pointer rounded-full"
              >
                <X :size="10" :stroke-width="2" />
              </span>
            </div>
            <div class="relative flex items-center border border-border-100 rounded-md w-[150px]">
              <input
                v-model="selectedState"
                type="text"
                class="w-full h-11 outline-none px-4 text-heading-100 rounded-md"
                placeholder="State"
              />
              <span
                v-if="selectedState !== ''"
                @click="selectedState = ''"
                class="absolute -top-1 -right-1 w-[14px] h-[14px] bg-danger-100 text-white-100 flex items-center justify-center cursor-pointer rounded-full"
              >
                <X :size="10" :stroke-width="2" />
              </span>
            </div>
            <div class="relative flex items-center border border-border-100 rounded-md w-[150px]">
              <input
                v-model="debtAmount"
                type="number"
                class="w-full h-11 outline-none px-4 text-heading-100 rounded-md"
                placeholder="Debt Amount"
              />
              <span
                v-if="debtAmount !== ''"
                @click="debtAmount = ''"
                class="absolute -top-1 -right-1 w-[14px] h-[14px] bg-danger-100 text-white-100 flex items-center justify-center cursor-pointer rounded-full"
              >
                <X :size="10" :stroke-width="2" />
              </span>
            </div>
            <div class="relative flex items-center border border-border-100 rounded-md w-[150px]">
              <input
                v-model="selectedPayment"
                type="number"
                class="w-full h-11 outline-none px-4 text-heading-100 rounded-md"
                placeholder="Payment"
              />
              <span
                v-if="selectedPayment !== ''"
                @click="selectedPayment = ''"
                class="absolute -top-1 -right-1 w-[14px] h-[14px] bg-danger-100 text-white-100 flex items-center justify-center cursor-pointer rounded-full"
              >
                <X :size="10" :stroke-width="2" />
              </span>
            </div>
          </div>
        </div>
        <div class="max-w-full overflow-x-auto without-scrollbar">
          <table v-if="filteredCustomers.length > 0" class="w-full">
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
                <th
                  v-if="false"
                  class="p-3 text-left text-heading-100 text-[15px] capitalize font-semibold"
                >
                  Status
                </th>
                <th
                  v-if="false"
                  class="p-3 text-left text-heading-100 text-[15px] capitalize font-semibold"
                >
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
              <template v-for="(customer, index) in filteredCustomers" :key="index">
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
                    {{ customer.customer_data.PHONE ? '+1' + customer.customer_data.PHONE : '-' }}
                  </td>
                  <td class="p-3 text-left font-medium text-[15px]">
                    {{ customer.customer_data.STATE || '-' }}
                  </td>
                  <td class="p-3 text-left font-medium text-[15px]">
                    {{ formatDuration(customer.call_history[0].call_cost.total_duration_seconds) }}
                  </td>
                  <td v-if="false" class="p-3 text-left font-medium text-[15px]">
                    <span
                      class="inline-flex items-center text-center h-8 px-2 text-[15px] rounded-md bg-opacity-10 capitalize"
                      :class="callStatus(customer.call_history[0].call_status)"
                    >
                      {{ customer.call_history[0].call_status }}
                    </span>
                  </td>
                  <td v-if="false" class="p-3 text-left font-medium text-[15px]">
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
                        <option disabled selected value="">Stage</option>
                        <option v-for="stage in stages" :key="stage.key" :value="stage.key">
                          {{ stage.value }}
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
                        v-if="customer.call_history[0]?.transcript"
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
          <div
            v-if="!isLoading && filteredCustomers.length === 0"
            class="h-[300px] flex items-center justify-center flex-col text-center"
          >
            <div class="w-[180px] mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 647.63626 632.17383"
                class="w-full"
              >
                <path
                  d="M687.3279,276.08691H512.81813a15.01828,15.01828,0,0,0-15,15v387.85l-2,.61005-42.81006,13.11a8.00676,8.00676,0,0,1-9.98974-5.31L315.678,271.39691a8.00313,8.00313,0,0,1,5.31006-9.99l65.97022-20.2,191.25-58.54,65.96972-20.2a7.98927,7.98927,0,0,1,9.99024,5.3l32.5498,106.32Z"
                  transform="translate(-276.18187 -133.91309)"
                  fill="hsl(249.64deg 70.98% 37.84% / 10%)"
                ></path>
                <path
                  d="M725.408,274.08691l-39.23-128.14a16.99368,16.99368,0,0,0-21.23-11.28l-92.75,28.39L380.95827,221.60693l-92.75,28.4a17.0152,17.0152,0,0,0-11.28028,21.23l134.08008,437.93a17.02661,17.02661,0,0,0,16.26026,12.03,16.78926,16.78926,0,0,0,4.96972-.75l63.58008-19.46,2-.62v-2.09l-2,.61-64.16992,19.65a15.01489,15.01489,0,0,1-18.73-9.95l-134.06983-437.94a14.97935,14.97935,0,0,1,9.94971-18.73l92.75-28.4,191.24024-58.54,92.75-28.4a15.15551,15.15551,0,0,1,4.40966-.66,15.01461,15.01461,0,0,1,14.32032,10.61l39.0498,127.56.62012,2h2.08008Z"
                  transform="translate(-276.18187 -133.91309)"
                  fill="hsl(249.64deg 70.98% 37.84% / 10%)"
                ></path>
                <path
                  d="M398.86279,261.73389a9.0157,9.0157,0,0,1-8.61133-6.3667l-12.88037-42.07178a8.99884,8.99884,0,0,1,5.9712-11.24023l175.939-53.86377a9.00867,9.00867,0,0,1,11.24072,5.9707l12.88037,42.07227a9.01029,9.01029,0,0,1-5.9707,11.24072L401.49219,261.33887A8.976,8.976,0,0,1,398.86279,261.73389Z"
                  transform="translate(-276.18187 -133.91309)"
                  fill="#321CA4"
                ></path>
                <circle cx="190.15351" cy="24.95465" r="20" fill="#321CA4"></circle>
                <circle cx="190.15351" cy="24.95465" r="12.66462" fill="#FFF"></circle>
                <path
                  d="M878.81836,716.08691h-338a8.50981,8.50981,0,0,1-8.5-8.5v-405a8.50951,8.50951,0,0,1,8.5-8.5h338a8.50982,8.50982,0,0,1,8.5,8.5v405A8.51013,8.51013,0,0,1,878.81836,716.08691Z"
                  transform="translate(-276.18187 -133.91309)"
                  fill="hsl(249.64deg 70.98% 37.84% / 10%)"
                ></path>
                <path
                  d="M723.31813,274.08691h-210.5a17.02411,17.02411,0,0,0-17,17v407.8l2-.61v-407.19a15.01828,15.01828,0,0,1,15-15H723.93825Zm183.5,0h-394a17.02411,17.02411,0,0,0-17,17v458a17.0241,17.0241,0,0,0,17,17h394a17.0241,17.0241,0,0,0,17-17v-458A17.02411,17.02411,0,0,0,906.81813,274.08691Zm15,475a15.01828,15.01828,0,0,1-15,15h-394a15.01828,15.01828,0,0,1-15-15v-458a15.01828,15.01828,0,0,1,15-15h394a15.01828,15.01828,0,0,1,15,15Z"
                  transform="translate(-276.18187 -133.91309)"
                  fill="hsl(249.64deg 70.98% 37.84% / 10%)"
                ></path>
                <path
                  d="M801.81836,318.08691h-184a9.01015,9.01015,0,0,1-9-9v-44a9.01016,9.01016,0,0,1,9-9h184a9.01016,9.01016,0,0,1,9,9v44A9.01015,9.01015,0,0,1,801.81836,318.08691Z"
                  transform="translate(-276.18187 -133.91309)"
                  fill="#321CA4"
                ></path>
                <circle cx="433.63626" cy="105.17383" r="20" fill="#321CA4"></circle>
                <circle cx="433.63626" cy="105.17383" r="12.18187" fill="#FFF"></circle>
              </svg>
            </div>
            <span class="text-heading-100 text-[17px] block mb-2 capitalize"
              >No results match your current filter criteria.</span
            >
            <span
              @click="clearFilters"
              class="text-heading-100 text-[17px] capitalize font-medium hover:text-primary-100 cursor-pointer"
              >Clear filters</span
            >
          </div>
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
      v-if="updateNoteModal && updateNoteModal.id === currentCustomerToHanlde.customer_data._id"
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
              v-model="currentCustomerToHanlde.customer_data.notes"
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
            @click="updateNotes(currentCustomerToHanlde)"
            type="button"
            class="flex items-center h-10 px-4 bg-primary-100 text-white-100 rounded-md leading-none transition-all duration-150 hover:brightness-125 font-medium"
          >
            Update
          </button>
        </div>
      </div>
    </div>
    <div
      v-if="
        showTranscriptModal && showTranscriptModal.id === currentCustomerToHanlde.customer_data._id
      "
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
              v-html="formattedTranscript(currentCustomerToHanlde.call_history[0].transcript)"
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
    <div
      class="fixed bottom-4 right-0 z-[10000] transition-transform transform duration-300"
      :class="[toast.active ? '-translate-x-4' : 'translate-x-full']"
    >
      <div
        @click="disableToast"
        class="rounded-lg p-5 min-w-[350px] max-w-[500px] flex items-center justify-between gap-5 cursor-pointer"
        :class="[toast.type === 'error' ? 'bg-danger-100' : 'bg-success-100']"
      >
        <p class="text-[17px] font-medium text-white-100 drop-shadow-md">{{ toast.message }}</p>
        <span class="block -mx-1 mt-[1px] text-white-100"
          ><CircleX :size="20" :stroke-width="1.75"
        /></span>
      </div>
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
  CircleX,
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
    CircleX,
  },
  data() {
    return {
      toast: {
        active: false,
        message: '',
        type: '',
      },
      expandedRowId: null,
      stages: [
        {
          key: 0,
          value: 'Closer qualified, follow up',
        },
        {
          key: 1,
          value: 'Quote sent, awaiting agreements',
        },
        {
          key: 2,
          value: 'Agreements received',
        },
        {
          key: 3,
          value: 'Closing call follow up',
        },
        {
          key: 4,
          value: 'Closed',
        },
        {
          key: 5,
          value: 'Paid',
        },
      ],
      updateNoteModal: null,
      showTranscriptModal: null,
      currentCustomerToHanlde: {},
      customers: [],
      allCustomers: [],
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
      hasDebtFilter: [true, false],
      dialedFilter: [0, 1, 2, 3, 4, 5],
      dialAgainFilter: [true, false],
      moreFilters: false,
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
          label: 'Last 3 days',
          value: 'last_3_days',
        },
        {
          label: 'Last 7 days',
          value: 'last_7_days',
        },
      ],
      selectedDisposition: '',
      selectedDisconnectionReason: '',
      selectedState: '',
      selectedStage: '-1',
      selectedDialed: '',
      debtAmount: '',
      selectedPayment: '',
      selectedDebt: '',
      selectedDialAgain: '',
      selectedLeadSource: '',
    }
  },
  mounted() {
    this.loadAllCustomers()
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
          date_range: this.currentPediod.value,
          skip: this.currentPage,
          limit: 30,
        }
        queries = new URLSearchParams(queries).toString()
        const { data } = await ApiRequest().get(`/merged-data/filter?${queries}`)
        this.customers = data.data
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
    },
    async loadAllCustomers() {
      this.isLoading = true
      try {
        let queries = {
          date_range: this.currentPediod.value,
          skip: 0,
          limit: 500,
        }
        queries = new URLSearchParams(queries).toString()
        const { data } = await ApiRequest().get(`/merged-data/filter?${queries}`)
        this.allCustomers = data.data
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
    },
    toggleExpandedRow(id) {
      this.expandedRowId = this.expandedRowId === id ? null : id
    },
    updateStage(event, customer) {
      this.updateNotesOrStage('stage', customer.customer_data._id, event.target.value)
    },
    updateNotes(customer) {
      this.updateNotesOrStage('notes', customer.customer_data._id, customer.customer_data.notes)
    },
    showUpdateNoteModal(customer) {
      this.currentCustomerToHanlde = customer
      this.updateNoteModal = {
        id: customer.customer_data._id,
      }
    },
    showTranscriptPreviewModal(customer) {
      this.currentCustomerToHanlde = customer
      this.showTranscriptModal = {
        id: customer.customer_data._id,
      }
    },
    closeUpdateNoteModal() {
      this.updateNoteModal = null
      this.showTranscriptModal = null
      this.currentCustomerToHanlde = {}
    },
    formatDate(value) {
      if (!value) return '-'
      return moment(value).format('MM/DD/YYYY HH:mm')
    },
    formatDuration(value) {
      if (!value) return '-'
      const totalSeconds = Number(value)
      const duration = moment.duration(totalSeconds, 'seconds')
      const hours = Math.floor(duration.asHours())
      const minutes = duration.minutes()
      const secs = duration.seconds()
      if (hours > 0) {
        return [hours, minutes.toString().padStart(2, '0'), secs.toString().padStart(2, '0')].join(
          ':',
        )
      } else {
        return [minutes.toString().padStart(2, '0'), secs.toString().padStart(2, '0')].join(':')
      }
    },
    callStatus(value) {
      if (!value) return ''
      if (value === 'error') return 'bg-danger-100 text-danger-100'
      if (value === 'ended') return 'bg-success-100 text-success-100'
    },
    formattedTranscript(value) {
      return value.replace(/\n/g, '<span></span>')
    },
    getCustomersByPeriod(period) {
      this.isActivePeriod = false
      this.currentPediod = this.periods.find((p) => p.value === period)
      this.loadCustomers(this.currentPage)
      this.loadAllCustomers()
    },
    exportCSV() {
      const headers = [
        'Time Called',
        'Name',
        'Business',
        'Phone',
        'State',
        'Duration',
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
      this.filteredCustomers.forEach((customer) => {
        const row = {
          dateTime: this.formatDate(customer.call_history[0]?.start_timestamp),
          name: customer.customer_data.OWNER || '-',
          business: customer.customer_data.BUSINESS || '-',
          phone: customer.customer_data.PHONE || '-',
          state: customer.customer_data.STATE || '-',
          duration: this.formatDuration(customer.call_history[0].call_cost.total_duration_seconds),
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
          Stage: customer.customer_data.stage
            ? this.stages.find((s) => s.key === customer.customer_data.stage).value
            : '-',
        }
        csv.push(Object.values(row).join(','))
      })
      const csvString = csv.join('\n')
      const link = document.createElement('a')
      link.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvString)
      link.download = 'data.csv'
      link.click()
    },
    clearFilters() {
      this.selectedDisposition = ''
      this.selectedDisconnectionReason = ''
      this.selectedState = ''
      this.selectedStage = '-1'
      this.selectedDialed = ''
      this.debtAmount = ''
      this.selectedPayment = ''
      this.selectedDebt = ''
      this.selectedDialAgain = ''
      this.selectedLeadSource = ''
      this.moreFilters = false
    },
    async updateNotesOrStage(type, id, value) {
      this.isLoading = true
      try {
        const payload = {}
        if (type === 'notes') {
          if (!value) {
            this.toast = {
              active: true,
              message: 'Notes field is required',
              type: 'error',
            }
            return
          }
          payload.notes = value
        } else {
          payload.stage = value
        }
        const { data } = await ApiRequest().put(`/update-merged-data/${id}`, payload)
        if (data) {
          this.closeUpdateNoteModal()
          if (type === 'notes') {
            this.toast = {
              active: true,
              message: 'Notes updated successfully!',
              type: 'success',
            }
          } else {
            this.toast = {
              active: true,
              message: 'Stage updated successfully!',
              type: 'success',
            }
          }
          this.loadCustomers(this.currentPage)
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
    },
    disableToast() {
      this.toast = {
        show: false,
        message: '',
        type: '',
      }
    },
  },
  computed: {
    filteredCustomers() {
      return this.customers.filter((customer) => {
        // Disposition filter
        const dispositionMatch =
          !this.selectedDisposition ||
          customer.call_history[0].call_analysis.custom_analysis_data.disposition ===
            this.selectedDisposition

        // Disconnection Reason filter
        const disconnectionReasonMatch =
          !this.selectedDisconnectionReason ||
          customer.call_history[0].disconnection_reason ===
            this.selectedDisconnectionReason.toLowerCase().replaceAll(' ', '_')

        // States filter
        const stateMatch =
          !this.selectedState || customer.customer_data.STATE === this.selectedState

        // Has Debt filter
        const hasDebtMatch =
          !this.selectedDebt ||
          customer.call_history[0].call_analysis.custom_analysis_data.has_debt === this.selectedDebt

        // Dial Again filter
        const dialAgainMatch =
          !this.selectedDialAgain || customer.call_history[0].dial_again === this.selectedDialAgain

        // Stage filter
        const stageMatch =
          this.selectedStage === '-1' || customer.customer_data.stage === this.selectedStage

        // Dialed filter
        const dialedMatch =
          !this.selectedDialed || customer.call_history[0].redialed_count === this.selectedDialed

        // Debt Amount filter
        const debtAmountMatch =
          !this.debtAmount ||
          customer.call_history[0].call_analysis.custom_analysis_data.total_debt === this.debtAmount

        // Payemnt filter
        const paymentMatch =
          !this.selectedPayment ||
          customer.call_history[0].call_analysis.custom_analysis_data.weekly_payments ===
            this.selectedPayment

        // Lead Sourcce filter
        const leadSourceMatch =
          !this.selectedLeadSource || customer.customer_data.lead_source === this.selectedLeadSource

        // Combine all filters
        return (
          dispositionMatch &&
          disconnectionReasonMatch &&
          stateMatch &&
          hasDebtMatch &&
          dialAgainMatch &&
          stageMatch &&
          dialedMatch &&
          debtAmountMatch &&
          paymentMatch &&
          leadSourceMatch
        )
      })
    },
    totalCalls() {
      return this.allCustomers.filter((customer) => customer.call_history.length > 0).length
    },
    connectedCalls() {
      return this.allCustomers.filter((customer) => {
        return customer.call_history.every((call) => call.call_analysis?.call_successful)
      }).length
    },
  },
}
</script>
