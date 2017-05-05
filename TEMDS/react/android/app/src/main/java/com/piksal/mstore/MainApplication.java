package com.piksal.mstore;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.gettipsi.stripe.StripeReactPackage;
import com.evollu.react.fcm.FIRMessagingPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.babisoft.ReactNativeLocalization.ReactNativeLocalizationPackage;
import com.auth0.lock.react.LockReactPackage;
import com.avishayil.rnrestart.ReactNativeRestartPackage;


import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        protected boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
            new StripeReactPackage(),
                    new FIRMessagingPackage(),
                    new ReactNativeLocalizationPackage(),
                    new LockReactPackage(),
                    new ReactNativeRestartPackage()
            );
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }
}
