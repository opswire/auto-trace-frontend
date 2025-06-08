<template>
  <header class="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white">
    <nav class="container mx-auto px-6 py-4 flex items-center justify-between relative">
      <div class="logo text-3xl font-extrabold cursor-pointer">
        <NuxtLink to="/" class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 transition-all duration-500">
          AutoTrace
        </NuxtLink>
      </div>

      <div class="hidden md:flex space-x-12 items-center">
        <NuxtLink
            v-for="navItem in navItems"
            :key="navItem.to"
            :to="navItem.to"
            class="relative group text-lg font-medium text-gray-300 hover:text-white transition-all duration-300"
            :class="{ 'text-white': isActive(navItem.to) }"
        >
          {{ navItem.label }}
          <span
              class="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500
            group-hover:w-full transition-all duration-300"
              :class="{ 'w-full': isActive(navItem.to) }"
          ></span>
        </NuxtLink>
        <NuxtLink
            v-for="navItem in authItems"
            v-if="authStore.isAuthenticated"
            :key="navItem.to"
            :to="navItem.to"
            class="relative group text-lg font-medium text-gray-300 hover:text-white transition-all duration-300"
            :class="{ 'text-white': isActive(navItem.to) }"
        >
          {{ navItem.label }}
          <span
              class="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500
            group-hover:w-full transition-all duration-300"
              :class="{ 'w-full': isActive(navItem.to) }"
          ></span>
        </NuxtLink>
      </div>

      <div class="flex items-center space-x-6">
        <div v-if="!authStore.isAuthenticated" class="hidden md:flex space-x-6">
          <NuxtLink
              to="/register"
              class="btn-secondary"
          >
            Регистрация
          </NuxtLink>
          <NuxtLink
              to="/login"
              class="btn-primary"
          >
            Вход
          </NuxtLink>
        </div>

        <div v-else class="flex items-center space-x-4">
          <div class="relative group">
            <button
                class="flex items-center space-x-3 text-gray-300 hover:text-white transition-all"
                @click="toggleDropdown"
            >
              <img
                  :src="'/avatar.jpg'"
                  alt="Avatar"
                  class="w-10 h-10 rounded-full border-2 border-blue-500 shadow-lg"
              />
              <span class="hidden md:block font-medium">{{ authStore.profile?.name || 'Пользователь' }}</span>
              <ChevronDownIcon class="w-5 h-5 transition-transform duration-300"
                               :class="{ 'transform rotate-180': isDropdownOpen }"
              />
            </button>

            <transition
                enter-active-class="transition-all duration-300 ease-out"
                leave-active-class="transition-all duration-200 ease-in"
                enter-from-class="opacity-0 scale-90"
                leave-to-class="opacity-0 scale-90"
            >
              <div v-if="isDropdownOpen" class="absolute right-0 mt-2 w-64 bg-white rounded-3xl shadow-2xl overflow-hidden z-20">
                <div class="p-6 border-b border-gray-100">
                  <p class="text-lg font-semibold text-gray-800">{{ authStore.profile?.name }}</p>
                  <p class="text-sm text-gray-500">Почта: {{ authStore.profile?.email }}</p>
                  <p class="text-sm text-gray-500">Роль: {{ authStore.profile?.role }}</p>
                </div>
                <div class="p-3">
                  <NuxtLink
                      v-if="authStore.profile?.role === 'admin'"
                      to="/admin"
                      class="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-all w-full"
                      @click="isDropdownOpen = false"
                  >
                    <Bars3Icon class="w-6 h-6 text-blue-600 mr-3" />
                    <span class="text-gray-700 font-medium">Админ-панель</span>
                  </NuxtLink>
                  <NuxtLink
                      to="/profile"
                      class="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-all w-full"
                      @click="isDropdownOpen = false"
                  >
                    <UserIcon class="w-6 h-6 text-blue-600 mr-3" />
                    <span class="text-gray-700 font-medium">Профиль</span>
                  </NuxtLink>
                  <button
                      class="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-all w-full"
                      @click="handleLogout"
                  >
                    <ArrowRightOnRectangleIcon class="w-6 h-6 text-red-600 mr-3" />
                    <span class="text-red-600 font-medium">Выйти</span>
                  </button>
                </div>
              </div>
            </transition>
          </div>
        </div>

        <button
            class="md:hidden text-gray-300 hover:text-white transition-all"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <Bars3Icon class="w-8 h-8" />
        </button>
      </div>
    </nav>

    <transition
        enter-active-class="transition-all duration-300 ease-out"
        leave-active-class="transition-all duration-200 ease-in"
        enter-from-class="opacity-0 -translate-y-4"
        leave-to-class="opacity-0 -translate-y-4"
    >
      <div v-if="isMobileMenuOpen" class="md:hidden bg-gradient-to-r from-gray-800 to-gray-700 py-4">
        <div class="container mx-auto px-6 space-y-4">
          <NuxtLink
              v-for="navItem in navItems"
              :key="navItem.to"
              :to="navItem.to"
              class="block text-lg font-medium text-gray-300 hover:text-white transition-all"
              :class="{ 'text-white': isActive(navItem.to) }"
              @click="isMobileMenuOpen = false"
          >
            {{ navItem.label }}
          </NuxtLink>
          <NuxtLink
              v-for="navItem in authItems"
              :key="navItem.to"
              :to="navItem.to"
              class="block text-lg font-medium text-gray-300 hover:text-white transition-all"
              :class="{ 'text-white': isActive(navItem.to) }"
              @click="isMobileMenuOpen = false"
          >
            {{ navItem.label }}
          </NuxtLink>
          <div v-if="!authStore.isAuthenticated" class="space-y-4">
            <NuxtLink
                to="/register"
                class="btn-secondary w-full"
                @click="isMobileMenuOpen = false"
            >
              Регистрация
            </NuxtLink>
            <NuxtLink
                to="/login"
                class="btn-primary w-full"
                @click="isMobileMenuOpen = false"
            >
              Вход
            </NuxtLink>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '~/store/auth'
import {
  Bars3Icon,
  ChevronDownIcon,
  UserIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/vue/24/solid'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const isDropdownOpen = ref(false)
const isMobileMenuOpen = ref(false)

const navItems = [
  { label: 'Объявления', to: '/ads' },
]

const authItems = [
  { label: 'Диалоги', to: '/chats'},
  { label: 'Договоры', to: '/contracts'},
  { label: 'Встречи', to: '/appointments'},
]

const avatarUrl = computed(() =>
    authStore.profile?.avatar ||
    `https://avatars.dicebear.com/api/initials/${authStore.profile?.email || 'User'}.svg`
)

const isActive = (path) => {
  return route.path.startsWith(path)
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
  isDropdownOpen.value = false
}

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}
</script>

<style scoped>
.btn-primary {
  @apply bg-gradient-to-r from-blue-600 to-purple-600 text-white
  py-3 px-8 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700
  transition-all duration-300 shadow-lg hover:shadow-xl;
}

.btn-secondary {
  @apply bg-white bg-opacity-10 text-white py-3 px-8 rounded-full
  font-semibold hover:bg-opacity-20 transition-all duration-300;
}

.group:hover .group-hover\:w-full {
  width: 100%;
}

img {
  transition: transform 0.3s ease;
}
img:hover {
  transform: scale(1.1) rotate(-5deg);
}

@keyframes gradient-animation {
  0% { background-position: 0 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0 50%; }
}
</style>