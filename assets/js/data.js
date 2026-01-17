// Centralized Data Layer for My Land Property and Developers
const DATA_KEY = 'myland_db_v1';

// Initial default data
const DEFAULT_DATA = {
    settings: {
        site_name: "My Land Property and Developers",
        hero_image: null,
        whatsapp_number: "923001234567",
        contact_phone: "923001234567",
        contact_email: "info@myland.com",
        about_title: "About My Land Property and Developers",
        about_body: "We are a leading real estate agency dedicated to helping you find the perfect property. With years of experience and a deep understanding of the local market, we provide expert guidance and transparent dealings for all our clients.",
        good_things: "Trusted Guidance:Expert advice for your real estate journey.\nTransparent Dealing:Honest and clear transactions every time.\nLocal Expertise:Deep knowledge of Turbat's real estate market.",
        admin_user: "admin",
        admin_pass: "admin123"
    },
    properties: [
        {
            id: 1,
            title: "Prime Residential Plot",
            location: "Phase 1, Turbat",
            price: "2500000",
            status: "Available",
            type: "Plot",
            main_image: "",
            description: "Exciting opportunity to own a prime residential plot in the heart of Turbat Valley. Perfect for building your dream home.",
            plot_map_json: '{"01":"available", "02":"sold", "03":"available", "04":"reserved", "05":"available"}'
        }
    ],
    bookings: [],
    requests: []
};

// Initialize or Load Data
function loadData() {
    const stored = localStorage.getItem(DATA_KEY);
    if (!stored) {
        localStorage.setItem(DATA_KEY, JSON.stringify(DEFAULT_DATA));
        return DEFAULT_DATA;
    }
    return JSON.parse(stored);
}

function saveData(data) {
    localStorage.setItem(DATA_KEY, JSON.stringify(data));
    // Trigger an event so other components can know data changed
    window.dispatchEvent(new Event('dataChanged'));
}

// Global data object
let db = loadData();

// Helper functions
const DataManager = {
    getSettings: () => db.settings,
    saveSettings: (newSettings) => {
        db.settings = { ...db.settings, ...newSettings };
        saveData(db);
    },
    getProperties: () => db.properties,
    getPropertyById: (id) => db.properties.find(p => p.id == id),
    saveProperty: (property) => {
        if (property.id) {
            const index = db.properties.findIndex(p => p.id == property.id);
            if (index !== -1) db.properties[index] = property;
        } else {
            property.id = Date.now();
            db.properties.push(property);
        }
        saveData(db);
    },
    deleteProperty: (id) => {
        db.properties = db.properties.filter(p => p.id != id);
        saveData(db);
    },
    addBooking: (booking) => {
        booking.id = Date.now();
        db.bookings.push(booking);
        saveData(db);
    },
    addRequest: (request) => {
        request.id = Date.now();
        db.requests.push(request);
        saveData(db);
    }
};

// Export for use in other scripts
window.DataManager = DataManager;
