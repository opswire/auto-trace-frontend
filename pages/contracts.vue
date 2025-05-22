<template>
  <div class="container">
    <!-- Форма ввода данных -->
    <div v-if="!showContract" class="form-container">
      <h1>Генератор договора купли-продажи автомобиля</h1>

      <div class="form-section">
        <h2>Данные продавца</h2>
        <div class="form-grid">
          <div>
            <label>ФИО:</label>
            <input v-model="form.seller.fullName" required>
          </div>
          <div>
            <label>Дата рождения:</label>
            <input type="date" v-model="form.seller.birthday" required>
          </div>
          <div>
            <label>Серия паспорта:</label>
            <input v-model="form.seller.passportSeries" required>
          </div>
          <div>
            <label>Номер паспорта:</label>
            <input v-model="form.seller.passportNumber" required>
          </div>
          <div>
            <label>Кем выдан:</label>
            <input v-model="form.seller.passportIssuer" required>
          </div>
          <div>
            <label>Дата выдачи:</label>
            <input type="date" v-model="form.seller.passportDate" required>
          </div>
          <div>
            <label>Адрес регистрации:</label>
            <input v-model="form.seller.address" required>
          </div>
          <div>
            <label>Телефон:</label>
            <input v-model="form.seller.phone" required>
          </div>
        </div>
      </div>

      <div class="form-section">
        <h2>Данные покупателя</h2>
        <div class="form-grid">
          <!-- Аналогичные поля как у продавца -->
          <div>
            <label>ФИО:</label>
            <input v-model="form.buyer.fullName" required>
          </div>
          <div>
            <label>Дата рождения:</label>
            <input type="date" v-model="form.buyer.birthday" required>
          </div>
          <div>
            <label>Серия паспорта:</label>
            <input v-model="form.buyer.passportSeries" required>
          </div>
          <div>
            <label>Номер паспорта:</label>
            <input v-model="form.buyer.passportNumber" required>
          </div>
          <div>
            <label>Кем выдан:</label>
            <input v-model="form.buyer.passportIssuer" required>
          </div>
          <div>
            <label>Дата выдачи:</label>
            <input type="date" v-model="form.buyer.passportDate" required>
          </div>
          <div>
            <label>Адрес регистрации:</label>
            <input v-model="form.buyer.address" required>
          </div>
          <div>
            <label>Телефон:</label>
            <input v-model="form.buyer.phone" required>
          </div>
        </div>
      </div>

      <div class="form-section">
        <h2>Данные автомобиля</h2>
        <div class="form-grid">
          <div>
            <label>Марка:</label>
            <input v-model="form.car.brand" required>
          </div>
          <div>
            <label>Модель:</label>
            <input v-model="form.car.model" required>
          </div>
          <div>
            <label>Год выпуска:</label>
            <input type="number" v-model="form.car.year" required>
          </div>
          <div>
            <label>VIN:</label>
            <input v-model="form.car.vin" required>
          </div>
          <div>
            <label>Регистрационный номер:</label>
            <input v-model="form.car.regNumber" required>
          </div>
          <div>
            <label>Цвет:</label>
            <input v-model="form.car.color" required>
          </div>
          <div>
            <label>Мощность (л.с.):</label>
            <input type="number" v-model="form.car.power" required>
          </div>
          <div>
            <label>Полная масса (кг):</label>
            <input type="number" v-model="form.car.totalWeight" required>
          </div>
          <div>
            <label>Собственная масса (кг):</label>
            <input type="number" v-model="form.car.ownWeight" required>
          </div>
          <div>
            <label>ПТС серия:</label>
            <input v-model="form.car.ptsSeries" required>
          </div>
          <div>
            <label>ПТС номер:</label>
            <input v-model="form.car.ptsNumber" required>
          </div>
          <div>
            <label>ПТС выдан:</label>
            <input v-model="form.car.ptsIssuer" required>
          </div>
          <div>
            <label>Дата выдачи ПТС:</label>
            <input type="date" v-model="form.car.ptsDate" required>
          </div>
          <div>
            <label>СТС серия:</label>
            <input v-model="form.car.stsSeries" required>
          </div>
          <div>
            <label>СТС номер:</label>
            <input v-model="form.car.stsNumber" required>
          </div>
          <div>
            <label>СТС выдан:</label>
            <input v-model="form.car.stsIssuer" required>
          </div>
          <div>
            <label>Дата выдачи СТС:</label>
            <input type="date" v-model="form.car.stsDate" required>
          </div>
          <div>
            <label>Цена (руб.):</label>
            <input type="number" v-model="form.car.price" required>
          </div>
        </div>
      </div>

      <button @click="generateContract">Сформировать договор</button>
      <button @click="fillTestData" class="test-btn">Заполнить тестовые данные</button>
    </div>

    <!-- Готовый договор -->
    <div v-if="showContract" class="contract-container" id="printableArea">
      <pre class="contract-text">
                                                                                  <strong>ДОГОВОР</strong>
                                                                    <strong>КУПЛИ-ПРОДАЖИ АВТОМОБИЛЯ</strong>

г. {{ form.contract.city }}                                                                 {{ currentDate }}

<strong>Продавец</strong>: {{ form.seller.fullName }}, дата рождения {{ form.seller.birthday }}
Паспорт: серия {{ form.seller.passportSeries }} № {{ form.seller.passportNumber }}, выдан {{ form.seller.passportIssuer }} {{ form.seller.passportDate }}
проживающий(ая): {{ form.seller.address }}
тел.: {{ form.seller.phone }}

и <strong>Покупатель</strong>: {{ form.buyer.fullName }}, дата рождения {{ form.buyer.birthday }}
Паспорт: серия {{ form.buyer.passportSeries }} № {{ form.buyer.passportNumber }}, выдан {{ form.buyer.passportIssuer }} {{ form.buyer.passportDate }}
проживающий(ая): {{ form.buyer.address }}
тел.: {{ form.buyer.phone }}

                                                                          <strong>заключили Договор</strong>
По настоящему Договору Покупатель обязуется принять и оплатить, а Продавец обязуется передать в собственность Покупателю следующее транспортное средство:

Марка и модель ТС: {{ form.car.brand }} {{ form.car.model }}
Идентификационный номер ТС (VIN): {{ form.car.vin }}
Регистрационный номер ТС: {{ form.car.regNumber }}
Год выпуска: {{ form.car.year }}
Кузов №: {{ form.car.vin }}
Шасси (рама) №: {{ form.car.vin }}
Экологический класс: Euro 2
Цвет ТС: {{ form.car.color }}
Двигатель №: {{ form.car.vin }}
Мощность двигателя: {{ form.car.power }} л.с.
Полная масса: {{ form.car.totalWeight }} кг
Масса без нагрузки: {{ form.car.ownWeight }} кг
Паспорт ТС: серия {{ form.car.ptsSeries }} № {{ form.car.ptsNumber }} выдан {{ form.car.ptsIssuer }} {{ form.car.ptsDate }}
Свидетельство о регистрации ТС: серия {{ form.car.stsSeries }} № {{ form.car.stsNumber }} выдано {{ form.car.stsIssuer }} {{ formattedStsDate }}

                                                                          <strong>Цена автомобиля</strong>
Цена автомобиля определяется соглашением Продавца и Покупателя и составляет денежную сумму в размере {{ form.car.price }} рублей
Продавец подтверждает факт отсутствия у автомобиля обременения от любых прав третьих лиц. Право собственности на автомобиль переходит к Покупателю в момент подписания настоящего Договора.
До заключения настоящего Договора Продавец подтверждает что автомобиль, никому не продан, не заложен, под арестом не находится, не имеет регистрационных ограничений.
Настоящий договор составлен в 2 экземплярах.

ТС (автомобиль)                                                   Деньги в сумме {{ form.car.price }} руб.
VIN: {{ form.car.vin }}

Получил                                                               Получил

___________________/{{ form.buyer.fullName }}/                ___________________/{{ form.seller.fullName }}/
      </pre>

      <button @click="printContract('printableArea')" class="print-btn">Печать</button>
      <button @click="showContract = false" class="edit-btn">Редактировать</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showContract: false,
      currentDate: new Date().toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
      form: {
        seller: {
          fullName: '',
          birthday: '',
          passportSeries: '',
          passportNumber: '',
          passportIssuer: '',
          passportDate: '',
          address: '',
          phone: ''
        },
        buyer: {
          fullName: '',
          birthday: '',
          passportSeries: '',
          passportNumber: '',
          passportIssuer: '',
          passportDate: '',
          address: '',
          phone: ''
        },
        car: {
          brand: '',
          model: '',
          year: '',
          vin: '',
          regNumber: '',
          color: '',
          power: '',
          totalWeight: '',
          ownWeight: '',
          ptsSeries: '',
          ptsNumber: '',
          ptsIssuer: '',
          ptsDate: '',
          stsSeries: '',
          stsNumber: '',
          stsIssuer: '',
          stsDate: '',
          price: ''
        },
        contract: {
          city: 'Москва'
        }
      }
    }
  },
  computed: {
    formattedStsDate() {
      const date = new Date(this.form.car.stsDate)
      return `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
    }
  },
  methods: {
    generateContract() {
      this.showContract = true
      window.scrollTo(0, 0)
    },
    printContract(divId) {
      const printContents = document.getElementById(divId).innerHTML
      const originalContents = document.body.innerHTML

      document.body.innerHTML = printContents
      window.print()
      document.body.innerHTML = originalContents
    },
    fillTestData() {
      this.form = {
        seller: {
          fullName: 'Иванов Иван Иванович',
          birthday: '1990-05-15',
          passportSeries: '4510',
          passportNumber: '123456',
          passportIssuer: 'ОУФМС России по Москве',
          passportDate: '2015-08-20',
          address: 'г. Москва, ул. Ленина, д.1',
          phone: '+7 (495) 123-45-67'
        },
        buyer: {
          fullName: 'Петров Петр Петрович',
          birthday: '1985-09-25',
          passportSeries: '4502',
          passportNumber: '654321',
          passportIssuer: 'ОУФМС России по СПб',
          passportDate: '2018-03-10',
          address: 'г. СПб, Невский пр-т, д.5',
          phone: '+7 (812) 987-65-43'
        },
        car: {
          brand: 'Toyota',
          model: 'Camry',
          year: '2018',
          vin: 'JTNBB46KX00314852',
          regNumber: 'А123ВС777',
          color: 'черный',
          power: '181',
          totalWeight: '2000',
          ownWeight: '1450',
          ptsSeries: '77АА',
          ptsNumber: '123456',
          ptsIssuer: 'ГИБДД г. Москвы',
          ptsDate: '2018-06-15',
          stsSeries: '77ВВ',
          stsNumber: '654321',
          stsIssuer: 'ГИБДД СПб',
          stsDate: '2020-09-20',
          price: '1850000'
        },
        contract: {
          city: 'Москва'
        }
      }
    }
  }
}
</script>

<style scoped>
@page {
  size: auto;
  margin: 15px;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.form-container {
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 15px rgba(0,0,0,0.1);
}

.form-section {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
  color: #333;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 15px;
}

button {
  background: #2c3e50;
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
}

button:hover {
  background: #34495e;
}

.contract-container {
  background: white;
  padding: 40px;
  line-height: 1.6;
}

.contract-text {
  white-space: pre-wrap;
  font-family: 'Times New Roman', serif;
  font-size: 14px;
  margin: 0;
}

@media print {
  button {
    display: none;
  }

  .contract-text {
    font-size: 12px;
  }
}
</style>