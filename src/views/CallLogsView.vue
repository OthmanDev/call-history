<template>
  <Topbar :title="'Call Logs'"></Topbar>
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
                @click="getCustomersByPeriod(1)"
                class="cursor-pointer text-[15px]"
                :class="[currentPediod.value === 1 ? 'text-primary-100 font-medium' : '']"
                >Today</span
              >
              <span
                @click="getCustomersByPeriod(2)"
                class="cursor-pointer text-[15px]"
                :class="[currentPediod.value === 2 ? 'text-primary-100 font-medium' : '']"
                >Yesterday</span
              >
              <span
                @click="getCustomersByPeriod(3)"
                class="cursor-pointer text-[15px]"
                :class="[currentPediod.value === 3 ? 'text-primary-100 font-medium' : '']"
                >Last 3 days</span
              >
              <span
                @click="getCustomersByPeriod(7)"
                class="cursor-pointer text-[15px]"
                :class="[currentPediod.value === 7 ? 'text-primary-100 font-medium' : '']"
                >Last 7 days</span
              >
              <span
                @click="getCustomersByPeriod(0)"
                class="cursor-pointer text-[15px]"
                :class="[currentPediod.value === 0 ? 'text-primary-100 font-medium' : '']"
                >All Time</span
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
                {{ callsLogs.totalElements }}
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
                {{ callsLogs.totalPickupCalls }}
              </h4>
              <span class="text-[17px] capitalize">Picked Up Calls</span>
            </div>
          </div>
        </div>
      </div>
      <div class="rounded-xl bg-white-100 border border-border-100 overflow-hidden">
        <div class="border-b border-border-100 p-4">
          <div class="flex items-center justify-between">
            <span class="text-lg font-semibold text-heading-100">Call Logs</span>
            <div class="flex items-center gap-2">
              <button
                @click="moreFilters = !moreFilters"
                class="flex items-center h-11 gap-5 px-4 bg-primary-100 text-white-100 rounded-md leading-none transition-all duration-150 hover:brightness-125 font-medium"
              >
                <span class="flex items-center gap-2 flex-1"
                  ><Filter :size="18" :stroke-width="1.75" class="mt-[1px]" /> Filters</span
                >
                <ChevronDown
                  :size="18"
                  :stroke-width="1.75"
                  class="-mx-1 mt-[2px] transform transition-transform"
                  :class="[moreFilters ? 'rotate-180' : '']"
                />
              </button>
              <button
                :class="[callsLogs.empty ? 'pointer-events-none opacity-50' : '']"
                @click="exportCSV()"
                class="flex items-center gap-2 h-11 px-4 bg-primary-100 text-white-100 rounded-md leading-none transition-all duration-150 hover:brightness-125 font-medium"
              >
                <Download :size="18" :stroke-width="1.75" />
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
                @change="filterCallsLogs()"
              >
                <option selected disabled value="">Disposition</option>
                <option v-for="(filter, key) in callsLogs.dispositions" :key="key" :value="filter">
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
                @click="clearCallsLogsFilter('disposition')"
                class="absolute -top-1 -right-1 w-[14px] h-[14px] bg-danger-100 text-white-100 flex items-center justify-center cursor-pointer rounded-full"
              >
                <X :size="10" :stroke-width="2" />
              </span>
            </div>
            <div class="relative flex items-center border border-border-100 rounded-md flex-1">
              <select
                v-model="selectedDebt"
                @change="filterCallsLogs()"
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
                @click="clearCallsLogsFilter('hasDebt')"
                class="absolute -top-1 -right-1 w-[14px] h-[14px] bg-danger-100 text-white-100 flex items-center justify-center cursor-pointer rounded-full"
              >
                <X :size="10" :stroke-width="2" />
              </span>
            </div>
            <div class="relative flex items-center border border-border-100 rounded-md flex-1">
              <input
                @input="filterCallsLogs()"
                v-model="debtAmount"
                type="number"
                class="w-full h-11 outline-none px-4 text-heading-100 rounded-md"
                placeholder="Debt Amount"
                min="1"
              />
              <span
                v-if="debtAmount !== ''"
                @click="clearCallsLogsFilter('debtAmount')"
                class="absolute -top-1 -right-1 w-[14px] h-[14px] bg-danger-100 text-white-100 flex items-center justify-center cursor-pointer rounded-full"
              >
                <X :size="10" :stroke-width="2" />
              </span>
            </div>
            <div class="relative flex items-center border border-border-100 rounded-md flex-1">
              <input
                @input="filterCallsLogs()"
                v-model="selectedPayment"
                type="number"
                class="w-full h-11 outline-none px-4 text-heading-100 rounded-md"
                placeholder="Payment"
                min="1"
              />
              <span
                v-if="selectedPayment !== ''"
                @click="clearCallsLogsFilter('payment')"
                class="absolute -top-1 -right-1 w-[14px] h-[14px] bg-danger-100 text-white-100 flex items-center justify-center cursor-pointer rounded-full"
              >
                <X :size="10" :stroke-width="2" />
              </span>
            </div>
          </div>
        </div>
        <div class="max-w-full overflow-x-auto without-scrollbar">
          <table v-if="!callsLogs.empty" class="w-full">
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
                <th class="p-3 text-left text-heading-100 text-[15px] capitalize font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border-100">
              <template v-for="(call, index) in callsLogs.content" :key="index">
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
                    {{ formatDate(call?.startTime) }}
                  </td>
                  <td class="p-3 text-left font-medium text-[15px]">
                    {{ call?.name || '-' }}
                  </td>
                  <td class="p-3 text-left font-medium text-[15px]">
                    {{ call?.company || '-' }}
                  </td>
                  <td class="p-3 text-left font-medium text-[15px]">
                    {{ callt?.phone || '-' }}
                  </td>
                  <td class="p-3 text-left font-medium text-[15px]">
                    {{ call?.state || '-' }}
                  </td>
                  <td class="p-3 text-left font-medium text-[15px]">
                    {{ formatDuration(call?.duration) }}
                  </td>
                  <td class="p-3 text-left font-medium text-[15px]">
                    <span
                      class="inline-flex items-center text-center h-8 px-2 text-[15px] rounded-md bg-opacity-10 capitalize"
                      :class="callStatus(call.status)"
                    >
                      {{ call.status }}
                    </span>
                  </td>
                  <td class="p-3 text-left font-medium text-[15px]">
                    <span
                      class="inline-flex items-center text-center h-8 px-2 text-[15px] rounded-md bg-[#F8F7FA]"
                    >
                      {{ call.disconnectionReason }}
                    </span>
                  </td>
                  <td class="p-3 text-left font-medium text-[15px]">1</td>
                  <td class="p-3 text-left font-medium text-[15px]">
                    <span> {{ call.weeklyPayments ? call.weeklyPayments : '-' }}</span>
                  </td>
                  <td class="p-3 text-left font-medium text-[15px]">
                    <span
                      class="inline-flex items-center text-center h-8 px-2 text-[15px] rounded-md bg-[#F8F7FA]"
                    >
                      {{ call.hasDebt }}</span
                    >
                  </td>
                  <td class="p-3 text-left font-medium text-[15px]">
                    <span> {{ call.totalDebt ? call.totalDebt : '-' }}</span>
                  </td>
                  <td class="p-3 text-left font-medium text-[15px]">
                    <span> {{ call.advances ? call.advances : '-' }}</span>
                  </td>
                  <td class="p-3 text-left font-medium text-[15px]">
                    <span> {{ call.disposition ? call.disposition : '-' }}</span>
                  </td>
                  <td class="p-3 text-left font-medium text-[15px]">
                    <div
                      class="relative flex items-center overflow-hidden border border-border-100 rounded-md"
                    >
                      <select
                        :class="[call?.stage ? '' : 'pointer-events-none opacity-45']"
                        :value="call?.stage"
                        @change="updateStage($event, call)"
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
                        v-if="call?.transcript"
                        @click="showTranscriptPreviewModal(call)"
                        class="cursor-pointer transition-colors duration-150 hover:text-info-100"
                        title="Show Transcript"
                      >
                        <View :size="20" :stroke-width="1.75" />
                      </span>
                      <span
                        v-if="call?.notes"
                        @click="showUpdateNoteModal(call)"
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
                    <div class="flex gap-4">
                      <div class="bg-white-100 border border-border-100 rounded-md flex-1">
                        <div class="border-b border-border-100 p-4">
                          <h3 class="font-semibold text-heading-100">Business Details</h3>
                        </div>
                        <div class="p-4 grid gap-2">
                          <p v-if="call?.lead_source">
                            <span class="font-medium text-heading-100">Lead Source</span>:
                            {{ call.lead_source }}
                          </p>
                          <p v-if="call?.name">
                            <span class="font-medium text-heading-100">Contact Name</span>:
                            {{ call.name }}
                          </p>
                          <p v-if="call?.company">
                            <span class="font-medium text-heading-100">Business Name</span>:
                            {{ call.company }}
                          </p>
                          <p v-if="call?.state">
                            <span class="font-medium text-heading-100">State</span>:
                            {{ call.state }}
                          </p>
                          <p v-if="call?.email">
                            <span class="font-medium text-heading-100">Email</span>:
                            {{ call.email }}
                          </p>
                        </div>
                      </div>
                      <div class="bg-white-100 border border-border-100 rounded-md flex-1">
                        <div class="border-b border-border-100 p-4">
                          <h3 class="font-semibold text-heading-100">Call Details</h3>
                        </div>
                        <div class="p-4 grid gap-2">
                          <p>
                            <span class="font-medium text-heading-100">Call ID</span>:
                            {{ call?.call_id }}
                          </p>
                          <p v-if="call.disconnectionReason">
                            <span class="font-medium text-heading-100">Disconnection Reason</span>:
                            {{ call.disconnectionReason }}
                          </p>
                          <p v-if="call?.user_sentiment">
                            <span class="font-medium text-heading-100">User Sentiment</span>:
                            {{ call.user_sentiment }}
                          </p>
                          <p>
                            <span class="font-medium text-heading-100">Call From</span>:
                            {{ call.fromNumber }}
                          </p>
                          <p>
                            <span class="font-medium text-heading-100">Call To</span>:
                            {{ call.toNumber }}
                          </p>
                          <p v-if="call?.llm_latency">
                            <span class="font-medium text-heading-100">End to End Latency</span>:
                            {{ call.llm_latency.max }} ms
                          </p>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
          <div
            v-if="!loaderStore.loading && callsLogs.empty"
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
        <div class="border-t-4 rounded-bl-xl rounded-br-xl bg-white-100 border-border-100">
          <div class="flex items-center px-4 py-3 justify-between">
            <nav class="flex items-center gap-2">
              <button
                :class="[callsLogs.first ? 'pointer-events-none opacity-50' : '']"
                class="flex items-center gap-2 h-11 px-4 bg-primary-100 text-white-100 rounded-md leading-none transition-all duration-150 hover:brightness-125 font-medium"
                @click="prevPage"
              >
                <ArrowLeft :size="18" :stroke-width="1.75" class="mt-[2px]" />
                Previous
              </button>
              <button
                :class="[callsLogs.last ? 'pointer-events-none opacity-50' : '']"
                class="flex items-center gap-2 h-11 px-4 bg-primary-100 text-white-100 rounded-md leading-none transition-all duration-150 hover:brightness-125 font-medium"
                @click="nextPage"
              >
                Next
                <ArrowRight :size="18" :stroke-width="1.75" class="mt-[2px]" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="updateNoteModal && updateNoteModal.id === currentCustomerToHanlde._id"
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
              v-model="currentCustomerToHanlde.contact.notes"
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
      v-if="showTranscriptModal && showTranscriptModal.id === currentCustomerToHanlde._id"
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
              v-html="formattedTranscript(currentCustomerToHanlde.transcript)"
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
  Filter,
  Download,
  ArrowRight,
  ArrowLeft,
  Trash2,
} from 'lucide-vue-next'
import Topbar from '@/components/Topbar.vue'
import ApiRequest from '@/libs/ApiRequest'
import moment from 'moment'
import { useLoaderStore } from '@/stores/loader'
import { useToastStore } from '@/stores/toast'

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
    Filter,
    Download,
    ArrowRight,
    ArrowLeft,
    Trash2,
    Topbar,
  },
  setup() {
    const loaderStore = useLoaderStore()
    const toastStore = useToastStore()
    return { loaderStore, toastStore }
  },
  data() {
    return {
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
      callsLogs: {
        content: [],
        dispositions: [],
        empty: false,
        first: true,
        last: true,
        totalPickupCalls: 0,
        totalElements: 0,
      },
      currentPage: 0,
      dispositionFilter: [
        'Has Debt and Interested',
        'Has Debt and Not Interested',
        'Does Not Have Debt',
        'Goes to Voicemail',
        'Caller Hangs Up',
        '(DNC) Do Not Call List',
        'Please Remove',
        'Uncertain',
      ],
      disconnectionReasonFilter: [
        'user_hangup',
        'agent_hangup',
        'call_transfer',
        'voicemail_reached',
        'inactivity',
        'machine_detected',
      ],
      hasDebtFilter: [true, false],
      moreFilters: false,
      currentPediod: {
        label: 'Today',
        value: 1,
      },
      isActivePeriod: false,
      periods: [
        {
          label: 'Today',
          value: 1,
        },
        {
          label: 'Yesterday',
          value: 2,
        },
        {
          label: 'Last 3 days',
          value: 3,
        },
        {
          label: 'Last 7 days',
          value: 7,
        },
        {
          label: 'All Time',
          value: 0,
        },
      ],
      selectedDisposition: '',
      debtAmount: '',
      selectedPayment: '',
      selectedDebt: '',
    }
  },
  mounted() {
    this.loadCallLogs()
  },
  methods: {
    async loadCallLogs() {
      this.loaderStore.setIsLoading(true)
      try {
        let queries = {
          page: this.currentPage,
          days: this.currentPediod.value,
          disposition: this.selectedDisposition ? this.selectedDisposition : false,
          hasDebt: this.selectedDebt !== '' ? this.selectedDebt : '',
          debtAmount: this.debtAmount ? this.debtAmount : false,
          payment: this.selectedPayment ? this.selectedPayment : false,
        }
        if (queries.days === 0) {
          delete queries.days
        }
        if (!queries.disposition) {
          delete queries.disposition
        }
        if (queries.hasDebt === '') {
          delete queries.hasDebt
        }
        if (!queries.debtAmount) {
          delete queries.debtAmount
        }
        if (!queries.payment) {
          delete queries.payment
        }
        queries = new URLSearchParams(queries).toString()
        const { data } = await ApiRequest().get(`/api/v1/calls/list?${queries}`)
        this.callsLogs = data
      } catch (e) {
        this.toastStore.show(e, 'error')
      } finally {
        this.loaderStore.setIsLoading(false)
      }
    },
    filterCallsLogs() {
      this.loadCallLogs()
    },
    clearCallsLogsFilter(type) {
      if (type === 'disposition') {
        this.selectedDisposition = ''
      }
      if (type === 'hasDebt') {
        this.selectedDebt = ''
      }
      if (type === 'debtAmount') {
        this.debtAmount = ''
      }
      if (type === 'payment') {
        this.selectedPayment = ''
      }
      this.loadCallLogs()
    },
    toggleExpandedRow(id) {
      this.expandedRowId = this.expandedRowId === id ? null : id
    },
    updateStage(event, customer) {
      this.updateNotesOrStage('stage', customer.contact._id, event.target.value)
    },
    updateNotes(customer) {
      this.updateNotesOrStage('notes', customer.contact._id, customer.contact.notes)
    },
    showUpdateNoteModal(customer) {
      this.currentCustomerToHanlde = customer
      this.updateNoteModal = {
        id: customer.contact._id,
      }
    },
    showTranscriptPreviewModal(customer) {
      this.currentCustomerToHanlde = customer
      this.showTranscriptModal = {
        id: customer._id,
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
      if (value === 0) return 0
      if (!value) return '-'
      const totalSeconds = Math.floor(value / 1000)
      const hours = Math.floor(totalSeconds / 3600)
      const minutes = Math.floor((totalSeconds % 3600) / 60)
      const seconds = totalSeconds % 60
      const hoursFormatted = hours.toString().padStart(2, '0')
      const minutesFormatted = minutes.toString().padStart(2, '0')
      const secondsFormatted = seconds.toString().padStart(2, '0')
      return `${hoursFormatted}:${minutesFormatted}:${secondsFormatted}`
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
      this.currentPage = 0
      this.loadCallLogs()
    },
    async exportCSV() {
      this.loaderStore.setIsLoading(true)
      try {
        let queries = {
          page: this.currentPage,
          days: this.currentPediod.value,
          disposition: this.selectedDisposition ? this.selectedDisposition : false,
          hasDebt: this.selectedDebt !== '' ? this.selectedDebt : '',
          debtAmount: this.debtAmount ? this.debtAmount : false,
          payment: this.selectedPayment ? this.selectedPayment : false,
        }
        if (queries.days === 0) {
          delete queries.days
        }
        if (!queries.disposition) {
          delete queries.disposition
        }
        if (queries.hasDebt === '') {
          delete queries.hasDebt
        }
        if (!queries.debtAmount) {
          delete queries.debtAmount
        }
        if (!queries.payment) {
          delete queries.payment
        }
        queries = new URLSearchParams(queries).toString()
        const { data } = await ApiRequest().get(`/api/v1/calls/export?${queries}`)
        if (data) {
          const csv = data
          const blob = new Blob([csv], { type: 'text/csv' })
          const url = window.URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.setAttribute('hidden', '')
          a.setAttribute('href', url)
          a.setAttribute('download', 'data.csv')
          document.body.appendChild(a)
          a.click()
          window.URL.revokeObjectURL(url)
          document.body.removeChild(a)
          this.toastStore.show('CSV file exported successfully!', 'success')
        }
      } catch (e) {
        this.toastStore.show(e, 'error')
      } finally {
        this.loaderStore.setIsLoading(false)
      }
    },
    clearFilters() {
      this.selectedDisposition = ''
      this.debtAmount = ''
      this.selectedPayment = ''
      this.selectedDebt = ''
      this.moreFilters = false
      this.loadCallLogs()
    },
    async updateNotesOrStage(type, id, value) {
      this.loaderStore.setIsLoading(true)
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
          this.loadCallLogs()
        }
      } catch (e) {
        this.toastStore.show(e, 'error')
      } finally {
        this.loaderStore.setIsLoading(false)
      }
    },
    prevPage() {
      this.currentPage -= 1
      this.loadCallLogs()
    },
    nextPage() {
      this.currentPage += 1
      this.loadCallLogs()
    },
  },
  computed: {},
}
</script>
