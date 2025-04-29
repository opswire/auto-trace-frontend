<!-- pages/seller/chats.vue -->
<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold mb-8">Мои диалоги</h1>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Список диалогов -->
      <div class="lg:col-span-1 bg-white rounded-xl shadow-lg p-4 h-[calc(100vh-200px)] overflow-y-auto">
        <div
            v-for="chat in chats"
            :key="chat.id"
            @click="selectChat(chat)"
            :class="['p-3 rounded-lg mb-2 cursor-pointer transition-colors',
                  selectedChat?.id === chat.id ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50']"
        >
          <div class="flex items-center gap-3">
            <img
                :src="avatarUrl"
                class="w-10 h-10 rounded-full object-cover"
            >

            <div class="flex-1">
              <!-- Добавленная строка с ID объявления -->
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="font-semibold">{{ chat.buyer?.name || 'Anonymous' }}</h3>
                  <p class="text-sm text-gray-500 truncate">{{ chat.last_message?.text || 'Нет сообщений' }}</p>
                </div>
                <span class="text-xs text-gray-400 flex items-center">
  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
  </svg>
  {{ chat.ad_id }}
</span>

              </div>

            </div>
            <div class="flex items-center justify-between mt-2">
            <span class="text-xs text-gray-400">
              {{ formatTime(chat.last_message?.created_at) }}
            </span>
              <span
                  v-if="chat.unread_count > 0"
                  class="bg-red-500 text-white text-xs px-2 py-1 rounded-full"
              >
              {{ chat.unread_count }}
            </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Окно чата -->
      <div class="lg:col-span-3 bg-white rounded-xl shadow-lg p-6 h-[calc(100vh-200px)] flex flex-col">
        <div v-if="selectedChat" class="flex-1 overflow-y-auto mb-4 space-y-4" ref="chatWindow">
          <div
              v-for="message in selectedChat.messages"
              :key="message.id"
              :class="['flex', message.mine !== true ? 'justify-start' : 'justify-end']"
          >
            <div
                :class="[
                'max-w-[70%] p-3 rounded-lg',
                message.mine !== true
                  ? 'bg-gray-100'
                  : 'bg-blue-100'
              ]"
            >
              <p class="text-gray-800">{{ message.text }}</p>
              <span class="text-xs text-gray-500 mt-1 block">
                {{ formatTime(message.created_at) }}
              </span>
            </div>
          </div>
        </div>

        <div v-else class="flex-1 flex items-center justify-center text-gray-400">
          Выберите диалог для начала общения
        </div>

        <!-- Поле ввода -->
        <div v-if="selectedChat" class="border-t pt-4">
          <div class="flex gap-2">
            <input
                v-model="newMessage"
                @keyup.enter="sendMessage"
                placeholder="Напишите сообщение..."
                class="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
            <button
                @click="sendMessage"
                class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                :disabled="!newMessage.trim()"
            >
              Отправить
            </button>
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

const chatStore = useChatStore();
const adsStore = useAdsStore();
const chats = ref([]);
const selectedChat = ref(null);
const newMessage = ref('');
const chatWindow = ref(null);

const avatarUrl = computed(() => adsStore.getDefaultAvatar());

// Загрузка диалогов
onMounted(async () => {
  window.setInterval( async ()=>{
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
  }, 2500);

  try {
    await chatStore.fetchChats();
    chats.value = chatStore.chats;
  } catch (error) {
    console.error('Ошибка загрузки диалогов:', error);
  }
});

// Выбор чата
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

// Отправка сообщения
const sendMessage = async () => {
  if (!newMessage.value.trim()) return;

  try {
    await chatStore.sendMessage(selectedChat.value.id, {
      text: newMessage.value
    });

    selectedChat.value.messages.push({
      text: newMessage.value,
      mine: true,
      created_at: new Date().toISOString()
    });

    newMessage.value = '';
    scrollToBottom();
  } catch (error) {
    console.error('Ошибка отправки сообщения:', error);
  }
};

// Вспомогательные функции
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
</script>

<style scoped>
/* Анимация сообщений */
.message-enter-active {
  transition: all 0.3s ease;
}

.message-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
</style>