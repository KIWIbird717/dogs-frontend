# 🚀 Get started

##### 1. Установка зависимостей

```shell
npm install
```

##### 2. Запуск frontend. Есть несколько способов на выбор:

- **Рекомендуемый.** Выполнить билд и сразу сделать запуск
  ```shell
  npm run tg
  ```
- Отдельно сделать билд, а потом запустить его
  ```shell
  npm run build
  npm run start
  ```
- Запуск в dev моде. **Медленный и не стабильный в telegram webapp**
  ```shell
  npm run dev
  ```

##### Готово, ссылку на запущенный frontend можно вставить в telegram webapp.

##### Дополнение для разработки 👇

##### 3. Запустить **ngrok** на локальном устройстве:

Это понадобится для запуска приложения в окне Telegram webapp. В telegram webapp нельзя вставить ссылку, которая не использует **https** протокол.

- Данные для регистрации через **корпоративный аккаунт cyno** ngrok [Ngrok login](https://dashboard.ngrok.com/login)
  | email                | password             |
  |----------------------|----------------------|
  | development@xono.one | rephy8-fybDij-nazgas |
- _Опционально._ Может потребоваться процедура установки ngrok на устройство и авторизация в акаунт, про авторизацию в ngrok через терминал можно узнать тут: [Setup & Installation](https://dashboard.ngrok.com/get-started/setup/macos)
- Если была выполнена авторизацию через корпоративный аккаунт, то можно запустить ngrok tunnel следующими командами на выбор **(3000 - порт, на котором запущен проект на локалке)**:
  ```shell
   # № 1
   ngrok tunnel --label edge=edghts_2cM3nRLw8CI9EJc1ACGyb1bMFti 3000
   # или воспользоваться второй командой
   # № 2
   ngrok tunnel --label edge=edghts_2cjqgH7PN07CUnDj1d1XKA82ciX 3000
  ```

##### 4. Запуск в telegram webapp

Для запуска проекта в telegram webapp можно воспользоваться уже готовым ботом [Swipy Dating](https://t.me/swipy_dating_bot). Данный бот поддерживает команду для запуска другого проекта по предоставленной https ссылке.

- Необходимо отправить в бота одно из следующих сообщений:
  ```sh
    # если запущено на ngrok tunnel № 1
    /link https://c36e9febfb56b7f6.ngrok.app
    # если запущено на ngrok tunnel № 2
    /link https://e70d1cf77f746acd.ngrok.app
  ```
- Открыть telegram webapp приложение по высланной от бота ссылке

##### Готово! Проект готов к разработке.

- После запуска ngrok его можно больше не перезапускать, главное чтобы он был активен в запущенном терминале.
- Для просмотра внесенных изменений в проекте можно сделать ребилд (пункт 2.1 или 2.2) и переоткрыть telegram webapp приложение. Или можно запустить проект через `npm run dev` (пункт 2.3), тогда изменения будут приходит автоматически, но это может быть не быстро из-за проксирования приложения через ngrok.

# 🏗️ Структура проекта

На проекте используется структура FSD

- ссылка на подробную документацию FSD структуры [Feature-Sliced Design](https://feature-sliced.design/)
- ссылка на статью из документации FSD по использованию данной структуры с nextjs [Dealing with App Router](https://feature-sliced.design/docs/guides/tech/with-nextjs#app-router)
- На данном проекте структура немного адаптирована под nextjs.
  - `app` - директория для роутинга и страниц. Заменяет директорию `page` из FSD стиля
  - `entities` - директория согласно идеологии FSD
  - `features` - директория согласно идеологии FSD
  - `public` - директория для хранения медиа, конфигов и подобное. Объединяет в себе фолдер **public** из базовой структуры проекта на nextjs и фолдер **app** согласно идеологии FSD
  - `shared` - директория согласно идеологии FSD
  - `widgets` - директория согласно идеологии FSD

# 🔒 Предотвращение закрытия окна telegram webapp

**МОЖНО ОЗНАКОМИТСЯ С ДЕМО ПРОЕКТОМ, ГДЕ ПОКАЗАНО ВСЕ НА ПРИМЕРАХ** ВОТ ССЫЛКА НА РЕПОЗИТОРИЙ: https://github.com/KIWIbird717/prevent-tg-webapp-con-swipe-close

Окно telegram webapp может закрываться при свайпе вниз, если пользователь долистал с низу страницы до верха, или когда пользователь находится на странице, где нет скрола (то-есть контент помещается по высоте экрана) то если он сделает свайп вниз, то окно telegram webapp также свернется. Для каждого из этих случаев предусмотрено 3 сценария предотвращения закрытия окна telegram webapp:

##### 1. Для страниц со скролом.

Если на странице размещен контент который не помещается по ширине экрана (то-есть появляется скрол), то нужно использовать layout обвертку `View`. При использовании данной обертки предотвращается закрытие окна telegram webapp при скроле сверху вниз в начале страницы.

Пример:

```tsx
export default function WithViewFull() {
  return (
    <View className="flex flex-col gap-4 p-4">
      <Link href="./" className="rounded-xl bg-slate-100 px-4 py-2 text-[20px]">
        Назад
      </Link>
      <h1 className="text-center text-[40px] font-bold leading-[45px]">
        <span className="text-emerald-500">View</span> компонент и страница со скролом
      </h1>

      <PseduoContent />
    </View>
  );
}
```

##### 2. Для страниц без скрола. Кейс № 1

Если на странице контент помещается по ширине экрана без скрола, то для предотвращения закрытия страницы по свайпу внизу, можно также использовать обвертку `View`, контент от этого никак не изменится, но пропадет закрытие окна webapp по скролу вниз.

Это самый оптимальный вариант и в большинстве кейсов на страницах лучше использовать обвертку `View`. Но у первых 2-х способов есть небольшой минус в виде оверскрола страницы в самой верхней и нижней части страницы. Для предотвращения такого поведения есть 3-й способ.

#### 3. Для страниц без скрола. Кейс № 2

Если требуется полностью зафиксировать страницу с контентом который полностью помещается на экране (то-есть скрол при этом отсутствует) и при этом предотвратить закрытие окна telegram webapp, то для этого можно использовать хук `usePreventScroll`. Данный хук полностью блокирует эвент скрола в компоненте.
Описание хука и примеры использования в самом файле с хуком `usePreventScroll.ts`

# ⚛️ Как использовать redux на проекте

### Структура

Директория для redux в проекте расположена в `src/shared/lib/redux-store`

```
└── redux-store
    └── ...
```

- Для каждой или компонента страницы в проекте создается отдельный фолдер в папке `/redux-store/slices`.
- В каждой папке слайса обязательно нахождение самого файла с моделью слайса `<slice name>Slice.ts` и его экшены. А также файл `types.d.ts`, в котором находятся все используемые типы в слайсе.

  Название папки для каждого слайса должно быть связано со страницей на которой используется данный слайс. Например: если redux actions будут использованы на странице `my`, то название папки для слайса в директории `/redux-store/slices` должно быть `/my-slice`

  Итоговая структура фолдера для слайса должна выглядеть так:

  ```
  	└── my-slice
  	    ├── mySlice.ts
  	    └── types.ts
  ```

- **Опционально**. Если компонент на проекте требует слишком большого кол-ва экшенов, то в папке слайса для страницы можно поместить отдельную папку со слайсами для отдельного компонента. Вложенная структура должна повторять вышеописанную структуру для папки слайса. За исключением названия, оно должно быть связано не со страницей, а с названием компонента. Например:
  ```
  └── my-slice
  	  ├── component-slice
  	  │  ├── componentSlice.ts
  	  │  └── types.ts
  	  ├── mySlice.ts
  	  └── types.ts
  ```

### Создание слайса

На проекте используется **Reducers and Actions with createSlice** схема. Подробнее про архитектуру и примеры использования можно прочитать на официальном сайте redux: [Reducers and Actions with createSlice](https://redux.js.org/usage/migrating-to-modern-redux#reducers-and-actions-with-createslice)

- После создания слайса не забыть добавить его в `configureStore` и `combineReducers`. Обе функции находятся в `utils/redux/store.ts`.

  Название для поля слайса в `configureStore` и `combineReducers` должно совпадать с установленным названием для слайса в файле с моделью слайса (поле `name` в функции `createSlice`). Название для полей в `configureStore` и `combineReducers` должно быть одинаковым.

- Также хорошей практикой будет экспорт переменных из слайса с помощью namespace

- Пример создания слайса:

  ```ts
  // utils/redux/my-slice/mySlice.ts
  "use client";

  import { createSlice } from "@reduxjs/toolkit";
  import type IMySlice from "./types.d.ts";

  export namespace MySlice {
    /**
     * Создаем изначальное состояния для значений в слайсе.
     * Также применяем к изначальному состоянию тип этого состояния.
     *
     * Представим, что из файла utils/redux/my-slice/types.d.ts
     * экспортируется по дефолту такой интерфейс:
     * interface IMySlice {
     *   something: string | null
     * }
     */
    const initialState: IMySlice = {
      something: null,
    };

    // создаем слайс
    export const mySlice = createSlice({
      name: "my",
      initialState,
      reducers: {
        setSomething: (state, action: PayloadAction<IMySlice["something"]>) => {
          state.something = action.payload;
        },
      },
    });

    // экспорт слайса. Экспортируем экшены и редьюсеры
    export const { setSomething } = authSlice.actions;
    export const myReducer = mySlice.reducer;
    export const Type = IMySlice; // экспортируем тип слайса, чтобы его удобно можно было достать из namespace
  }
  ```

- Пример объединения редьюсеров:

  ```ts
  // frontend/src/shared/lib/redux-store/store.ts

  import { configureStore } from "@reduxjs/toolkit";
  import { MySlice } from "./slices/user-slice/userSlice";

  export const store = () => {
    return configureStore({
      reducer: {
        user: MySlice.myReducer,
      },
      /**
       * You cant set up more middlewares
       * Check instruction: @see https://redux-toolkit.js.org/api/serializabilityMiddleware
       */
      middleware: (gDM) => gDM({ serializableCheck: false }),
    });
  };

  // Infer the type of makeStore
  export type AppStore = ReturnType<typeof store>;
  // Infer the `RootState` and `AppDispatch` types from the store itself
  export type RootState = ReturnType<AppStore["getState"]>;
  export type AppDispatch = AppStore["dispatch"];
  ```

### Получение состояния

Для получения состояния из redux нужно использовать хук `useAppSelector` из файла `src/shared/lib/redux-store/hooks/index.ts`. Пример:

```ts
import { useAppSelector } from "@/shared/lib/redux-store/hooks";
import type { StoreState } from "@/utils/redux/store";

function Component() {
	const myState = useAppSelector((state: StoreState) => state.my.something)
	return (...)
}
```

### Мутация состояния

Для мутации (изменения) состояния в redux store используется хук `useDispatch` из библиотеки `react-redux`. А также необходимо импортировать редьюсер из вашего слайса. Пример мутации:

```ts
import { useAppDispatch } from "@/shared/lib/redux-store/hooks";
import { setSomething } from "@/utils/redux/my-slice/mySlice"

function Components() {
 const dispatch = useAppDispatch()

	const changeSomethingState = () => {
		dispatch(setSomething("something2"))
	}

	return (...)
}
```

## 🎨 Установка цветовой темы на проекте

На проекте не используется каких-либо хуков, который провайдят тему по приложению. На момент написания документации тема в приложении привязана исключительно к системной теме пользователя и реализации переключения светлой и темной темы нет.

Ниже описано как сконфигурирована цветовая тема на проекте и как ее расширять в процессе разработки.

### Реализация

1. Сперва все цвета устанавливаются в файле `globals.scss`. В начале файла в правиле `@layer` установлены 2 поля: `:root` и `@media (prefers-color-scheme: dark) { :root }`. В `:root` устанавливаются цвета для белой темы, в `@media (prefers-color-scheme: dark) { :root }` дублируется название цвета со свойством цвета для черной темы

   Пример:

   ```scss
   @layer base {
     // light mode
     :root {
       --main: #000;
     }

     // dark mode
     @media (prefers-color-scheme: dark) {
       :root {
         --main: #fff;
       }
     }
   }
   ```

2. После того как цвета были установлены в `globals.scss` файле, эти значения нужно перенести в `tailwind.config.ts` файл. Цвета определяются в соответствеющих полях. Цвета нужно импортировать только из файла `globals.scss` с использованием css функции `var()`. В поле с цветом определять объект с обязательным полем `DEFAULT`, в него передается дефолтный цвет, если у цвета существуют оттенки, то добалять дополнительные поля по типу `accent`, поля с прозрачностю для цвета определять через `900`, `800`, `700` и и.д. Если цвет нужно определить для всех tailwind свойств, то вносить цвета в поле `colors`, если нужно определить для определенного свойства, например для `backgroundImage`, то определять цвет только в поле `backgroundImage`.

   Пример:

   ```typescript
   const config: Config = {
     theme: {
       colors: {
         main: {
           DEFAULT: "var(--main)",
         },
       },
     },
   };
   ```

# 🖨️ Logger

Класс Logger выводит сообщения в консоль в зависимости от настроек окружения.

## Get started with logger

Использовать вместо обычного console.log, console.error, console.warn. Данный
класс должен использоваться только во время разработки. После сборки проекта
отключить вывод сообщений в консоль в .env файле поставив переменную окружения
`NEXT_PUBLIC_LOGGER_STATE = off`. Изначально переменная окружения `NEXT_PUBLIC_LOGGER_STATE`

стоит в значении `on`.

Если в логере нужно отслеживать где была вызвана ошибка, то в переменной окружения
в .env файле нужно поставить переменную окружения `NEXT_PUBLIC_NEXT_PUBLIC_TRACE_ERRORS = true`.
Таким образом в консоли будет отображаться стек вызовов функций.

## Usage

```typescript
// Логирование без контекста
Logger.log("log message"); // [LOG] 05:10:21 - log message
Logger.debug("debug message"); // [DEBUG] 05:10:21 - debug message
Logger.warn("warn message"); // [WARN] 05:10:21 - warn message
Logger.error("error message"); // [ERROR] 05:10:21 - error message

// Логирование c контекста
const logger = new Logger("context");
logger.log("log message with context"); // [LOG] 05:10:21 [context] - log message with context
logger.debug("debug message with context"); // [DEBUG] 05:10:21 [context] - debug message with context
logger.warn("warn message with context"); // [WARN] 05:10:21 [context] - warn message with context
logger.error("error message with context"); // [ERROR] 05:10:21 [context] - error message with context
```
