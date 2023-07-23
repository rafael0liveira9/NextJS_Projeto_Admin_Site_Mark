import Head from "next/head";
import { Router } from "next/router";
import { Provider } from "react-redux";
import { store } from "src/store";
import NProgress from "nprogress";
import { CacheProvider } from "@emotion/react";
import { defaultACLObj } from "src/configs/acl";
import "src/configs/i18n";
import themeConfig from "src/configs/themeConfig";
import "src/@fake-db";
import { Toaster } from "react-hot-toast";
import AclGuard from "src/@core/components/auth/AclGuard";
import AuthGuard from "src/@core/components/auth/AuthGuard";
import GuestGuard from "src/@core/components/auth/GuestGuard";
import WindowWrapper from "src/@core/components/window-wrapper";
import ThemeComponent from "src/@core/theme/ThemeComponent";
import UserLayout from "src/layouts/UserLayout";
import Spinner from "src/@core/components/spinner";
import {
  SettingsConsumer,
  SettingsProvider
} from "src/@core/context/settingsContext";
import { PackagesProvider } from "src/context/PackagesContext";
import { AuthProvider } from "src/context/AuthContext";
import ReactHotToast from "src/@core/styles/libs/react-hot-toast";
import { createEmotionCache } from "src/@core/utils/create-emotion-cache";
import nookies from "nookies";

import "prismjs";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/themes/prism-tomorrow.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "src/iconify-bundle/icons-bundle-react";
import "../../styles/globals.css";
import "../../styles/start.css";

const clientSideEmotionCache = createEmotionCache();

if (themeConfig.routingLoader) {
  Router.events.on("routeChangeStart", () => {
    NProgress.start();
  });
  Router.events.on("routeChangeError", () => {
    NProgress.done();
  });
  Router.events.on("routeChangeComplete", () => {
    NProgress.done();
  });
}

const Guard = ({ children, authGuard, guestGuard, cookies, anonUser }) => {
  if (anonUser) {
    return <>{children}</>;
  }
  if (guestGuard) {
    return (
      <GuestGuard cookies={cookies} fallback={<Spinner />}>
        {children}
      </GuestGuard>
    );
  } else if (!guestGuard && !authGuard) {
    return <>{children}</>;
  } else {
    return (
      <AuthGuard cookies={cookies} fallback={<Spinner />}>
        {children}
      </AuthGuard>
    );
  }

};

const App = (props) => {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
    cookies,
  } = props;

  const contentHeightFixed = Component.contentHeightFixed ?? false;

  const getLayout =
    Component.getLayout ??
    ((page) => (
      <UserLayout contentHeightFixed={contentHeightFixed}>{page}</UserLayout>
    ));
  const setConfig = Component.setConfig ?? undefined;
  const authGuard = Component.authGuard ?? true;
  const anonUser = Component.anonUser ?? false;
  const guestGuard = Component.guestGuard ?? false;
  const aclAbilities = Component.acl ?? defaultACLObj;

  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>{`${themeConfig.templateName} - Mark`}</title>
          <meta
            name="description"
            content={`${themeConfig.templateName} – Mark, é uma agência de marketing digital de Curitiba/PR`}
          />
          <meta
            name="keywords"
            content="Mark, Marketing Digital, divulgação, Marketing, Publicidade, Tráfego Pago, ADS, Midias Sociais, Criar Site"
          />
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>

        <AuthProvider cookies={cookies}>
          <PackagesProvider>
            <SettingsProvider
              {...(setConfig ? { pageSettings: setConfig() } : {})}
            >
              <SettingsConsumer>
                {({ settings }) => {
                  return (
                    <ThemeComponent settings={settings}>
                      <WindowWrapper>
                        <Guard
                          authGuard={authGuard}
                          guestGuard={guestGuard}
                          cookies={cookies}
                          anonUser={anonUser}
                        >
                          <AclGuard
                            aclAbilities={aclAbilities}
                            guestGuard={guestGuard}
                            cookies={cookies}
                            anonUser={anonUser}
                          >
                            {getLayout(<Component {...pageProps} />)}
                          </AclGuard>
                        </Guard>
                      </WindowWrapper>
                      <ReactHotToast>
                        <Toaster
                          position={settings.toastPosition}
                          toastOptions={{ className: "react-hot-toast" }}
                        />
                      </ReactHotToast>
                    </ThemeComponent>
                  );
                }}
              </SettingsConsumer>
            </SettingsProvider>
          </PackagesProvider>
        </AuthProvider>
      </CacheProvider>
    </Provider>
  );
};

App.getInitialProps = async (ctx) => {
  const cookies = nookies.get(ctx.ctx);
  return { cookies };
};

export default App;
