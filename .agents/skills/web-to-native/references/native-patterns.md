# Native patterns: redesigning web UX for native

Disclosed reference for [`web-to-native`](../SKILL.md), step 4. `false-friends.md` translates _idioms_ (`div` → `View`); this translates _UX patterns_ — a web interaction into its native equivalent. Step 4 isn't a port, it's this redesign.

**Reach for `@expo/ui` first.** It renders real SwiftUI (iOS) and Jetpack Compose (Android), so its components look and feel _exactly_ like the OS — the difference between "native-ish RN" and "indistinguishable from an app Apple/Google shipped." See the `expo-ui` skill. Drop to styled RN primitives only for what `@expo/ui` doesn't cover: custom layouts (chat bubbles, bespoke cards) and **large data lists** (`@expo/ui` `List` is a JS-thread node per item — use `FlashList`/`FlatList` for feeds). `@expo/ui` runs in **Expo Go** (SDK 56+) — no dev build needed; reach for a dev build (the `expo-dev-client` skill) only for _custom_ native modules.

| Web pattern                         | Native redesign — reach for first                                         | Why                                                                |
| ----------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Top tab bar / nav links             | **NativeTabs** — bottom, liquid glass on iOS 26 (`expo-router`)           | Thumb-reachable, OS-native bar                                     |
| Page header / breadcrumb            | **large-title** Stack header + header **search field** (`expo-router`)    | The native screen frame                                            |
| In-page tabs / toggle group         | **SegmentedControl** — `@expo/ui` (`community/segmented-control`)         | Native segmented switch                                            |
| Modal / dialog                      | **BottomSheet** — `@expo/ui`                                              | Sheets _are_ the native modal                                      |
| `<select>` / dropdown               | **Picker**, or long-press **MenuView** — `@expo/ui` (`community/menu`)    | Native wheel / menu, no popover                                    |
| Accordion / "show more"             | **Collapsible** — `@expo/ui`                                              | Native disclosure                                                  |
| Settings / short list               | **List** + **FieldGroup** rows (Switch / Picker / TextInput) — `@expo/ui` | The Settings-app look                                              |
| Data feed / table / long list       | **FlashList** / `FlatList`, virtualized + momentum                        | Tables don't exist on mobile; `@expo/ui` `List` isn't for big data |
| Checkbox / toggle                   | **Switch** (on/off) or **Checkbox** (multi-select) — `@expo/ui`           | Native control, not a styled box                                   |
| Date / time input                   | **DateTimePicker** — `@expo/ui` (`community/datetime-picker`)             | Native wheel / calendar                                            |
| Range slider                        | **Slider** — `@expo/ui`                                                   |                                                                    |
| Onboarding / carousel / swipe pages | **PagerView** — `@expo/ui` (`community/pager-view`)                       | Native paging, not a scroll strip                                  |
| Refresh button / auto-poll          | pull-to-refresh (`RefreshControl`)                                        | The native refresh gesture                                         |
| Hover menu / tooltip                | long-press **MenuView** context menu — `@expo/ui` (`community/menu`)      | No hover on touch                                                  |
| Toast / snackbar                    | native banner + **haptic** (`expo-haptics`)                               |                                                                    |
| Buttons                             | `@expo/ui` **Button**; `Pressable` for custom                             | Native press + haptics                                             |
| Multi-column layout                 | single column + tabs / stack                                              | One thing at a time on a phone                                     |

**The test:** if a screenshot of the native screen could pass for the web version, you reskinned it. Redesign until it could pass for a screen the OS shipped.

## Feel — beyond the components

The table gets the right _components_; "native" also lives in _motion and touch_ — and a web port arrives with almost none, so you must add it. The tooling is in `expo-router` (navigation/transitions) and `building-native-ui` (motion/effects); reach for it, don't hand-roll:

- **Transitions for free** — use Expo Router's native-stack so push/pop, modals, and sheets animate with real platform physics; shared-element zoom via `expo-router` `zoom-transitions.md`.
- **Motion** — Reanimated (`withSpring`/`withTiming`; `entering`/`exiting` for list items) + `react-native-gesture-handler` for swipes/drags → `building-native-ui` `animations.md`.
- **Touch** — `expo-haptics` on commits, selection changes, and pull-to-refresh — choreography, not just a toast buzz.
- **Native rhythm** — large-title collapse on scroll, momentum / inverted scroll, a keyboard that pushes content (`KeyboardAvoidingView`).
- **Respect reduced motion** — gate non-essential animation on Reanimated's `useReducedMotion()`.

**Feel can't be screenshotted.** A janky transition or wrong easing passes a still-image parity check and still betrays the app — for screens with motion, verify with a short recording (iOS `xcrun simctl io booted recordVideo feel.mov`; Android `adb shell screenrecord`; or a device-agent flow), not just a screenshot.
