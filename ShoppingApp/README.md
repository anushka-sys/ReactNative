This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.



Good. Now we connect everything into one full movie from start → finish.
No pieces missing.
We’ll follow one cart item through its entire life cycle.
The Big Picture
You built a persistence loop:
Storage ⇄ React State

Two effects create this loop:
Load from storage when app starts
Save to storage whenever cart changes

Now let’s run the movie.
SCENE 1 — First time ever opening the app
User installs and opens app for the first time.
What React state looks like at first render

JavaScript
cartItems = []
isLoaded = false

Because React always starts fresh.
It has zero memory of previous sessions.
SCENE 2 — Load effect runs (getItem)
This effect runs once on startup:
JavaScript
const stored = await AsyncStorage.getItem(CART_STORAGE_KEY);
What getItem() actually does
Think of AsyncStorage like a small phone database:
Key
Value
CART_STORAGE_KEY
"[{id:1,name:'Shoes'}]"
Important truth: AsyncStorage can store ONLY STRINGS.
So it returns either:
"some JSON string"
or null (nothing saved yet)
First time app ever opens
Storage is empty → returns:
JavaScript
stored = null
So this block does nothing:
JavaScript
if (stored !== null) {
   setCartItems(JSON.parse(stored))
}
Then:
JavaScript
setIsLoaded(true)
Meaning: "Okay, storage check finished."
Now app is ready.
SCENE 3 — User adds item to cart
User taps Add to cart
This happens somewhere:
JavaScript
setCartItems(prev => [...prev, newItem])
React state becomes:
JavaScript
cartItems = [Shoes]
React re-renders UI → cart shows item.

SCENE 4 — Save effect runs (setItem)
Because cartItems changed, this effect triggers:
JavaScript
await AsyncStorage.setItem(
  CART_STORAGE_KEY,
  JSON.stringify(cartItems)
);
What happens inside setItem
Step 1 — Convert JS → string
JavaScript
[ {id:1,name:'Shoes'} ]
↓
"[{\"id\":1,\"name\":\"Shoes\"}]"

Step 2 — Store on phone
Storage now contains:
Key
Value
CART_STORAGE_KEY
"[Shoes]"
Now the cart is permanently saved.
User closes app.
React memory dies. Storage survives.

SCENE 5 — Next day user opens app again
App starts fresh again.
React state resets:
JavaScript
cartItems = []
isLoaded = false
But AsyncStorage still contains:
JavaScript
"[Shoes]"

SCENE 6 — Save effect tries to run (blocked)
On startup, all effects run once.
Save effect tries to run, but:
JavaScript
if (!isLoaded) return;
Saving is BLOCKED.
This prevents overwriting storage with empty cart.
This moment is the entire reason isLoaded exists.

SCENE 7 — Load effect runs again
Now we read storage:
JavaScript
stored = await AsyncStorage.getItem(key)
This time it returns:
JavaScript
stored = "[{\"id\":1,\"name\":\"Shoes\"}]"
Now this line runs:
JavaScript
setCartItems(JSON.parse(stored))
String → real JS array.
React state becomes:
JavaScript
cartItems = [Shoes]
Then:
JavaScript
setIsLoaded(true)
App is now hydrated (restored).
UI shows cart instantly.
SCENE 8 — Save effect runs safely
Because isLoaded just became true, save effect runs once.
It saves the same correct cart again.
Now both storage and state are synced.
From now on (normal app usage)
Whenever user:
adds item
removes item
clears cart
This happens automatically:
React state changes → Save effect runs → Storage updated.
Loop continues forever.
The Loop Diagram (burn this into memory)

APP START
   ↓
React state = empty
   ↓
Load effect → getItem()
   ↓
State restored from storage
   ↓
isLoaded = true
   ↓
User changes cart
   ↓
Save effect → setItem()
   ↓
Storage updated
   ↓
User closes app
   ↓
Repeat forever
Final blunt truth
AsyncStorage is the memory of the app.
React state is the temporary working memory.
Your two effects continuously copy data between them so the app never forgets the user’s cart.
