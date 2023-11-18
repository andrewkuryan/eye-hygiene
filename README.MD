# Eye Hygiene

Eye rest break notification service

## System tray controls tested compatability

<style>
    td {
        text-align: center;
        vertical-align: middle;
        padding: 5px;
    }

    td:first-child {
        text-align: left;
    }

    td.unavailable {
        background-color: #9f9f9f;
    }

    .icon {
        display: block;
        height: 24px;
        width: 24px;
        margin: auto;
    }

    .icon.full {
        background-image: url("https://firebasestorage.googleapis.com/v0/b/eye-hygiene.appspot.com/o/check-square-svgrepo-com.svg?alt=media&token=92b5210f-a4e2-4b13-8111-87aac107fe04");
    }

    .icon.partial {
        background-image: url("https://firebasestorage.googleapis.com/v0/b/eye-hygiene.appspot.com/o/partial-support-icon.svg?alt=media&token=977c8117-77fb-43eb-8b39-5e78d8c69076");
        position: relative;
    }

    .icon.partial sup {
        font-size: 14px;
        line-height: 14px;
        position: absolute;
        vertical-align: baseline;
        top: -5px;
        left: 26px;
    }
</style>

<table>
    <tr>
        <td></td>
        <td>Chrome 106</td>
        <td>Chrome 117</td>
        <td>Firefox 119</td>
        <td>Safari 17.0</td>
        <td>Edge 119</td>
        <td>Opera 104</td>
    </tr>
    <tr>
        <td>Mac OS 14.0</td>
        <td></td>
        <td><span class='icon full'></span></td>
        <td><span class='icon partial'><sup>[1]</sup></span></td>
        <td><span class='icon full'></span></td>
        <td><span class='icon full'></span></td>
        <td><span class='icon full'></span></td>
    </tr>
    <tr>
        <td>Windows</td>
        <td></td>
        <td></td>
        <td></td>
        <td class='unavailable'></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>KDE</td>
        <td></td>
        <td></td>
        <td></td>
        <td class='unavailable'></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>GNOME</td>
        <td></td>
        <td></td>
        <td></td>
        <td class='unavailable'></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>Xfce</td>
        <td></td>
        <td></td>
        <td></td>
        <td class='unavailable'></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>Cinnamon</td>
        <td></td>
        <td></td>
        <td></td>
        <td class='unavailable'></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>Android 6.0</td>
        <td><span class='icon partial'><sup>[1]</sup></span></td>
        <td class='unavailable'></td>
        <td></td>
        <td class='unavailable'></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>iOS</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
</table>

[1] Duration, current time, and progress bar seem to not be displayed in
Firefox. [Issue](https://bugzilla.mozilla.org/show_bug.cgi?id=1864301)

[2] Progress bar seem to be unsupported in this Android version