# Eye Hygiene

Eye rest break notification service

## System tray controls tested compatability

|             |    Chrome 106    | Chrome 117 |   Firefox 119    | Safari 17.0 | Edge 119 | Opera 104 |
|:------------|:----------------:|:----------:|:----------------:|:-----------:|:--------:|:---------:|
| Mac OS 14.0 |                  |     ✅      | ☑ <sup>[1]</sup> |      ✅      |    ✅     |     ✅     |
| Windows     |                  |            |                  |      ∅      |          |           |
| KDE         |                  |            |                  |      ∅      |          |           |
| GNOME       |                  |            |                  |      ∅      |          |           |
| Xfce        |                  |            |                  |      ∅      |          |           |
| Cinnamon    |                  |            |                  |      ∅      |          |           |
| Android 6.0 | ☑ <sup>[2]</sup> |     ∅      |                  |      ∅      |          |           |
| iOS         |                  |            |                  |             |          |           |

[1] Duration, current time, and progress bar seem to not be displayed in Firefox. [Issue](https://bugzilla.mozilla.org/show_bug.cgi?id=1864301)
[2] Progress bar seem to be unsupported in this Android version
