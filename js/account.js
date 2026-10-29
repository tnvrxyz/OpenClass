
(() => {
    const client = window.supabaseClient;
    const accountArea = document.getElementById("account-area");

    if (!accountArea) return;

    if (!client) {
        accountArea.textContent = "Account unavailable";
        console.error("OpenClass: Supabase client not found.");
        return;
    }

    function createElement(tag, className, text) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (text !== undefined) element.textContent = text;
        return element;
    }

    function closePanel() {
        const panel = accountArea.querySelector(".account-panel");
        const trigger = accountArea.querySelector(".account-trigger");

        if (panel) panel.classList.remove("open");
        if (trigger) trigger.setAttribute("aria-expanded", "false");
    }

    function renderLoggedOut() {
        accountArea.replaceChildren();

        const links = createElement("div", "auth-links");

        const login = createElement("a", "", "Log in");
        login.href = "login.html";

        const signup = createElement("a", "signup-link", "Sign up");
        signup.href = "signup.html";

        links.append(login, signup);
        accountArea.appendChild(links);
    }

    function renderLoggedIn(user) {
        accountArea.replaceChildren();

        const metadata = user.user_metadata || {};
        const username =
            metadata.display_name ||
            user.email?.split("@")[0] ||
            "Account";

        const avatarURL = metadata.avatar_url || "";

        const trigger = createElement("button", "account-trigger");
        trigger.type = "button";
        trigger.setAttribute("aria-expanded", "false");
        trigger.setAttribute("aria-label", "Open account menu");

        const avatar = createElement("img", "account-avatar");
        avatar.alt = "Profile picture";

        if (avatarURL) {
            avatar.src = avatarURL;
        } else {
            avatar.src =
                "data:image/svg+xml," +
                encodeURIComponent(
                    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="#dedede"/><circle cx="50" cy="36" r="19" fill="#777"/><path d="M15 100c2-26 16-38 35-38s33 12 35 38" fill="#777"/></svg>'
                );
        }

        const name = createElement("span", "account-username", username);
        const chevron = createElement("span", "account-chevron", "▼");

        trigger.append(avatar, name, chevron);

        const panel = createElement("div", "account-panel");

        const heading = createElement(
            "div",
            "account-panel-heading",
            "Your account"
        );

        const userSection = createElement("div", "account-panel-user");

        const panelAvatar = createElement(
            "img",
            "account-panel-avatar"
        );

        panelAvatar.src = avatar.src;
        panelAvatar.alt = "Profile picture";

        const userDetails = createElement("div");

        const panelName = createElement(
            "div",
            "account-panel-name",
            username
        );

        const email = createElement(
            "div",
            "account-panel-email",
            user.email || ""
        );

        userDetails.append(panelName, email);
        userSection.append(panelAvatar, userDetails);

        const links = createElement("div", "account-panel-links");

        const dashboard = createElement("a", "", "Edit profile");
        dashboard.href = "dashboard.html";

        const logout = createElement(
            "button",
            "logout-link",
            "Log out"
        );
        logout.type = "button";

        logout.addEventListener("click", async () => {
            logout.disabled = true;
            logout.textContent = "Logging out...";

            const { error } = await client.auth.signOut();

            if (error) {
                console.error("Logout failed:", error);
                logout.disabled = false;
                logout.textContent = "Log out";
                return;
            }

            closePanel();
            renderLoggedOut();
        });

        links.append(dashboard, logout);
        panel.append(heading, userSection, links);

        trigger.addEventListener("click", () => {
            const isOpen = panel.classList.toggle("open");
            trigger.setAttribute("aria-expanded", String(isOpen));
        });

        accountArea.append(trigger, panel);
    }

    async function updateAccount() {
        const { data, error } = await client.auth.getUser();

        if (error) {
            console.error("Could not check account:", error);
            renderLoggedOut();
            return;
        }

        if (data.user) {
            renderLoggedIn(data.user);
        } else {
            renderLoggedOut();
        }
    }

    document.addEventListener("click", (event) => {
        if (!accountArea.contains(event.target)) {
            closePanel();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closePanel();
        }
    });

    updateAccount();

    client.auth.onAuthStateChange((event, session) => {
        if (event === "INITIAL_SESSION") return;

        if (session?.user) {
            renderLoggedIn(session.user);
        } else {
            renderLoggedOut();
        }
    });
})();
