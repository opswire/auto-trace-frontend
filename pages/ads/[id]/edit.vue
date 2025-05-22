<template>
  <div class="create-listing bg-gray-50 p-8 rounded-lg shadow-md max-w-4xl mx-auto relative">
    <!-- Кнопка назад -->
    <button
        @click="goBack"
        class="absolute top-4 left-4 flex items-center text-blue-700 hover:text-blue-900"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>

    <h1 class="text-4xl font-bold text-center mb-6 text-blue-700">Редактирование объявления</h1>
    <form @submit.prevent="submitForm" class="space-y-6">
      <!-- Название -->
      <div class="form-group">
        <label for="title" class="block text-lg font-medium text-gray-700">Название</label>
        <input
            type="text"
            id="title"
            v-model="form.title"
            required
            class="input"
            placeholder="Введите название объявления"
        />
      </div>

      <!-- Описание -->
      <div class="form-group">
        <label for="description" class="block text-lg font-medium text-gray-700">Описание</label>
        <textarea
            id="description"
            v-model="form.description"
            required
            class="textarea"
            placeholder="Опишите автомобиль"
        ></textarea>
      </div>

      <!-- Цена -->
      <div class="form-group">
        <label for="price" class="block text-lg font-medium text-gray-700">Цена</label>
        <input
            type="number"
            step="0.01"
            id="price"
            v-model="form.price"
            required
            class="input"
            placeholder="Введите цену"
        />
      </div>

      <!-- VIN Номер -->
      <div class="form-group">
        <label for="make" class="block text-lg font-medium text-gray-700">VIN Номер</label>
        <input
            type="text"
            id="make"
            v-model="form.vin"
            required
            class="input"
            placeholder="Например, 2C4RC1BG5ER131467"
        />
      </div>

      <!-- Марка -->
      <div class="form-group">
        <label for="make" class="block text-lg font-medium text-gray-700">Марка</label>
        <input
            type="text"
            id="make"
            v-model="form.brand"
            required
            class="input"
            placeholder="Например, Toyota"
        />
      </div>

      <!-- Модель -->
      <div class="form-group">
        <label for="model" class="block text-lg font-medium text-gray-700">Модель</label>
        <input
            type="text"
            id="model"
            v-model="form.model"
            required
            class="input"
            placeholder="Например, Corolla"
        />
      </div>

      <!-- Год выпуска -->
      <div class="form-group">
        <label for="year" class="block text-lg font-medium text-gray-700">Год выпуска</label>
        <input
            type="number"
            id="year"
            v-model="form.year_of_release"
            required
            class="input"
            placeholder="Введите год выпуска"
        />
      </div>

      <!-- Категория -->
      <div class="form-group">
        <label for="category" class="block text-lg font-medium text-gray-700">Категория</label>
        <select
            id="category"
            v-model="form.category"
            required
            class="input"
        >
          <option value="Седан">Седан</option>
          <option value="Кроссовер">Кроссовер</option>
          <option value="Внедорожник">Внедорожник</option>
          <option value="Грузовик">Грузовик</option>
          <option value="Купе">Купе</option>
        </select>
      </div>

      <!-- Регистрационный номер -->
      <div class="form-group">
        <label for="reg_number" class="block text-lg font-medium text-gray-700">Рег. номер</label>
        <input
            type="text"
            id="reg_number"
            v-model="form.reg_number"
            required
            class="input"
            placeholder="А123АА777"
        />
      </div>

      <!-- Тип прав -->
      <div class="form-group">
        <label for="type" class="block text-lg font-medium text-gray-700">Категория прав</label>
        <select
            id="type"
            v-model="form.type"
            required
            class="input"
        >
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
      </div>

      <!-- Цвет -->
      <div class="form-group">
        <label for="color" class="block text-lg font-medium text-gray-700">Цвет</label>
        <input
            type="text"
            id="color"
            v-model="form.color"
            required
            class="input"
            placeholder="Введите цвет автомобиля"
        />
      </div>

      <!-- Мощность -->
      <div class="form-group">
        <label for="hp" class="block text-lg font-medium text-gray-700">Мощность (л.с.)</label>
        <input
            type="number"
            id="hp"
            v-model="form.hp"
            required
            class="input"
            placeholder="Укажите мощность"
        />
      </div>

      <!-- Полная масса -->
      <div class="form-group">
        <label for="full_weight" class="block text-lg font-medium text-gray-700">Полная масса (кг)</label>
        <input
            type="number"
            id="full_weight"
            v-model="form.full_weight"
            required
            class="input"
            placeholder="Укажите полную массу"
        />
      </div>

      <!-- Масса без нагрузки -->
      <div class="form-group">
        <label for="solo_weight" class="block text-lg font-medium text-gray-700">Снаряженная масса (кг)</label>
        <input
            type="number"
            id="solo_weight"
            v-model="form.solo_weight"
            required
            class="input"
            placeholder="Укажите снаряженную массу"
        />
      </div>

      <!-- Изображение -->
      <div class="form-group">
        <label for="image" class="block text-lg font-medium text-gray-700">Изображение</label>
        <input
            type="file"
            id="image"
            @change="handleFileUpload"
            class="file-input"
        />
      </div>

      <!-- Кнопка -->
      <div class="text-center">
        <button
            type="submit"
            class="submit-button"
        >
          Редактировать объявление
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import {useAdsStore} from "~/store/ads.js";

const route = useRoute()
const router = useRouter()
const adStore = useAdsStore();

await adStore.fetchAdById(route.params.id)
const form = ref(adStore.currentAd)

const handleFileUpload = (event) => form.value.image = event.target.files[0]

const submitForm = async () => {
  form.current_image_url = form.value.image_url
  await adStore.updateAd(form.value)

  if (adStore.error) {
    console.log(adStore.error)
    await router.push({path: `/ads/${route.params.id}`, query: { error: adStore.error }});
    return
  }

  await router.push(`/ads/${route.params.id}?saved=true`);
}

const goBack = () => router.go(-1)

</script>

<style scoped>
.create-listing {
  background: #f9fafb;
  border-radius: 10px;
}

.input,
.textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.input:focus,
.textarea:focus {
  border-color: #2563eb;
  outline: none;
}

.file-input {
  width: 100%;
  padding: 8px;
  border: 1px dashed #d1d5db;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
}

.file-input:hover {
  border-color: #2563eb;
}

.submit-button {
  background-color: #2563eb;
  color: #fff;
  font-size: 18px;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #1d4ed8;
}

textarea {
  resize: vertical;
}
</style>
