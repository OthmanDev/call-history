<template>
  <div
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
            <span
              @click="upload.selectedCSV = null"
              class="cursor-pointer hover:text-danger-100"
              v-tooltip="'Delete'"
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
</template>

<script>
import { Download, X, Trash2, Upload } from 'lucide-vue-next'
import ApiRequest from '@/libs/ApiRequest'
import { useLoaderStore } from '@/stores/loader'
import { useToastStore } from '@/stores/toast'
export default {
  components: {
    Download,
    X,
    Trash2,
    Upload,
  },
  setup() {
    const loaderStore = useLoaderStore()
    const toastStore = useToastStore()
    return { loaderStore, toastStore }
  },
  data() {
    return {
      upload: {
        selectedCSV: null,
      },
    }
  },
  methods: {
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
    closeUploadContactsModal() {
      this.upload = {
        selectedCSV: null,
      }
      this.$emit('closeUploadContactsModal')
    },
    loadContacts() {
      this.$emit('loadContacts')
    },
  },
}
</script>
