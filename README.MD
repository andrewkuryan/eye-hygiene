# Eye Hygiene

Eye rest break notification service

## System tray controls tested compatibility

### Desktop

|                            |                   Chrome 119                   |                  Firefox 119                   |         Safari 17.0          |                    Edge 119                    |                   Opera 104                    |
|----------------------------|:----------------------------------------------:|:----------------------------------------------:|:----------------------------:|:----------------------------------------------:|:----------------------------------------------:|
| Mac OS 14.0                |           ![Full support][full-icon]           | ![Partial support][partial-icon]<sup>[1]</sup> |  ![Full support][full-icon]  |           ![Full support][full-icon]           |           ![Full support][full-icon]           |
| Windows 10                 | ![Partial support][partial-icon]<sup>[2]</sup> | ![Partial support][partial-icon]<sup>[2]</sup> | ![Not available][empty-icon] | ![Partial support][partial-icon]<sup>[2]</sup> | ![Partial support][partial-icon]<sup>[2]</sup> |
| Windows 11                 | ![Partial support][partial-icon]<sup>[2]</sup> | ![Partial support][partial-icon]<sup>[2]</sup> | ![Not available][empty-icon] | ![Partial support][partial-icon]<sup>[2]</sup> | ![Partial support][partial-icon]<sup>[2]</sup> |
| KDE (Neon 5.27)            |           ![Full support][full-icon]           | ![Partial support][partial-icon]<sup>[1]</sup> | ![Not available][empty-icon] |           ![Full support][full-icon]           |           ![Full support][full-icon]           |
| GNOME (Ubuntu 22.04.3)     | ![Partial support][partial-icon]<sup>[2]</sup> | ![Partial support][partial-icon]<sup>[2]</sup> | ![Not available][empty-icon] | ![Partial support][partial-icon]<sup>[2]</sup> | ![Partial support][partial-icon]<sup>[2]</sup> |
| Xfce (Linux Mint 21.2)     |      ![No support][no-icon]<sup>[3]</sup>      | ![Partial support][partial-icon]<sup>[2]</sup> | ![Not available][empty-icon] |      ![No support][no-icon]<sup>[3]</sup>      |      ![No support][no-icon]<sup>[3]</sup>      |
| Cinnamon (Linux Mint 21.2) |           ![Full support][full-icon]           | ![Partial support][partial-icon]<sup>[1]</sup> | ![Not available][empty-icon] |           ![Full support][full-icon]           |           ![Full support][full-icon]           |

### Mobile

|              |                   Chrome 119                   |                  Firefox 119                   |            Safari            |     Edge 119      |                    Opera 78                    |
|--------------|:----------------------------------------------:|:----------------------------------------------:|:----------------------------:|:-----------------:|:----------------------------------------------:|
| Android 12.0 | ![Partial support][partial-icon]<sup>[2]</sup> | ![Partial support][partial-icon]<sup>[2]</sup> | ![Not available][empty-icon] | TBD<sup>[4]</sup> | ![Partial support][partial-icon]<sup>[2]</sup> |
| Android 13.0 |           ![Full support][full-icon]           | ![Partial support][partial-icon]<sup>[1]</sup> | ![Not available][empty-icon] | TBD<sup>[4]</sup> |           ![Full support][full-icon]           |
| Android 14.0 |           ![Full support][full-icon]           | ![Partial support][partial-icon]<sup>[1]</sup> | ![Not available][empty-icon] | TBD<sup>[4]</sup> |           ![Full support][full-icon]           |
| iOS          |                      TBD                       |                      TBD                       |             TBD              |        TBD        |                      TBD                       |

[full-icon]: https://firebasestorage.googleapis.com/v0/b/eye-hygiene.appspot.com/o/full-support-wrapper.svg?alt=media&token=2747adbb-51d4-4d0e-affd-836a269ea97e

[partial-icon]: https://firebasestorage.googleapis.com/v0/b/eye-hygiene.appspot.com/o/partial-support-wrapper.svg?alt=media&token=b4cdda9e-f282-4bce-952b-49de437e41f6

[no-icon]: https://firebasestorage.googleapis.com/v0/b/eye-hygiene.appspot.com/o/no-support-wrapper.svg?alt=media&token=abfbc554-f614-4671-b4fd-9ae32081d847

[empty-icon]: https://firebasestorage.googleapis.com/v0/b/eye-hygiene.appspot.com/o/empty-set-wrapper.svg?alt=media&token=783eda0e-5f1a-4d32-aea5-951ed64d2dfb

[1] Setting duration and current time isn't available in Firefox. [Issue](https://bugzilla.mozilla.org/show_bug.cgi?id=1864301).

[2] Progress bar is not supported in this OS at the native level.

[3] Media Session doesn't work in Chromium-based browsers in this OS. [Issue](https://bugs.chromium.org/p/chromium/issues/detail?id=1501792).

[4] Edge doesn't seem to work in Android emulators. [Discussion](https://www.reddit.com/r/MicrosoftEdge/comments/14yzbg7/is_ms_edge_supposed_to_work_on_android_emulators/). 