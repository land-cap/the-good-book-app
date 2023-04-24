if (typeof document !== 'undefined') {
    const splash = document.createElement('div')
    splash.style =
        'z-index: 20; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgb(240 253 250)'
    document.body.appendChild(splash)
    setTimeout(() => document.body.removeChild(splash), 1000)
}
