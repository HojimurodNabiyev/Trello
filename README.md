Trello Desk.

Vue 3, Vite, Quasar va Pinia yordamida yaratilgan Trello uslubidagi Task Manager ilovasi. Foydalanuvchilar tasklar yaratishi, ularni tartibga solishi va ustida ishlashi mumkin.


Live Demo:
[Netlify-](https://nabiyev-trello.netlify.app)


Texnologiyalar:
[Vue 3](https://vuejs.org/) — Composition API asosida
[Vite](https://vitejs.dev/) — Tez development muhiti
[Pinia](https://pinia.vuejs.org/) — State Management
[Quasar Framework](https://quasar.dev/) — UI komponentlar
[Axios](https://axios-http.com/) — API bilan ishlash
[SortableJS](https://sortablejs.github.io/Sortable/) — Drag-and-Drop funksiyasi
Local Storage — Auth ma’lumotlarini saqlash


Funktsiyalar:
Oddiy autentifikatsiya (Login)
Tasklarni yaratish, o‘zgartirish va o‘chirish
Tasklarni ustunlar (kolonka) bo‘ylab ko‘chirish (drag-and-drop)
Tasklarni filtrlash va saralash
Taskni dialog (modal) orqali tahrirlash
Pinia orqali ma’lumotlarni boshqarish
Backend bilan Axios orqali ishlash (GET, POST, PATCH, DELETE)
Responsiv dizayn (mobil qurilmalarda ham ishlaydi)


Loyihani lokal ishga tushurish:
bash
# repozitoriyani klonlash
git clone https://github.com/HojimurodNabiyev/Trello.git

cd Trello

# paketlarni o‘rnatish
npm install

# dev serverni ishga tushurish
npm run dev
