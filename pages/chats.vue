<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold mb-8">Мои диалоги</h1>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div class="lg:col-span-1 bg-white rounded-2xl shadow-xl p-4 h-[calc(100vh-200px)] overflow-y-auto space-y-2">
        <div
            v-for="chat in chats"
            :key="chat.id"
            @click="selectChat(chat)"
            :class="['p-4 rounded-xl cursor-pointer transition-all border', selectedChat?.id === chat.id ? 'bg-blue-50 border-blue-300 shadow-md' : 'hover:bg-gray-50 border-gray-200']"
        >
          <div class="flex items-center gap-4">
            <img :src="avatarUrl" class="w-12 h-12 rounded-full object-cover shadow"/>

            <div class="flex-1 min-w-0">
              <div class="flex justify-between items-start">
                <div class="min-w-0">
                  <h3 class="font-semibold text-base truncate">
                    {{ chat.is_buyer === true ? chat.seller_name : chat.buyer_name }}</h3>
                  <p class="text-sm text-gray-500 truncate">{{ chat.ad_title }}</p>
                </div>
                <span class="text-xs text-gray-400 flex items-center shrink-0 ml-2">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
                  </svg>
                  {{ chat.ad_id }}
                </span>
              </div>
            </div>
          </div>
          <div class="mt-4 text-right" v-if="chat.is_buyer === true">
            <button
                @click="openAppointmentModal"
                class="inline-flex items-center px-4 py-2 bg-green-500 text-white text-sm font-semibold rounded-lg shadow hover:bg-green-600 transition"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M8 7V3m8 4V3m-9 4h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V9a2 2 0 012-2z"/>
              </svg>
              Предложить встречу
            </button>
          </div>

        </div>
      </div>

      <div class="lg:col-span-3 bg-white rounded-2xl shadow-xl p-6 h-[calc(100vh-200px)] flex flex-col">
        <div v-if="selectedChat" class="flex-1 overflow-y-auto mb-4 space-y-4 pr-1" ref="chatWindow">
          <div
              v-for="message in selectedChat.messages"
              :key="message.id"
              :class="['flex', message.mine !== true ? 'justify-start' : 'justify-end']"
          >
            <div
                :class="['max-w-[70%] p-3 rounded-xl shadow-sm', message.mine !== true ? 'bg-gray-100' : 'bg-blue-100']"
            >
              <p class="text-gray-800 whitespace-pre-line">{{ message.text }}</p>
              <div v-if="message.image_url" class="mt-2">
                <img :src="chatStore.getMessageImageUrl(message.image_url)" class="rounded-lg max-w-xs shadow"
                     alt="message image"/>
              </div>
              <span class="text-xs text-gray-500 mt-1 block text-right">
                {{ formatTime(message.created_at) }}
              </span>
            </div>
          </div>
        </div>

        <div v-else class="flex-1 flex items-center justify-center text-gray-400 text-lg italic">
          Выберите диалог для начала общения
        </div>

        <Transition name="fade">
          <div
              v-if="showModal"
              class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
          >
            <div class="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
              <h2 class="text-xl font-semibold mb-4">Создание встречи</h2>

              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium">Дата и время</label>
                  <input
                      type="datetime-local"
                      v-model="form.start"
                      class="w-full mt-1 p-2 border rounded-md"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium">Длительность (минут)</label>
                  <input
                      type="number"
                      v-model="form.duration"
                      class="w-full mt-1 p-2 border rounded-md"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium">Место встречи</label>
                  <input
                      type="text"
                      v-model="form.location"
                      placeholder="Например, Москва, Тверская 10"
                      class="w-full mt-1 p-2 border rounded-md"
                  />
                </div>
              </div>

              <div class="flex justify-end mt-6 gap-2">
                <button @click="closeModal" class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Отмена</button>
                <button @click="submitAppointment" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Сохранить
                </button>
              </div>

              <button @click="closeModal" class="absolute top-2 right-3 text-gray-400 hover:text-gray-600 text-xl">
                ×
              </button>
            </div>
          </div>
        </Transition>

        <div v-if="selectedChat" class="border-t pt-4">
          <div class="flex flex-col gap-2">
            <div class="flex items-center gap-3">
              <input
                  v-model="newMessage"
                  @keyup.enter="sendMessage"
                  placeholder="Напишите сообщение..."
                  class="flex-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
              <label class="cursor-pointer">
                <input type="file" class="hidden" accept="image/*" @change="onFileSelected"/>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-500 hover:text-blue-500 transition"
                     fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="M16.5 8.25L7.5 17.25a3 3 0 01-4.24-4.24l10.5-10.5a4.5 4.5 0 016.36 6.36l-10.5 10.5a1.5 1.5 0 01-2.12-2.12l9-9"/>
                </svg>
              </label>
              <button
                  @click="sendMessage"
                  class="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition shadow"
                  :disabled="!newMessage.trim() && !selectedFile"
              >
                Отправить
              </button>
            </div>

            <div v-if="selectedFile" class="relative max-w-xs">
              <img :src="previewUrl" class="rounded-xl mt-2 shadow-lg"/>
              <button @click="removeSelectedFile"
                      class="absolute top-1 right-1 text-white bg-black bg-opacity-50 rounded-full p-1">
                ✕
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, nextTick, computed} from 'vue';
import {useChatStore} from '~/store/chat';
import {useAdsStore} from "~/store/ads.js";
import {useAuthStore} from "~/store/auth.js";
import {useAppointmentStore} from "~/store/appointment.js";

const chatStore = useChatStore();
const adsStore = useAdsStore();
const authStore = useAuthStore();
const appointmentStore = useAppointmentStore();

const chats = ref([]);
const selectedChat = ref(null);
const newMessage = ref('');
const chatWindow = ref(null);

const avatarUrl = computed(() => adsStore.getDefaultAvatar());

onMounted(async () => {
  window.setInterval(async () => {
    if (selectedChat !== null && selectedChat.value !== null && selectedChat.value.id !== null) {
      try {
        await chatStore.fetchMessages(selectedChat.value.id);
        selectedChat.value.messages = chatStore.messages;
        await nextTick();
        scrollToBottom();
      } catch (error) {
        console.error('Ошибка загрузки сообщений:', error);
      }
    }
  }, 7500);

  try {
    await chatStore.fetchChats();
    chats.value = chatStore.chats;
  } catch (error) {
    console.error('Ошибка загрузки диалогов:', error);
  }
});

const selectChat = async (chat) => {
  selectedChat.value = chat;

  try {
    await chatStore.fetchMessages(chat.id);
    chat.messages = chatStore.messages;
    await nextTick();
    scrollToBottom();
  } catch (error) {
    console.error('Ошибка загрузки сообщений:', error);
  }
};

const sendMessage = async () => {
  if (!newMessage.value.trim() && !selectedFile.value) return;

  const formData = new FormData();
  formData.append('text', newMessage.value);
  if (selectedFile.value) {
    formData.append('image', selectedFile.value);
  }

  try {
    const sent = await chatStore.sendMessage(selectedChat.value.id, formData);

    selectedChat.value.messages.push({
      text: newMessage.value,
      image_url: sent?.image_url || null,
      mine: true,
      created_at: new Date().toISOString()
    });

    newMessage.value = '';
    removeSelectedFile();
    scrollToBottom();
  } catch (error) {
    console.error('Ошибка отправки сообщения:', error);
  }
};
const formatTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
};

const scrollToBottom = () => {
  if (chatWindow.value) {
    chatWindow.value.scrollTop = chatWindow.value.scrollHeight;
  }
};

const selectedFile = ref(null);
const previewUrl = ref(null);

const onFileSelected = (e) => {
  const file = e.target.files[0];
  if (file && file.type.startsWith('image/')) {
    selectedFile.value = file;
    previewUrl.value = URL.createObjectURL(file);
    console.log(selectedFile.value)
  }
};

const removeSelectedFile = () => {
  selectedFile.value = null;
  previewUrl.value = null;
};

const showModal = ref(false);
const form = ref({
  start: '',
  duration: 30,
  location: '',
  ad_id: null,
  buyer_id: null
});

const openAppointmentModal = () => {
  if (!selectedChat.value) return;

  form.value = {
    start: '',
    duration: 30,
    location: 'Таганрог, ул. Чехова 22',
    ad_id: selectedChat.value.ad_id,
    buyer_id: selectedChat.value.buyer_id
  };

  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const submitAppointment = async () => {
  if (!form.value.start || !form.value.duration || !form.value.location) {
    alert('Пожалуйста, заполните все поля.');
    return;
  }

  try {
    await appointmentStore.storeAppointment({
      start: new Date(form.value.start).toISOString(),
      duration: Number(form.value.duration),
      location: form.value.location,
      ad_id: form.value.ad_id,
      buyer_id: form.value.buyer_id
    });

    closeModal();
    alert('Встреча успешно создана!');
  } catch (error) {
    console.error('Ошибка при создании встречи:', error);
    alert('Ошибка при создании встречи');
  }
};
</script>

<style scoped>
</style>