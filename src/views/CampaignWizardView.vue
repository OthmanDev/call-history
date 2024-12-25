<template>
  <Topbar :title="'Create New Campaign'"></Topbar>
  <main class="min-h-screen">
    <div class="p-6">
      <div class="rounded-xl bg-white-100 border border-border-100 overflow-hidden">
        <div class="border-b border-border-100 flex items-center p-4 space-x-8">
          <template v-for="stepNumber in 4" :key="stepNumber">
            <div
              class="flex items-center gap-2"
              :class="[step === stepNumber ? 'text-primary-100 font-medium' : '']"
            >
              <span
                class="w-[22px] h-[22px] flex items-center justify-center rounded-full text-sm"
                :class="[
                  step === stepNumber
                    ? 'bg-primary-100 font-medium text-white-100'
                    : 'bg-border-100 text-heading-100',
                ]"
                >{{ stepNumber }}</span
              >
              {{ stepTitles[stepNumber - 1] }}
            </div>
          </template>
        </div>
        <div class="p-4">
          <!-- Step 1: Campaign Details -->
          <div v-if="step === 1" class="grid grid-cols-2 gap-4">
            <div class="flex-1">
              <label class="text-[15px] mb-1 font-medium block">Campaign Name</label>
              <input
                v-model="campaignData.name"
                class="border border-border-100 w-full h-11 outline-none px-4 text-heading-100 rounded-md"
                placeholder="Enter campaign name"
              />
            </div>
            <div class="flex-1">
              <label class="text-[15px] mb-1 font-medium block">Campaign Type</label>
              <div class="relative flex items-center border border-border-100 rounded-md">
                <select
                  v-model="campaignData.type"
                  class="w-full h-11 outline-none px-4 appearance-none cursor-pointer text-heading-100 rounded-md"
                >
                  <option value="">Select campaign type</option>
                  <option value="seller">Seller Outreach</option>
                  <option value="buyer">Buyer Follow-up</option>
                </select>
                <span
                  class="absolute top-0 right-0 bottom-0 w-[40px] bg-white-100 pointer-events-none flex items-center justify-center rounded-tr-md rounded-br-md"
                >
                  <ChevronDown :size="18" :stroke-width="1.75" />
                </span>
              </div>
            </div>
            <div class="col-span-2">
              <div class="">
                <label class="text-[15px] mb-1 font-medium block">Description</label>
                <textarea
                  v-model="campaignData.description"
                  class="border border-border-100 w-full outline-none py-2 px-4 text-heading-100 rounded-md"
                  rows="4"
                  placeholder="Enter campaign description"
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Step 2: Contact List -->
          <div v-else-if="step === 2" class="grid gap-4">
            <div
              class="relative border-2 border-dashed border-border-100 rounded-xl h-[280px] hover:border-primary-100 transition-all"
            >
              <input
                id="upload-contact"
                type="file"
                accept=".csv,.xlsx,.txt"
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
                <span class="text-heading-100 font-medium block mb-1"
                  >Drop or select contact list</span
                >
                <span
                  >Drop file here or click
                  <span class="text-heading-100 font-medium">Browse</span> thorough your
                  machine</span
                >
              </label>
            </div>

            <div class="rounded-xl bg-white-100 border border-border-100">
              <div class="border-b border-border-100 p-4">
                <span class="text-base font-semibold text-heading-100">Required Fields</span>
              </div>
              <div class="p-4">
                <div class="grid grid-cols-4 gap-4">
                  <div
                    v-for="field in requiredFields"
                    :key="field.name"
                    class="border border-border-100 flex items-center h-11 outline-none px-4 text-heading-100 rounded-md"
                  >
                    <div class="checkbox">
                      <input
                        :id="field.name"
                        type="checkbox"
                        v-model="field.checked"
                        :disabled="field.required"
                      />
                      <label :for="field.name">
                        <Check
                          :size="15"
                          :stroke-width="2"
                          class="absolute top-[2.5px] left-[2.5px] hidden stroke-white-100"
                        />{{ field.label }}</label
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 3: Voice & Script -->
          <div v-else-if="step === 3" class="grid gap-4">
            <audio :src="currentVoice?.preview_audio_url" class="hidden" @ended="handleAudioEnd" />
            <div class="flex-1">
              <div class="flex items-center justify-between mb-1 gap-2">
                <label class="text-[15px] font-medium block">Voice Selection</label>
              </div>
              <div class="relative flex items-center border border-border-100 rounded-md">
                <select
                  @change="setCurrentVoice"
                  class="w-full h-11 outline-none px-4 appearance-none cursor-pointer text-heading-100 rounded-md"
                >
                  <option value="">Select AI voice</option>
                  <option v-for="voice in voices" :key="voice.voice_id" :value="voice.voice_id">
                    {{ voice.voice_name }}
                  </option>
                </select>
                <span
                  class="absolute top-0 right-0 bottom-0 w-[40px] bg-white-100 pointer-events-none flex items-center justify-center rounded-tr-md rounded-br-md"
                >
                  <ChevronDown :size="18" :stroke-width="1.75" />
                </span>
                <button
                  title="Preview Voice"
                  class="absolute top-0 right-0 bottom-0 w-[40px] bg-white-100 flex items-center justify-center rounded-tr-md rounded-br-md"
                  v-if="currentVoice"
                  @click="showVoicePreview = true"
                >
                  <Eye :size="20" :stroke-width="1.75" />
                </button>
              </div>
            </div>
            <div class="flex-1">
              <label class="text-[15px] mb-1 font-medium block">Script Template</label>
              <textarea
                v-model="campaignData.scriptTemplate"
                class="border border-border-100 w-full outline-none py-2 px-4 text-heading-100 rounded-md"
                rows="4"
                placeholder="Enter your script template. Use {name} for personalization."
              ></textarea>
              <p class="text-sm mt-1">Available variables: {name}, {company}, {location}</p>
            </div>
            <div
              v-if="showVoicePreview"
              class="bg-opacity-40 fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-heading-100"
            >
              <div class="max-w-xl rounded-xl w-full mx-auto bg-white-100">
                <div class="flex items-center justify-between p-4 border-b border-border-100">
                  <h5 class="font-semibold leading-none text-lg text-heading-100">
                    {{ currentVoice.voice_name }} Preview
                  </h5>
                  <span
                    @click="closeVoicePreview"
                    class="cursor-pointer transition-colors duration-100 hover:text-heading-100"
                  >
                    <X :size="24" :stroke-width="1.75" />
                  </span>
                </div>
                <div class="without-scrollbar max-h-modal overflow-y-auto p-4">
                  <div class="border border-border-100 rounded-xl p-4">
                    <div class="flex justify-between xs:flex-col xs:gap-4">
                      <div class="flex flex-1 items-center gap-4">
                        <div class="flex-1">
                          <h4 class="text-lg font-semibold text-heading-100 leading-none">
                            {{ currentVoice.voice_name }}
                          </h4>
                          <span class="text-[15px] font-medium mt-2 block capitalize"
                            >{{ currentVoice.accent }}, {{ currentVoice.age }},
                            {{ currentVoice.gender }}</span
                          >
                        </div>
                      </div>
                      <div class="flex">
                        <button
                          v-if="!isVoicePlaying"
                          @click="playVoice"
                          class="w-[34px] h-[34px] border border-border-100 rounded-md flex items-center justify-center transition-all hover:bg-primary-100 hover:bg-opacity-10 hover:border-primary-100 hover:border-opacity-10 hover:text-primary-100"
                          title="Play Voice"
                        >
                          <Play :size="18" />
                        </button>
                        <button
                          v-else
                          @click="pauseVoice"
                          class="w-[34px] h-[34px] border border-border-100 rounded-md flex items-center justify-center transition-all hover:bg-primary-100 hover:bg-opacity-10 hover:border-primary-100 hover:border-opacity-10 hover:text-primary-100"
                          title="Play Voice"
                        >
                          <Pause :size="18" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 4: Campaign Settings -->
          <div v-else-if="step === 4" class="grid grid-cols-3 gap-4">
            <div>
              <span class="text-[15px] font-medium block mb-1">Maximum call attempts</span>
              <div class="relative flex items-center border border-border-100 rounded-md">
                <select
                  v-model="campaignData.maxAttempts"
                  class="w-full h-11 outline-none px-4 appearance-none cursor-pointer text-heading-100 rounded-md"
                >
                  <option value="">Select maximum call attempts</option>
                  <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
                </select>
                <span
                  class="absolute top-0 right-0 bottom-0 w-[40px] bg-white-100 pointer-events-none flex items-center justify-center rounded-tr-md rounded-br-md"
                >
                  <ChevronDown :size="18" :stroke-width="1.75" />
                </span>
              </div>
            </div>
            <div>
              <span class="text-[15px] font-medium block mb-1">Retry interval (hours)</span>
              <div class="relative flex items-center border border-border-100 rounded-md">
                <select
                  v-model="campaignData.retryInterval"
                  class="w-full h-11 outline-none px-4 appearance-none cursor-pointer text-heading-100 rounded-md"
                >
                  <option value="">Select retry interval (hours)</option>
                  <option v-for="n in [4, 8, 12, 24, 48]" :key="n" :value="n">{{ n }}</option>
                </select>
                <span
                  class="absolute top-0 right-0 bottom-0 w-[40px] bg-white-100 pointer-events-none flex items-center justify-center rounded-tr-md rounded-br-md"
                >
                  <ChevronDown :size="18" :stroke-width="1.75" />
                </span>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <div class="flex-1">
                <span class="text-[15px] font-medium block mb-1">Call window Min</span>
                <div class="relative flex-1 flex items-center border border-border-100 rounded-md">
                  <select
                    v-model="campaignData.callWindowMin"
                    class="w-full h-11 outline-none px-4 appearance-none cursor-pointer text-heading-100 rounded-md"
                  >
                    <option value="">Select call window min</option>
                    <option v-for="n in timeOptions" :key="n" :value="n">{{ n }}:00</option>
                  </select>
                  <span
                    class="absolute top-0 right-0 bottom-0 w-[40px] bg-white-100 pointer-events-none flex items-center justify-center rounded-tr-md rounded-br-md"
                  >
                    <ChevronDown :size="18" :stroke-width="1.75" />
                  </span>
                </div>
              </div>
              <div class="flex-1">
                <span class="text-[15px] font-medium block mb-1">Call window Max</span>
                <div class="relative flex-1 flex items-center border border-border-100 rounded-md">
                  <select
                    v-model="campaignData.callWindowMax"
                    class="w-full h-11 outline-none px-4 appearance-none cursor-pointer text-heading-100 rounded-md"
                  >
                    <option value="">Select call window max</option>
                    <option v-for="n in timeOptions" :key="n" :value="n">{{ n }}:00</option>
                  </select>
                  <span
                    class="absolute top-0 right-0 bottom-0 w-[40px] bg-white-100 pointer-events-none flex items-center justify-center rounded-tr-md rounded-br-md"
                  >
                    <ChevronDown :size="18" :stroke-width="1.75" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <div class="border-t-4 rounded-bl-xl rounded-br-xl bg-white-100 border-border-100">
          <div class="flex items-center px-4 py-3 justify-between">
            <nav class="flex items-center gap-2">
              <button
                :class="[step === 1 ? 'pointer-events-none opacity-50' : '']"
                class="flex items-center gap-2 h-11 px-4 bg-primary-100 text-white-100 rounded-md leading-none transition-all duration-150 hover:brightness-125 font-medium"
                @click="previousStep"
              >
                <ArrowLeft :size="18" :stroke-width="1.75" class="mt-[2px]" />
                Previous
              </button>
              <button
                class="flex items-center gap-2 h-11 px-4 bg-primary-100 text-white-100 rounded-md leading-none transition-all duration-150 hover:brightness-125 font-medium"
                @click="nextStep"
              >
                <Plus v-if="step === 4" :size="18" :stroke-width="1.75" class="mt-[2px]" />
                {{ step === 4 ? 'Create Campaign' : 'Next' }}
                <ArrowRight v-if="step < 4" :size="18" :stroke-width="1.75" class="mt-[2px]" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import {
  ArrowLeft,
  ArrowRight,
  Plus,
  ChevronDown,
  Check,
  Play,
  Pause,
  Eye,
  X,
} from 'lucide-vue-next'
import Topbar from '@/components/Topbar.vue'
import { useLoaderStore } from '@/stores/loader'
import { useToastStore } from '@/stores/toast'
import ApiRequest from '@/libs/ApiRequest'
export default {
  name: 'CampaignWizard',
  components: {
    ArrowLeft,
    ArrowRight,
    Plus,
    ChevronDown,
    Check,
    Play,
    Pause,
    Eye,
    X,
    Topbar,
  },
  setup() {
    const loaderStore = useLoaderStore()
    const toastStore = useToastStore()
    return { loaderStore, toastStore }
  },
  data() {
    return {
      step: 1,
      stepTitles: ['Campaign Details', 'Contact List', 'Voice & Script', 'Campaign Settings'],
      campaignData: {
        name: '',
        type: '',
        description: '',
        contactListId: '',
        voiceId: '',
        scriptTemplate: '',
        maxAttempts: '',
        retryInterval: '',
        callWindowMin: '',
        callWindowMax: '',
      },
      requiredFields: [
        { name: 'phone', label: 'Phone Number', checked: true, required: true },
        { name: 'name', label: 'Name', checked: true, required: true },
        { name: 'email', label: 'Email', checked: false, required: false },
        { name: 'address', label: 'Address', checked: false, required: false },
      ],
      voices: [],
      timeOptions: Array.from({ length: 12 }, (_, i) => i + 8),
      currentVoice: null,
      showVoicePreview: false,
      isVoicePlaying: false,
      upload: {
        selectedCSV: null,
      },
    }
  },
  mounted() {
    this.getVoices()
  },
  methods: {
    async getVoices() {
      this.loaderStore.setIsLoading(true)
      try {
        const { data } = await ApiRequest().get(`/api/v1/voices/list`)
        this.voices = data
      } catch (e) {
        this.toastStore.show(e, 'error')
      } finally {
        this.loaderStore.setIsLoading(false)
      }
    },
    nextStep() {
      if (this.step < 4) {
        this.checkRequiredFields(this.step)
      } else {
        this.createCampaign()
      }
    },
    previousStep() {
      if (this.step > 1) {
        this.step--
      }
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
      this.uploadCSV()
    },
    async createCampaign() {
      if (this.step === 4) {
        if (
          !this.campaignData.maxAttempts ||
          !this.campaignData.retryInterval ||
          !this.campaignData.callWindowMin ||
          !this.campaignData.callWindowMax
        ) {
          this.toastStore.show(`You must fill the ${this.stepTitles[3]} fields`, 'error')
          return
        }
      }
      this.loaderStore.setIsLoading(true)
      try {
        const payload = this.campaignData
        payload.voiceId = this.currentVoice.voice_id
        const { data } = await ApiRequest().post(`/api/v1/compaigns/create`, payload)
        if (data) {
          this.toastStore.show('Campaign created successfully!', 'success')
          this.$router.push({ name: 'campaigns' })
        }
      } catch (e) {
        this.toastStore.show(e, 'error')
      } finally {
        this.loaderStore.setIsLoading(false)
      }
    },
    setCurrentVoice(e) {
      this.currentVoice = this.voices.find((voice) => voice.voice_id === e.target.value)
    },
    playVoice() {
      const audio = document.querySelector('audio')
      audio.pause()
      audio.currentTime = 0
      this.isVoicePlaying = true
      audio.play().catch((error) => {
        console.error('Error playing audio:', error)
      })
    },
    pauseVoice() {
      const audio = document.querySelector('audio')
      audio.pause()
      audio.currentTime = 0
      this.isVoicePlaying = false
    },
    handleAudioEnd() {
      const audio = document.querySelector('audio')
      audio.currentTime = 0
      this.isVoicePlaying = false
    },
    closeVoicePreview() {
      this.showVoicePreview = false
      this.pauseVoice()
    },
    checkRequiredFields(step) {
      if (step === 1) {
        if (!this.campaignData.name || !this.campaignData.type || !this.campaignData.description) {
          this.toastStore.show(`You must fill the ${this.stepTitles[0]} fields`, 'error')
          return
        }
      }
      if (step === 2) {
        if (!this.campaignData.contactListId) {
          this.toastStore.show(`You must fill the ${this.stepTitles[1]} fields`, 'error')
          return
        }
      }
      if (step === 3) {
        if (!this.currentVoice || !this.campaignData.scriptTemplate) {
          this.toastStore.show(`You must fill the ${this.stepTitles[2]} fields`, 'error')
          return
        }
      }
      this.step++
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
        this.campaignData.contactListId = data.uid
        this.toastStore.show('Contacts uploaded successfully!', 'success')
      } catch (e) {
        this.toastStore.show(e, 'error')
      } finally {
        this.loaderStore.setIsLoading(false)
      }
    },
  },
}
</script>
