const config = {
    site: {
        title: process.env.NEXT_PUBLIC_SITE_TITLE,
        logo: process.env.NEXT_PUBLIC_SITE_LOGO,
    },
    api: {
        url: process.env.NEXT_PUBLIC_API_URL,
        version: process.env.NEXT_PUBLIC_API_VERSION,
    },
    firebase: {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    },
}

export default config
