<template>
  <div class="container mx-auto p-6">
    <div v-if="loading" class="flex items-center justify-center h-32">
      <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
    </div>

    <div v-else-if="error" class="text-red-600 text-center py-10 font-medium">
      {{ error }}
    </div>

    <div v-else>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-3">
          <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
            <!-- Заголовок и цена -->
            <div class="flex items-center justify-between mb-6">
              <h1 class="text-3xl font-bold text-gray-800">{{ ad.title }}</h1>
              <span class="text-2xl font-semibold text-blue-600">{{ ad.price }} $</span>
            </div>

            <!-- Изображение автомобиля -->
            <div class="mb-8">
              <img
                  :src="imageUrl"
                  alt="Car"
                  class="w-full h-96 object-cover rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
              >
            </div>

            <!-- Детали объявления -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <CarDetails
                  title="Описание"
                  :content="ad.description"
                  icon="📝"
              />
              <CarDetails
                  title="Характеристики"
                  :content="`${ad.brand} ${ad.model}, ${ad.year_of_release} год`"
                  icon="🚘"
              />
            </div>

            <!-- Блок продавца -->
            <div class="bg-gray-50 rounded-xl p-6 mb-8">
              <div class="flex items-center gap-4 mb-4">
                <img
                    :src="avatarUrl"
                    class="w-12 h-12 rounded-full object-cover"
                >
                <div>
                  <h3 class="font-semibold text-lg">Продавец</h3>
                  <p class="text-gray-600">{{ ad.seller?.name || 'Анонимный продавец' }}</p>
                </div>
              </div>
              <button
                  @click="startChat"
                  class="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                  :disabled="loadingChat"
              >
                {{ loadingChat ? 'Создание чата...' : ad.chat_exists ? 'Перейти в чат' : 'Написать продавцу' }}
              </button>
            </div>

            <!-- Кнопки действий -->
            <div class="flex flex-wrap gap-4" v-if="currentUserId === ad.user_id">
              <button
                  v-if="!ad.is_token_minted"
                  @click="mintNFT"
                  class="action-btn bg-blue-600 hover:bg-blue-700"
                  :disabled="loading"
              >
                🎴 Получить NFT
              </button>
              <button
                  @click="editAd"
                  class="action-btn bg-yellow-500 hover:bg-yellow-600"
              >
                ✏️ Редактировать
              </button>
              <button
                  @click="deleteAd"
                  class="action-btn bg-red-500 hover:bg-red-600"
              >
                🗑️ Удалить
              </button>

              <!-- Новая кнопка продвижения -->
              <button
                  @click="showTariffModal = true"
                  class="action-btn bg-purple-500 hover:bg-purple-600"
                  :disabled="ad.promotion.enabled"
              >
                {{ ad.promotion.enabled ? '📈 Продвигается...' :  '📈 Продвинуть' }}
              </button>
            </div>
          </div>

          <!-- Модальное окно выбора тарифа -->
          <Transition name="modal">
            <div v-if="showTariffModal" class="modal-mask">
              <div class="modal-container">
                <h3 class="text-xl font-bold mb-4">Выберите тариф продвижения</h3>

                <div class="space-y-4">
                  <div
                      v-for="tariff in tariffs"
                      :key="tariff.id"
                      @click="selectedTariff = tariff.id"
                      :class="['tariff-option', selectedTariff === tariff.id ? 'border-purple-500 bg-purple-50' : '']"
                  >
                    <div class="flex justify-between items-center">
                      <div>
                        <h4 class="font-semibold">{{ tariff.name }}</h4>
                        <p class="text-gray-600">{{ tariff.description }}</p>
                      </div>
                      <span class="text-lg font-bold">{{ tariff.price }} ₽</span>
                    </div>
                  </div>
                </div>

                <div class="mt-6 flex gap-3 justify-end">
                  <button
                      @click="showTariffModal = false"
                      class="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Отмена
                  </button>
                  <button
                      @click="handlePromotion"
                      class="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                      :disabled="!selectedTariff"
                  >
                    Продолжить
                  </button>
                </div>
              </div>
            </div>
          </Transition>

          <!-- NFT информация -->
          <div v-if="token" class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-2xl font-bold mb-4">NFT Детали</h2>
            <div class="space-y-4">
              <p><strong>Адрес контракта:</strong> {{ token.contract_addr }}</p>
              <p><strong>Сеть:</strong> {{ token.chain_name }} (ID: {{ token.chain_id }})</p>
              <p><strong>Имя токена:</strong> {{ token.token_metadata.name }}</p>
              <p><strong>Описание:</strong> {{ token.token_metadata.description }}</p>
            </div>
            <img
                :src="token.token_metadata.image"
                alt="NFT Image"
                class="w-64 h-64 object-cover rounded-lg shadow mt-6"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import axios from 'axios';
import { useCookie } from "#app";
import { useAdsStore } from "~/store/ads.js";
import { useRouter } from 'vue-router';
import {useChatStore} from "~/store/chat.js";
import CarDetails from "~/components/ads/CarDetails.vue";
import {usePaymentStore} from "~/store/payment.js";
import {useAuthStore} from "~/store/auth.js";

const router = useRouter();
const adsStore = useAdsStore();
const chatStore = useChatStore();
const paymentStore = usePaymentStore();
const authStore = useAuthStore();
const loading = ref(false);
const loadingChat = ref(false);
const token = ref(null);
const error = ref('');

const currentUserId = authStore.profile?.id
const showTariffModal = ref(false);
const selectedTariff = ref(null);
const tariffs = ref([
  {
    id: 1,
    name: 'Стандарт',
    price: 490.00,
    description: 'Продвижение в общем списке на 24 часа'
  },
  {
    id: 2,
    name: 'Премиум',
    price: 1490.00,
    description: 'Закрепление в топе на 7 дней + выделение цветом'
  }
]);

const props = defineProps({
  ad: {
    type: Object,
    required: true,
  },
});

async function handlePromotion() {
  try {
    if (!selectedTariff.value) {
      error.value = 'Выберите тариф для продвижения';
      return;
    }

    const paymentLink = await paymentStore.promoteAd(props.ad.id, selectedTariff.value)

    console.log("paymentLink: ", paymentLink)

    if (paymentLink) {
      window.location.href = paymentLink;
    }
  } catch (err) {
    await router.push({path: `/ads/${props.ad.id}`, query: { error: error }});
    console.error('Ошибка:', error);
  } finally {
    showTariffModal.value = false;
  }
}

const imageUrl = computed(() => adsStore.getImagePhoto(props.ad));
const avatarUrl = computed(() => adsStore.getDefaultAvatar());

async function startChat() {
  if (props.ad.chat_exists) {
    await router.push(`/chats`);
    return
  }

  try {
    const sellerId = props.ad.user_id;
    if (!sellerId) throw new Error('Продавец не найден');

    const chat = await chatStore.storeChat(sellerId, props.ad.id);
    console.log("chat: ", chat)
    await router.push(`/chats?saved=true`);
  } catch (error) {
    console.error('Ошибка:', error);
    await router.push({path: `/ads/${props.ad.id}`, query: { error: error }});
  }
}

// Функция для редактирования объявления
function editAd() {
  // Перенаправление на страницу редактирования
  router.push(`/ads/${props.ad.id}/edit`)
  // window.location.href = `/ads/${props.ad.id}/edit`;
}

// Функция для удаления объявления
async function deleteAd() {
  await adsStore.deleteAd(props.ad.id)

  if (adsStore.error) {
    console.log(adsStore.error)
  }

  await router.push(`/ads?saved=true`);
}

// Функция для выпуска NFT
async function mintNFT() {
  try {
    loading.value = true;
    error.value = null;

    const tokenInfo = await axios.get(`http://localhost:8989/api/v1/ads/4/nftInfo`, {
      headers: {
        Authorization: useCookie('token').value || null
      }
    });
    token.value = tokenInfo.data.data;
  } catch (err) {
    console.error("Ошибка:", err);
    error.value = "Произошла ошибка при выпуске или загрузке токена.";
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.action-btn {
  @apply flex-1 flex items-center justify-center gap-2 text-white font-medium px-5 py-3 rounded-xl
  transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed;
}

.modal-mask {
  @apply fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4;
  z-index: 999;
}

.modal-container {
  @apply bg-white rounded-xl shadow-lg p-6;
  width: 100%;
  max-width: 600px;
}

.tariff-option {
  @apply p-4 border-2 rounded-lg cursor-pointer transition-colors;
}

.tariff-option:hover {
  @apply border-purple-300;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.action-btn {
  @apply flex-1 flex items-center justify-center gap-2 text-white font-medium px-5 py-3 rounded-xl
  transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed;
}
</style>