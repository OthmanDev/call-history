<template>
  <Topbar :title="'Contacts Management'">
    <button
      @click="showUploadContactsModal = true"
      class="flex items-center gap-2 h-10 px-3 bg-primary-100 text-white-100 rounded-md leading-none transition-all duration-150 hover:brightness-125 font-medium"
      :to="{ name: 'campaign-wizard' }"
    >
      <Plus :size="18" :stroke-width="1.75" />
      Upload Contacts
    </button>
  </Topbar>
  <main class="min-h-screen">
    <div class="p-6">
      <div class="rounded-xl bg-white-100 border border-border-100 overflow-hidden">
        <div class="p-4">
          <div class="border border-border-100 rounded-xl overflow-hidden">
            <div class="border-b border-border-100 p-4">
              <div class="flex items-center justify-between">
                <span class="text-lg font-bold text-heading-100">Contacts</span>
                <div class="flex items-center gap-2">
                  <div class="relative w-[500px]">
                    <input
                      @input="searchBy"
                      type="text"
                      placeholder="Search contacts by phone, email, name, or address"
                      class="border border-border-100 w-full h-11 outline-none px-4 text-heading-100 rounded-md"
                      v-model="searchQuery"
                    />
                  </div>
                  <button
                    :class="[contacts.empty ? 'pointer-events-none opacity-50' : '']"
                    @click="exportCSV"
                    class="flex items-center gap-2 h-11 px-4 bg-primary-100 text-white-100 rounded-md leading-none transition-all duration-150 hover:brightness-125 font-medium"
                  >
                    <Download :size="18" :stroke-width="1.75" />
                    Export CSV
                  </button>
                  <button
                    @click="showUploadContactsModal = true"
                    class="flex items-center gap-2 h-11 px-4 bg-primary-100 text-white-100 rounded-md leading-none transition-all duration-150 hover:brightness-125 font-medium"
                  >
                    <Upload :size="18" :stroke-width="1.75" />
                    Upload Contacts
                  </button>
                  <button
                    @click="showHelpModal = true"
                    class="flex items-center gap-2 h-11 px-4 bg-primary-100 text-white-100 rounded-md leading-none transition-all duration-150 hover:brightness-125 font-medium"
                  >
                    <CircleHelp :size="18" :stroke-width="1.75" />
                    Help
                  </button>
                </div>
              </div>
            </div>
            <div class="max-w-full overflow-x-auto without-scrollbar">
              <table v-if="!contacts.empty" class="w-full">
                <thead>
                  <tr class="bg-[#F8F7FA] border-b border-border-100">
                    <th class="p-3 text-left text-heading-100 text-[15px] capitalize font-semibold">
                      Name
                    </th>
                    <th class="p-3 text-left text-heading-100 text-[15px] capitalize font-semibold">
                      Email
                    </th>
                    <th class="p-3 text-left text-heading-100 text-[15px] capitalize font-semibold">
                      Phone
                    </th>
                    <th class="p-3 text-left text-heading-100 text-[15px] capitalize font-semibold">
                      Address
                    </th>
                    <th class="p-3 text-left text-heading-100 text-[15px] capitalize font-semibold">
                      Date Added
                    </th>
                    <th class="p-3 text-left text-heading-100 text-[15px] capitalize font-semibold">
                      Last Updated
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-border-100">
                  <tr v-for="contact in contacts.content" :key="contact.id">
                    <td class="p-3 text-left font-medium text-[15px]">{{ contact.name || '-' }}</td>
                    <td class="p-3 text-left font-medium text-[15px]">
                      {{ contact.email || '-' }}
                    </td>
                    <td class="p-3 text-left font-medium text-[15px]">
                      {{ contact.phone || '-' }}
                    </td>
                    <td class="p-3 text-left font-medium text-[15px]">
                      {{ contact.address || '-' }}
                    </td>
                    <td class="p-3 text-left font-medium text-[15px]">
                      {{ formatDate(contact.created) }}
                    </td>
                    <td class="p-3 text-left font-medium text-[15px]">
                      {{ formatDate(contact.updated) }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div
                v-if="!loaderStore.loading && contacts.empty"
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
                    :class="[contacts.first ? 'pointer-events-none opacity-50' : '']"
                    class="flex items-center gap-2 h-11 px-4 bg-primary-100 text-white-100 rounded-md leading-none transition-all duration-150 hover:brightness-125 font-medium"
                    @click="prevPage"
                  >
                    <ArrowLeft :size="18" :stroke-width="1.75" class="mt-[2px]" />
                    Previous
                  </button>
                  <button
                    :class="[contacts.last ? 'pointer-events-none opacity-50' : '']"
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
      </div>
    </div>
    <div
      v-if="showUploadContactsModal"
      class="bg-opacity-40 fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-heading-100"
    >
      <div class="max-w-xl rounded-xl w-full mx-auto bg-white-100">
        <div class="flex items-center justify-between p-4 border-b border-border-100">
          <h5 class="font-semibold leading-none text-lg text-heading-100">Upload Contacts</h5>
          <span
            @click="closeUploadContactsModal"
            class="cursor-pointer transition-colors duration-100 hover:text-heading-100"
          >
            <X :size="24" :stroke-width="1.75" />
          </span>
        </div>
        <div class="without-scrollbar max-h-modal overflow-y-auto p-4">
          <div
            class="relative border border-dashed border-border-100 rounded-xl h-[280px] hover:border-primary-100 transition-all"
          >
            <input
              id="upload-contact"
              type="file"
              accept=".csv"
              class="hidden"
              @change="handleFileUpload"
            />
            <label
              for="upload-contact"
              class="absolute inset-0 cursor-pointer flex flex-col items-center justify-center text-center"
            >
              <span class="w-[120px] -mt-5">
                <svg
                  viewBox="0 0 173 173"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-full h-full"
                >
                  <path
                    d="M143.737 95.6949C145.677 89.2851 143.691 81.9055 139.584 76.7599C135.211 71.2814 128.406 67.9611 121.426 67.3235C114.445 66.6859 106.937 68.6091 100.92 72.2053C92.4437 54.9026 67.6873 50.3715 50.1256 65.9326C42.7395 72.4774 37.5485 80.3369 35.2819 89.9415C27.8162 89.2307 20.2598 93.1166 15.9024 99.2197C5.79705 113.374 11.8649 136.716 29.3052 141.151C35.7739 142.796 42.7237 142.838 49.3515 143.4C73.3259 145.463 121.123 151.259 144.068 140.858C155.765 135.556 165.92 122.251 160.485 108.985C159.077 105.547 156.489 102.599 153.309 100.69C151.555 99.6358 143.473 98.506 143.417 97.3003C143.392 96.7552 143.578 96.2214 143.737 95.6949Z"
                    fill="hsl(249.64deg 70.98% 37.84% / 30%)"
                  ></path>
                  <path
                    d="M157.038 97.4237C164.526 78.3978 152.438 56.3334 131.781 53.874C114.187 51.7794 97.1651 65.7836 95.8201 83.4535C94.3147 103.234 112.205 119.843 131.774 117.191C142.955 115.676 152.91 107.913 157.038 97.4237Z"
                    fill="#321ca5"
                  ></path>
                  <path
                    d="M128.646 73.6316C130.339 73.7115 131.64 75.052 131.554 76.6244C131.165 83.735 130.972 90.9488 130.983 98.067C130.985 99.6432 129.561 100.957 127.914 100.922C126.221 100.922 124.848 99.6489 124.846 98.0744C124.835 90.8579 125.03 83.544 125.425 76.3349C125.514 74.7271 127.005 73.5427 128.646 73.6316Z"
                    fill="white"
                  ></path>
                  <path
                    d="M129.878 70.7515C133.09 72.9676 136.297 76.8905 138.946 78.7169C140.342 79.6798 140.692 81.5907 139.73 82.985C138.768 84.3792 136.855 84.7297 135.463 83.7689C132.957 82.0418 130.679 79.5079 128.483 77.5064C126.853 79.2065 124.749 81.1562 122.123 83.4014C120.837 84.5021 118.899 84.3492 117.798 83.0638C116.697 81.7753 116.848 79.8386 118.136 78.737C121.694 75.6946 124.254 73.2115 125.744 71.3559C126.742 70.1137 128.543 69.8314 129.878 70.7515Z"
                    fill="white"
                  ></path>
                  <path
                    d="M43.3921 87.5078C42.9836 87.3619 42.7701 86.9134 42.916 86.5034C48.5393 70.7126 64.7471 61.0263 81.4156 63.6942C81.8441 63.7633 82.1359 64.1673 82.0683 64.5958C81.9977 65.0258 81.5861 65.3084 81.1668 65.2485C65.3337 62.7134 49.7976 71.8714 44.3966 87.0317C44.2491 87.4483 43.7867 87.6532 43.3921 87.5078Z"
                    fill="#111"
                  ></path>
                  <path
                    d="M101.669 139.097C101.234 139.087 100.892 138.726 100.903 138.291C100.913 137.858 101.319 137.511 101.709 137.525C116.36 137.893 132.299 138.175 144.202 128.707C144.546 128.438 145.039 128.494 145.308 128.833C145.578 129.174 145.521 129.669 145.182 129.939C132.979 139.642 116.678 139.481 101.669 139.097Z"
                    fill="#111"
                  ></path>
                  <path
                    d="M113.827 49.6081C110.302 46.4104 105.379 44.6856 100.603 44.9851C99.752 45.025 98.9887 44.3831 98.9334 43.5153C98.8781 42.6491 99.5355 41.9011 100.403 41.8458C106.072 41.4895 111.735 43.4615 115.94 47.2797C116.584 47.8633 116.631 48.857 116.048 49.5006C115.465 50.1432 114.471 50.1932 113.827 49.6081Z"
                    fill="#111"
                  ></path>
                  <path
                    d="M115.693 42.2542C113.229 37.9015 111.085 33.3216 109.321 28.6387C109.013 27.8262 109.425 26.9185 110.237 26.6129C111.048 26.3073 111.958 26.7173 112.263 27.5298C113.971 32.0606 116.046 36.4931 118.43 40.7029C118.858 41.4601 118.593 42.4185 117.837 42.847C117.069 43.279 116.115 42.9999 115.693 42.2542Z"
                    fill="#111"
                  ></path>
                  <path
                    d="M122.845 44.5045C120.663 38.6252 121.759 31.6432 125.641 26.7176C126.18 26.0388 127.17 25.9221 127.849 26.4565C128.531 26.9941 128.648 27.9832 128.11 28.6651C124.894 32.7474 123.983 38.5361 125.794 43.411C126.097 44.225 125.682 45.1296 124.867 45.4322C124.075 45.7298 123.153 45.3355 122.845 44.5045Z"
                    fill="#111"
                  ></path>
                  <path
                    d="M25.2762 132.285C20.1925 129.681 16.832 124.095 16.9134 118.385C16.9196 117.953 17.2698 117.609 17.6998 117.609H17.7105C18.1452 117.616 18.4923 117.973 18.4862 118.406C18.414 123.533 21.4304 128.548 25.9919 130.884C26.379 131.082 26.5326 131.557 26.3344 131.942C26.1316 132.337 25.6535 132.478 25.2762 132.285Z"
                    fill="#111"
                  ></path></svg
              ></span>
              <span class="text-heading-100 font-medium block mb-1">Drop or select file</span>
              <span
                >Drop file here or click
                <span class="text-heading-100 font-medium">Browse</span> thorough your machine</span
              >
            </label>
          </div>
          <div class="grid gap-4 mt-4">
            <div
              v-if="upload.selectedCSV"
              class="border border-border-100 rounded-md flex items-center justify-between p-3"
            >
              <div class="flex items-center gap-2">
                <svg
                  fill="currentColor"
                  viewBox="0 0 256 256"
                  class="h-6 w-6 mt-[1px]"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M48,180c0,11,7.18,20,16,20a14.24,14.24,0,0,0,10.22-4.66A8,8,0,0,1,85.78,206.4,30.06,30.06,0,0,1,64,216c-17.65,0-32-16.15-32-36s14.35-36,32-36a30.06,30.06,0,0,1,21.78,9.6,8,8,0,0,1-11.56,11.06A14.24,14.24,0,0,0,64,160C55.18,160,48,169,48,180Zm79.6-8.69c-4-1.16-8.14-2.35-10.45-3.84-1.25-.81-1.23-1-1.12-1.9a4.57,4.57,0,0,1,2-3.67c4.6-3.12,15.34-1.73,19.82-.56A8,8,0,0,0,142,145.86c-2.12-.55-21-5.22-32.84,2.76a20.58,20.58,0,0,0-9,14.95c-2,15.88,13.65,20.41,23,23.11,12.06,3.49,13.12,4.92,12.78,7.59-.31,2.41-1.26,3.34-2.14,3.93-4.6,3.06-15.17,1.56-19.55.36A8,8,0,0,0,109.94,214a61.34,61.34,0,0,0,15.19,2c5.82,0,12.3-1,17.49-4.46a20.82,20.82,0,0,0,9.19-15.23C154,179,137.49,174.17,127.6,171.31Zm83.09-26.84a8,8,0,0,0-10.23,4.84L188,184.21l-12.47-34.9a8,8,0,0,0-15.07,5.38l20,56a8,8,0,0,0,15.07,0l20-56A8,8,0,0,0,210.69,144.47ZM216,88v24a8,8,0,0,1-16,0V96H152a8,8,0,0,1-8-8V40H56v72a8,8,0,0,1-16,0V40A16,16,0,0,1,56,24h96a8,8,0,0,1,5.66,2.34l56,56A8,8,0,0,1,216,88Zm-27.31-8L160,51.31V80Z"
                  ></path>
                </svg>
                <span class="block truncate">{{ upload.selectedCSV.name }}</span>
              </div>
              <span @click="upload.selectedCSV = null" class="cursor-pointer hover:text-danger-100"
                ><Trash2 :size="20" :stroke-width="1.75"
              /></span>
            </div>
            <button
              @click="uploadCSV"
              :class="[!upload.selectedCSV ? 'pointer-events-none opacity-50' : '']"
              class="flex items-center justify-center gap-2 h-11 px-4 bg-primary-100 text-white-100 rounded-md leading-none transition-all duration-150 hover:brightness-125 font-medium"
            >
              <Upload :size="18" :stroke-width="1.75" />
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="showHelpModal"
      class="bg-opacity-40 fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-heading-100"
    >
      <div class="max-w-7xl rounded-xl w-full mx-auto bg-white-100">
        <div class="flex items-center justify-between p-4 border-b border-border-100">
          <h5 class="font-semibold leading-none text-lg text-heading-100">Help</h5>
          <span
            @click="showHelpModal = false"
            class="cursor-pointer transition-colors duration-100 hover:text-heading-100"
          >
            <X :size="24" :stroke-width="1.75" />
          </span>
        </div>
        <div class="without-scrollbar max-h-modal overflow-y-auto p-4">
          <div class="grid gap-2">
            <div class="border border-border-100 overflow-hidden rounded-xl bg-white-100">
              <div
                @click="activeTab = activeTab === 0 ? null : 0"
                class="p-4 flex items-center justify-between cursor-pointer"
              >
                <h2 class="text-lg font-semibold text-heading-100">
                  Outbound Calling System Standards
                </h2>
                <span
                  class="transition-transform duration-100 transform"
                  :class="[activeTab === 0 ? 'rotate-180' : '']"
                >
                  <ChevronDown :size="22" :stroke-width="1.75" />
                </span>
              </div>
              <div v-if="activeTab === 0" class="grid gap-2 border-t border-border-100 p-4">
                <p>
                  To ensure the effectiveness, compliance, and quality of our outbound calling
                  system, the following standards and metrics have been defined. These standards
                  promote responsible practices and maintain the integrity of our calling platform
                  while optimizing performance and minimizing issues like call fatigue or regulatory
                  non-compliance.
                </p>
                <h3 class="text-lg font-semibold text-heading-100">Key Definitions</h3>
                <ul class="grid gap-1.5 list-decimal pl-4">
                  <li>
                    <span class="font-medium text-heading-100">Remove from List</span>: When a
                    recipient opts out of receiving further calls, either by explicit request or
                    through our platform’s opt-out mechanism.
                  </li>
                  <li>
                    <span class="font-medium text-heading-100">Do Not Contact (DNC) List</span>: A
                    higher-priority exclusion list that permanently removes recipients from any
                    future calls. This includes users who explicitly request not to be contacted or
                    fall under regulatory mandates (e.g., TCPA or local DNC laws).
                  </li>
                  <li>
                    <span class="font-medium text-heading-100">Voicemail</span>: Calls that reach
                    the recipient’s voicemail without a live connection.
                  </li>
                  <li>
                    <span class="font-medium text-heading-100">User Hang-Up</span>: Calls where the
                    recipient hangs up before a meaningful conversation begins.
                  </li>
                  <li>
                    <span class="font-medium text-heading-100">No Connection (Bounce)</span>: Calls
                    that fail to connect due to invalid numbers, network issues, or disconnected
                    lines.
                  </li>
                </ul>
                <h3 class="text-lg font-semibold text-heading-100">Metrics and Thresholds</h3>
                <p>
                  Below is a table of metrics to monitor performance and compliance for the outbound
                  calling system
                </p>
                <div class="bg-white-100 my-1">
                  <div class="border border-border-100 rounded-xl overflow-hidden">
                    <div class="max-w-full overflow-x-auto without-scrollbar">
                      <table class="w-full">
                        <thead>
                          <tr class="bg-[#F8F7FA] border-b border-border-100">
                            <th
                              class="p-3 text-left text-heading-100 text-[15px] capitalize font-semibold"
                            >
                              Metric
                            </th>
                            <th
                              class="p-3 text-left text-heading-100 text-[15px] capitalize font-semibold"
                            >
                              Description
                            </th>
                            <th
                              class="p-3 text-left text-heading-100 text-[15px] capitalize font-semibold"
                            >
                              Threshold
                            </th>
                          </tr>
                        </thead>
                        <tbody class="divide-y divide-border-100">
                          <tr>
                            <td class="p-3 text-left font-medium text-[15px]">Remove from List</td>
                            <td class="p-3 text-left font-medium text-[15px]">
                              Users who choose to opt-out of receiving calls from the system. This
                              action is similar to an "unsubscribe" in email campaigns.
                            </td>
                            <td class="p-3 text-left font-medium text-[15px]">
                              Less than 1% per campaign
                            </td>
                          </tr>
                          <tr>
                            <td class="p-3 text-left font-medium text-[15px]">
                              Do Not Contact (DNC)
                            </td>
                            <td class="p-3 text-left font-medium text-[15px]">
                              Users who explicitly request not to be contacted again. These requests
                              are critical and must be respected immediately.
                            </td>
                            <td class="p-3 text-left font-medium text-[15px]">Zero tolerance</td>
                          </tr>
                          <tr>
                            <td class="p-3 text-left font-medium text-[15px]">Voicemail Reached</td>
                            <td class="p-3 text-left font-medium text-[15px]">
                              Calls that are answered by voicemail systems instead of a live
                              recipient.
                            </td>
                            <td class="p-3 text-left font-medium text-[15px]">
                              No hard limit, but monitored for patterns
                            </td>
                          </tr>
                          <tr>
                            <td class="p-3 text-left font-medium text-[15px]">User Hang-Up</td>
                            <td class="p-3 text-left font-medium text-[15px]">
                              Calls where the user hangs up before completing the interaction.
                            </td>
                            <td class="p-3 text-left font-medium text-[15px]">
                              Less than 5% per campaign
                            </td>
                          </tr>
                          <tr>
                            <td class="p-3 text-left font-medium text-[15px]">Call Bounce</td>
                            <td class="p-3 text-left font-medium text-[15px]">
                              Calls that fail to connect due to invalid numbers or network issues.
                            </td>
                            <td class="p-3 text-left font-medium text-[15px]">
                              Less than 2% per campaign
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <p>
                  By adhering to these standards, the system ensures high-quality interactions and
                  compliance with regulations while improving the overall efficiency of outbound
                  calling campaigns.
                </p>
              </div>
            </div>
            <div class="border border-border-100 overflow-hidden rounded-xl bg-white-100">
              <div
                @click="activeTab = activeTab === 1 ? null : 1"
                class="p-4 flex items-center justify-between cursor-pointer"
              >
                <h2 class="text-lg font-semibold text-heading-100">
                  Compliance and Best Practices
                </h2>
                <span
                  class="transition-transform duration-100 transform"
                  :class="[activeTab === 1 ? 'rotate-180' : '']"
                >
                  <ChevronDown :size="22" :stroke-width="1.75" />
                </span>
              </div>
              <div v-if="activeTab === 1" class="grid gap-2 border-t border-border-100 p-4">
                <ul class="grid gap-1.5 list-decimal pl-4">
                  <li>
                    <span class="font-medium text-heading-100"
                      >Adhere to Local and Federal Laws</span
                    >: Ensure all calls comply with applicable laws, including TCPA, GDPR, and
                    CAN-SPAM-like regulations for calls.
                  </li>
                  <li>
                    <span class="font-medium text-heading-100">Easy Opt-Out Options</span>: Provide
                    recipients with a straightforward way to opt out or request to be added to the
                    DNC list.
                  </li>
                  <li>
                    <span class="font-medium text-heading-100">Call Timing</span>: Regularly clean
                    and validate calling lists to reduce bounces and improve efficiency.
                  </li>
                  <li>
                    <span class="font-medium text-heading-100">Training</span>: Avoid calling during
                    restricted hours to maintain compliance and minimize negative responses.
                  </li>
                  <li>
                    <span class="font-medium text-heading-100">No Connection (Bounce)</span>: Ensure
                    that agents are trained on proper communication etiquette and compliance
                    requirements.
                  </li>
                </ul>
              </div>
            </div>
            <div class="border border-border-100 overflow-hidden rounded-xl bg-white-100">
              <div
                @click="activeTab = activeTab === 2 ? null : 2"
                class="p-4 flex items-center justify-between cursor-pointer"
              >
                <h2 class="text-lg font-semibold text-heading-100">Monitoring and Reporting</h2>
                <span
                  class="transition-transform duration-100 transform"
                  :class="[activeTab === 2 ? 'rotate-180' : '']"
                >
                  <ChevronDown :size="22" :stroke-width="1.75" />
                </span>
              </div>
              <div v-if="activeTab === 2" class="grid gap-2 border-t border-border-100 p-4">
                <ul class="grid gap-1.5 list-decimal pl-4">
                  <li>
                    Campaigns will be monitored in real-time to ensure adherence to these
                    thresholds.
                  </li>
                  <li>
                    Weekly and monthly reports will highlight any deviations, along with recommended
                    corrective actions.
                  </li>
                </ul>
              </div>
            </div>
            <div class="border border-border-100 overflow-hidden rounded-xl bg-white-100">
              <div
                @click="activeTab = activeTab === 3 ? null : 3"
                class="p-4 flex items-center justify-between cursor-pointer"
              >
                <h2 class="text-lg font-semibold text-heading-100">
                  TalkForce AI VoiceReach Abuse Policy
                </h2>
                <span
                  class="transition-transform duration-100 transform"
                  :class="[activeTab === 3 ? 'rotate-180' : '']"
                >
                  <ChevronDown :size="22" :stroke-width="1.75" />
                </span>
              </div>
              <div v-if="activeTab === 3" class="grid gap-2 border-t border-border-100 p-4">
                <h3 class="text-lg font-semibold text-heading-100">
                  TalkForce AI VoiceReach Abuse Policy and Suspension Guidelines
                </h3>
                <p>
                  At TalkForce AI VoiceReach, we strive to provide a seamless and ethical platform
                  for outbound calling campaigns. However, maintaining trust and compliance with
                  industry standards is crucial to the success of our service and our users. Below
                  is an explanation of our abuse policy, thresholds, and how we handle incidents to
                  ensure optimal platform performance and compliance.
                </p>
                <h3 class="text-lg font-semibold text-heading-100">What is an Abuse Alert?</h3>
                <p>
                  An abuse alert is a notification that your calling campaigns have triggered
                  complaints or crossed key performance thresholds. While a few complaints or
                  problematic calls are expected in high-volume campaigns, repeated or excessive
                  violations signal deeper issues that must be addressed. If you receive an abuse
                  alert, take it as an early warning to review and optimize your calling strategies.
                  Continuous alerts may lead to stricter measures, including account suspension, to
                  protect the platform’s integrity and compliance.
                </p>
                <h3 class="text-lg font-semibold text-heading-100">Thresholds for Action</h3>
                <p>
                  To ensure compliance and prevent negative impacts on the platform, we monitor
                  various metrics in your outbound calling campaigns. Here are the key thresholds
                  that could trigger alerts or actions
                </p>
                <p>
                  <span class="font-medium text-heading-100"
                    >Metric Definition Threshold Remove from List</span
                  >
                  Contacts who opt out from receiving further calls. &lt;3% per campaign
                  <span class="font-medium text-heading-100">DNC (Do Not Contact)</span> Contacts
                  who explicitly request never to be contacted again. &lt;1% per campaign
                  <span class="font-medium text-heading-100">Voicemail Rates</span>
                  Calls that reach voicemail instead of connecting to the recipient. Informational
                  only, no specific threshold
                  <span class="font-medium text-heading-100">Hang-Up Rates</span> Calls where the
                  recipient hangs up before meaningful engagement. &lt;10% per campaign
                  <span class="font-medium text-heading-100">Call Bounce Rate</span>
                  Calls that fail to connect due to invalid or unavailable numbers. &lt;5% per
                  campaign
                  <span class="font-medium text-heading-100">Complaint Rate</span> Contacts
                  reporting abuse, spam, or unwanted communication. &lt;0.1% per campaign
                </p>
                <h3 class="text-lg font-semibold text-heading-100">
                  What Happens When You Exceed a Threshold?
                </h3>
                <ul class="grid gap-1.5 list-decimal pl-4">
                  <li>
                    <span class="font-medium text-heading-100">Initial Alert</span>:
                    <ul class="list-disc pl-4 mt-1">
                      <li>
                        If any metric exceeds the established threshold, you will receive a
                        notification detailing the issue. This is an opportunity to identify and
                        resolve problems in your campaign.
                      </li>
                    </ul>
                  </li>
                  <li>
                    <span class="font-medium text-heading-100">Warning Notice</span>:
                    <ul class="list-disc pl-4 mt-1">
                      <li>
                        Repeated threshold violations will result in a formal warning. You may be
                        asked to provide details about your contact acquisition methods, compliance
                        practices, and audience engagement strategy.
                      </li>
                    </ul>
                  </li>
                  <li>
                    <span class="font-medium text-heading-100">Account Suspension</span>:
                    <ul class="list-disc pl-4 mt-1">
                      <li>
                        If thresholds are exceeded significantly or repeatedly, your account will be
                        temporarily suspended. During this period:
                        <ul class="list-decimal pl-4 mt-1 grid gap-1">
                          <li>Outbound calling will be disabled.</li>
                          <li>Access to data, logs, and analytics will remain available.</li>
                          <li>Our compliance team will initiate an investigation.</li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
                <h3 class="text-lg font-semibold text-heading-100">
                  Common Causes of Alerts or Suspensions
                </h3>
                <p>Even legitimate campaigns can trigger abuse alerts due to</p>
                <ul class="grid gap-1.5 list-decimal pl-4">
                  <li>Poor quality contact lists (e.g., outdated or purchased data).</li>
                  <li>Misleading or aggressive call scripts.</li>
                  <li>Lack of clear opt-out mechanisms during calls.</li>
                  <li>Calling contacts who are already on a DNC list.</li>
                  <li>High call volume with low engagement rates.</li>
                </ul>
                <h3 class="text-lg font-semibold text-heading-100">
                  Best Practices to Avoid Alerts
                </h3>
                <ul class="grid gap-1.5 list-decimal pl-4">
                  <li>
                    <span class="text-heading-100 font-medium">Use Verified Contact Lists</span>:
                    Ensure all numbers are valid and opted-in for contact.
                  </li>
                  <li>
                    <span class="text-heading-100 font-medium">Respect DNC Requests</span>: Promptly
                    honor all "Do Not Contact" requests.
                  </li>
                  <li>
                    <span class="text-heading-100 font-medium">Monitor Campaign Performance</span>:
                    Regularly review metrics such as hang-up rates and bounces.
                  </li>
                  <li>
                    <span class="text-heading-100 font-medium">Provide Clear Opt-Out Options</span>:
                    Make it easy for recipients to opt out during calls.
                  </li>
                  <li>
                    <span class="text-heading-100 font-medium">Test Call Scripts</span>: Use
                    non-aggressive, transparent language in your calls.
                  </li>
                </ul>
                <h3 class="text-lg font-semibold text-heading-100">How We Handle Investigations</h3>
                <p>When an account suspension occurs, our compliance team will</p>
                <ul class="grid gap-1.5 list-decimal pl-4">
                  <li>Request details about your contact collection process.</li>
                  <li>Analyze the performance data of your campaigns.</li>
                  <li>Offer recommendations to bring your campaigns into compliance.</li>
                </ul>
                <p>
                  Once the investigation concludes, your account may be reinstated with stricter
                  monitoring or additional training resources to improve campaign practices.
                </p>
                <h3 class="text-lg font-semibold text-heading-100">
                  Our Commitment to Your Success
                </h3>
                <p>
                  We understand that mistakes happen, and we are here to help. Our goal is to
                  provide the tools and guidance necessary to maintain a high-performing, compliant
                  outbound calling strategy. If you have questions or need assistance, our support
                  team is always available.
                </p>
                <p>
                  By adhering to these standards, you help ensure that TalkForce AI VoiceReach
                  remains a trusted and effective platform for all users.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import {
  Plus,
  Filter,
  ChevronDown,
  Download,
  X,
  Trash2,
  Upload,
  ArrowRight,
  ArrowLeft,
  CircleHelp,
} from 'lucide-vue-next'
import ApiRequest from '@/libs/ApiRequest'
import moment from 'moment'
import { useLoaderStore } from '@/stores/loader'
import { useToastStore } from '@/stores/toast'
import Topbar from '@/components/Topbar.vue'
export default {
  name: 'ContactsPage',
  components: {
    Topbar,
    Plus,
    Filter,
    ChevronDown,
    Download,
    X,
    Trash2,
    Upload,
    ArrowRight,
    ArrowLeft,
    CircleHelp,
  },
  setup() {
    const loaderStore = useLoaderStore()
    const toastStore = useToastStore()
    return { loaderStore, toastStore }
  },
  data() {
    return {
      showUploadContactsModal: false,
      upload: {
        selectedCSV: null,
      },
      searchQuery: '',
      contacts: {
        content: [],
        empty: false,
        first: true,
        last: true,
        totalPickupCalls: 0,
        totalElements: 0,
      },
      activeTab: null,
      currentPage: 0,
      showHelpModal: false,
      timeout: null,
    }
  },
  mounted() {
    this.loadContacts()
  },
  methods: {
    async loadContacts() {
      this.loaderStore.setIsLoading(true)
      try {
        let queries = {
          page: this.currentPage,
          q: this.searchQuery,
        }
        queries = new URLSearchParams(queries).toString()
        const { data } = await ApiRequest().get(`/api/v1/contacts/list?${queries}`)
        this.contacts = data
      } catch (e) {
        this.toastStore.show(e, 'error')
      } finally {
        this.loaderStore.setIsLoading(false)
      }
    },
    formatDate(value) {
      if (!value) return '-'
      return moment(value).format('MM/DD/YYYY')
    },
    handleFileUpload(event) {
      const file = event.target.files[0]
      if (!file) {
        this.upload.selectedCSV = null
        return
      }
      if (!file.name.toLowerCase().endsWith('.csv')) {
        this.upload.selectedCSV = null
        return
      }
      this.upload.selectedCSV = file
    },
    closeUploadContactsModal() {
      this.showUploadContactsModal = false
      this.upload = {
        selectedCSV: null,
      }
    },
    async uploadCSV() {
      this.loaderStore.setIsLoading(true)
      try {
        const payload = {
          contacts: this.upload.selectedCSV,
        }
        const { data } = await ApiRequest().post(`/api/v1/contacts/upload`, payload, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        this.loadContacts()
        this.toastStore.show('Contacts uploaded successfully!', 'success')
        this.closeUploadContactsModal()
      } catch (e) {
        this.toastStore.show(e, 'error')
      } finally {
        this.loaderStore.setIsLoading(false)
      }
    },
    async exportCSV() {
      this.loaderStore.setIsLoading(true)
      try {
        let queries = {
          page: this.currentPage,
          q: this.searchQuery,
        }
        queries = new URLSearchParams(queries).toString()
        const { data } = await ApiRequest().get(`/api/v1/contacts/export?${queries}`)
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
    prevPage() {
      this.currentPage -= 1
      this.loadCallLogs()
    },
    nextPage() {
      this.currentPage += 1
      this.loadCallLogs()
    },
    searchBy() {
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
      this.timeout = setTimeout(() => {
        this.loadContacts()
      }, 500)
    },
    clearFilters() {
      this.searchQuery = ''
      this.currentPage = 0
      this.loadContacts()
    },
  },
}
</script>
