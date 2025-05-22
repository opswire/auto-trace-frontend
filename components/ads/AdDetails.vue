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
              <span class="text-2xl font-semibold text-blue-600">{{ formattedPrice }}</span>
            </div>

            <!-- Изображение автомобиля -->
            <div class="mb-8">
              <img
                  :src="imageUrl"
                  alt="Car"
                  class="w-full h-124 object-cover rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
              >
            </div>

            <!-- Детали -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <!-- Характеристики -->
              <CarDetails
                  title="Характеристики"
                  :items="[
              { label: 'Марка', value: ad.brand, monospace: true },
              { label: 'Модель', value: ad.model, monospace: true },
              { label: 'Год', value: ad.year_of_release, monospace: true },
              { label: 'Категория', value: ad.category, monospace: true },
              { label: 'Тип прав', value: ad.type, monospace: true }
            ]"
                  icon="📝"
              />

              <!-- Регистрация -->
              <CarDetails
                  title="Регистрация"
                  :items="[
              { label: 'VIN', value: ad.vin, monospace: true },
              { label: 'Рег. номер', value: ad.reg_number, monospace: true },
              { label: 'Цвет', value: ad.color, monospace: true }
            ]"
                  icon=📌
              />

              <!-- Техника -->
              <CarDetails
                  title="Техника"
                  :items="[
              { label: 'Мощность', value: `${ad.hp} л.с.`, monospace: true, highlight: true },
              { label: 'Полная масса', value: `${ad.full_weight} кг`, monospace: true },
              { label: 'Снаряженная масса', value: `${ad.solo_weight} кг`, monospace: true }
            ]"
                  icon="⚙️"
              />
            </div>

            <!-- Блок продавца -->
            <div class="bg-gray-50 rounded-xl p-6 mb-8" v-if="currentUserId != ad.user_id">
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
            <div class="flex flex-wrap gap-4 mt-12" v-if="currentUserId == ad.user_id">
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
                {{ ad.promotion.enabled ? '📈 Продвигается...' : '📈 Продвинуть' }}
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
          <div v-if="ad.is_token_minted" class="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-2xl font-bold">NFT Паспорт автомобиля</h2>
              <a
                  :href="nftData.token_data.token_url"
                  target="_blank"
                  class="text-blue-500 hover:text-blue-700 flex items-center"
              >
                Посмотреть в блокчейне
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path
                      d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"/>
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"/>
                </svg>
              </a>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 class="text-lg font-semibold mb-2">Основная информация</h3>
                <div class="space-y-2">
                  <p><strong>ID токена:</strong> {{ nftData.token_id }}</p>
                  <p><strong>VIN:</strong> {{ nftData.vin }}</p>
                  <p><strong>Контракт:</strong> {{ nftData.token_data.contract_addr }}</p>
                  <p><strong>Сеть:</strong> {{ nftData.token_data.chain_name }} (ID: {{ nftData.token_data.chain_id }})
                  </p>
                  <p><strong>Транзакция:</strong>
                    <a :href="`${nftData.token_data.token_url}/tx/${nftData.token_data.tx}`" target="_blank"
                       class="text-blue-500 hover:underline">
                      {{ nftData.token_data.tx }}
                    </a>
                  </p>
                </div>
              </div>

              <div>
                <h3 class="text-lg font-semibold mb-2">История обслуживания</h3>
                <div v-if="nftData.token_data.records.length > 0" class="space-y-4">
                  <div
                      v-for="(record, index) in nftData.token_data.records"
                      :key="index"
                      class="border-l-4 border-blue-500 pl-4 py-2"
                  >
                    <div class="flex justify-between">
                      <p class="font-medium">{{ formatDate(record.created_at) }}</p>
                      <span v-if="record.signature" class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      ID чека: {{ record.signature }}
                    </span>
                    </div>
                    <p class="text-gray-700">{{ record.description }}</p>
                    <p v-if="record.company" class="text-sm text-gray-500">Сервис: {{ record.company }}</p>
                  </div>
                </div>
                <div v-else class="text-gray-500">
                  Нет записей об обслуживании
                </div>
              </div>
            </div>

            <!-- Ссылка для добавления записи ТО -->
            <div v-if="serviceLink" class="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 class="font-semibold mb-2">Ссылка для добавления записи ТО</h3>
              <div class="flex items-center">
                <input
                    type="text"
                    :value="serviceLink"
                    readonly
                    class="flex-1 p-2 border rounded-l-lg focus:outline-none"
                    ref="serviceLinkInput"
                >
                <button
                    @click="copyServiceLink"
                    class="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
                >
                  Копировать
                </button>
              </div>
              <p class="text-sm text-gray-500 mt-2">
                Отправьте эту ссылку сервисному центру для добавления записи о техническом обслуживании
              </p>
            </div>
            <div class="flex flex-wrap gap-4 mt-4" v-if="currentUserId == ad.user_id">
              <button
                  v-if="!ad.is_token_minted"
                  @click="mintNFT"
                  class="action-btn bg-blue-600 hover:bg-blue-700"
                  :disabled="loading"
              >
                🎴 Получить NFT
              </button>
              <button
                  v-if="ad.is_token_minted"
                  @click="generateServiceLink"
                  class="action-btn bg-green-600 hover:bg-green-700"
              >
                🔗 Создать ссылку для ТО
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, ref} from 'vue';
import {useAdsStore} from "~/store/ads.js";
import {useChatStore} from "~/store/chat.js";
import CarDetails from "~/components/ads/CarDetails.vue";
import {usePaymentStore} from "~/store/payment.js";
import {useAuthStore} from "~/store/auth.js";
import {useNftStore} from "~/store/nft.js";

const router = useRouter();
const adsStore = useAdsStore();
const chatStore = useChatStore();
const paymentStore = usePaymentStore();
const authStore = useAuthStore();
const nftStore = useNftStore();
const loading = ref(false);
const loadingChat = ref(false);
const error = ref('');

const currentUserId = computed(() => authStore.profile?.id || null);
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

const formattedPrice = computed(() => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0
  }).format(props.ad.price);
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
    await router.push({path: `/ads/${props.ad.id}`, query: {error: error}});
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
    await router.push({path: `/ads/${props.ad.id}`, query: {error: error}});
  }
}

function editAd() {
  router.push(`/ads/${props.ad.id}/edit`)
}

async function deleteAd() {
  await adsStore.deleteAd(props.ad.id)

  if (adsStore.error) {
    console.log(adsStore.error)
  }

  await router.push(`/ads?saved=true`);
}

// const nftData = ref({
//   token_id: 0,
//   vin: '',
//   metadata_url: '',
//   is_minted: false,
//   created_at: '',
//   token_data: {
//     contract_addr: '',
//     chain_id: 0,
//     chain_name: '',
//     token_id: 0,
//     token_url: '',
//     tx: '',
//     records: []
//   }
// });

if (props.ad.is_token_minted) {
  try {
    loading.value = true;
    error.value = null;

    await nftStore.fetchNftInfo(props.ad.vin)
  } catch (err) {
    console.error("Ошибка:", err);
    error.value = "Произошла ошибка при выпуске или загрузке токена.";
    props.ad.is_token_minted = false
  } finally {
    loading.value = false;
  }
}

const nftData = ref(nftStore.nftInfo);

async function mintNFT() {
  try {
    loading.value = true;
    error.value = null;

    await nftStore.mintNFT(props.ad.vin)
    props.ad.is_token_minted = true
    await nftStore.fetchNftInfo(props.ad.vin)
    nftData.value = nftStore.nftInfo
    generateServiceLink()
  } catch (err) {
    console.error("Ошибка:", err);
    error.value = "Произошла ошибка при выпуске или загрузке токена.";
  } finally {
    loading.value = false;
  }
}

function formatDate(dateString) {
  if (!dateString || dateString === '0001-01-01T00:00:00Z') return 'Дата не указана';
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

const serviceLink = ref('')
const serviceLinkInput = ref(null);

function generateServiceLink() {
  const baseUrl = window.location.origin;
  serviceLink.value = `${baseUrl}/nft/${props.ad.vin}/add-record?adId=${props.ad.id}`;
}

function copyServiceLink() {
  if (serviceLinkInput.value) {
    serviceLinkInput.value.select();
    document.execCommand('copy');
    // Можно добавить уведомление об успешном копировании
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