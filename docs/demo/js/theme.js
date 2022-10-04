class Theme {

    constructor(props = {
        init: true,
        defaultTheme: 'system',
        initGlobal: true
    }) {

        this.defaultTheme = props.defaultTheme;
        this.selectedTheme = this.defaultTheme;
        this.initialized = false;

        if(props.initGlobal)
        {
            window['theme'] = this;
        }

        if(props.init)
        {
            this.init();
        }

    }

    /**
     * @info internal function
     * @param {string} to 
     * @do set "data-theme" attribute to root
     * @returns to
     */
    _changeTheme(to) {
        var rootEl = document.documentElement;
        rootEl.setAttribute("data-theme", to);
        return to;
    }

    /**
     * 
     * @returns system theme by using "color-scheme" in dark/light
     */
    getSystemTheme() {
        const system_color_scheme = window.matchMedia("(prefers-color-scheme: dark)");
        if (system_color_scheme.matches) {
            return "dark";
        } else {
            return "light";
        }
    }

    /**
     * 
     * @returns current selected theme by manual or system
     */
    getDocumentTheme() {
        var rootEl = document.documentElement;
        let attr = rootEl.getAttribute("data-theme");
        let theme = this.getSystemTheme();
        if (attr) {
            theme = attr;
        }
        return theme;
    }

    /**
     * 
     * @param {string} mode 
     * @do set/change theme
     */
    setTheme(mode = "light") {
        this.selectedTheme = this._changeTheme(mode);
    }

    /**
     * @do toggle b/w dark/light theme
     */
    toggleTheme() {
        return this.getTheme() === "light" ? this.setTheme("dark") : this.setTheme("light");
    }

    /**
     * Initialize theme
     */
    init() {
        if(this.defaultTheme === "system") {
            this.setTheme(this.getSystemTheme());
        }
        else {
            this.setTheme(this.defaultTheme);
        }

        this.initialized = true;
    }

    /**
     * @returns get current active theme
     */
    getTheme() {
        return this.selectedTheme;
    }
    
};