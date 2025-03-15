<template>
  <div class="container mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
    <div v-if="loading" class="flex items-center justify-center h-32">
      <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
    </div>

    <div v-else-if="error" class="text-red-600 text-center py-10 font-medium">
      {{ error }}
    </div>

    <div v-else>
      <!-- Данные объявления -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h1 class="text-3xl font-bold mb-4 text-gray-700">Информация об объявлении:</h1>
        <div class="space-y-4">
          <p><strong>Название:</strong> {{ ad.title }}</p>
          <p><strong>Описание:</strong> {{ ad.description }}</p>
          <p><strong>Цена:</strong> {{ ad.price }} руб.</p>
          <p><strong>Марка:</strong> {{ ad.car.brand }}</p>
          <p><strong>Модель:</strong> {{ ad.car.model }}</p>
          <p><strong>Год выпуска:</strong> {{ ad.car.year_of_release }}</p>
          <div v-if="ad.car.image_url">
            <img
                :src="ad.car.image_url"
                alt="Фото автомобиля"
                class="w-full max-w-md h-auto rounded-lg shadow"
            />
          </div>
        </div>

        <!-- Кнопки -->
        <div class="mt-6 flex space-x-4">
          <button
              v-if="!ad.car.is_token_minted"
              class="bg-blue-600 text-white font-medium px-5 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
              @click="mintNFT"
              :disabled="loading"
          >
            Получить NFT
          </button>
          <button
              class="bg-yellow-500 text-white font-medium px-5 py-2 rounded hover:bg-yellow-600 transition"
              @click="editAd"
          >
            Редактировать
          </button>
          <button
              class="bg-red-500 text-white font-medium px-5 py-2 rounded hover:bg-red-600 transition"
              @click="deleteAd"
          >
            Удалить
          </button>
        </div>
      </div>

      <!-- Информация о NFT -->
      <div v-if="token" class="mt-8 p-6 bg-white rounded-lg shadow-md">
        <h2 class="text-2xl font-bold mb-4 text-gray-700">Информация о NFT:</h2>
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
        <ul class="mt-4">
          <li
              v-for="attribute in token.token_metadata.attributes"
              :key="attribute.trait_type"
              class="bg-gray-100 px-4 py-2 rounded"
          >
            <strong>{{ attribute.trait_type }}:</strong> {{ attribute.value }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const props = defineProps({
  ad: {
    type: Object,
    required: true,
  },
});

const loading = ref(false);
const error = ref(null);
const token = ref(null);

// Функция для редактирования объявления
function editAd() {
  // Перенаправление на страницу редактирования
  window.location.href = `/edit/${props.ad.id}`;
}

// Функция для удаления объявления
async function deleteAd() {
  if (confirm("Вы уверены, что хотите удалить это объявление?")) {
    try {
      loading.value = true;
      await axios.delete(`/api/listings/${props.ad.id}`);
      alert("Объявление успешно удалено!");
      window.location.href = "/"; // Возврат на главную страницу
    } catch (err) {
      console.error("Ошибка при удалении объявления:", err);
      alert("Не удалось удалить объявление. Попробуйте еще раз.");
    } finally {
      loading.value = false;
    }
  }
}

// Функция для выпуска NFT
async function mintNFT() {
  try {
    loading.value = true;
    error.value = null;

    const tokenInfo = await axios.get(`http://localhost:8989/v1/ads/4/nftInfo`);
    token.value = tokenInfo.data.data;
  } catch (err) {
    console.error("Ошибка:", err);
    error.value = "Произошла ошибка при выпуске или загрузке токена.";
  } finally {
    loading.value = false;
  }
}
</script>
