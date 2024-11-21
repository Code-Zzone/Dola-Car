
// استيراد Firebase Libraries

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getDatabase, ref, push, set, onValue } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";


const firebaseConfig = {
  apiKey: "AIzaSyDZNhlq4a1DWW2LTbMTaUJhA1MIPkeq1UY",
  authDomain: "mohamed-adel-e2e13.firebaseapp.com",
  databaseURL: "https://mohamed-adel-e2e13-default-rtdb.firebaseio.com",
  projectId: "mohamed-adel-e2e13",
  storageBucket: "mohamed-adel-e2e13.firebasestorage.app",
  messagingSenderId: "806857656486",
  appId: "1:806857656486:web:407269dafb311284b6cc67"
};


// تهيئة Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// إعدادات الموقع
const siteSettings = [
  { key: 'siteName', elementId: 'siteLink' },
  { key: 'description', elementId: 'decription' },
  { key: 'bookingButtonText', elementId: 'orderNow' },
  { key: 'heading', elementId: 'heading' },
  { key: 'aboutUsDescription', elementId: 'aboutUs' },
  { key: 'aboutUsHeading', elementId: 'aboutUsHeading' },
  { key: 'servicesHeading', elementId: 'headingServices' },
  { key: 'serviceOneHeading', elementId: 'serviceHeadingOne' },
  { key: 'serviceTwoHeading', elementId: 'serviceHeadingTwo' },
  { key: 'serviceThreeHeading', elementId: 'serviceHeadingThree' },
  { key: 'serviceFourHeading', elementId: 'serviceHeadingFour' },
  { key: 'serviceOneDescription', elementId: 'serviceDescriptionOne' },
  { key: 'serviceTwoDescription', elementId: 'serviceDescriptionTwo' },
  { key: 'serviceThreeDescription', elementId: 'serviceDescriptionThree' },
  { key: 'serviceFourDescription', elementId: 'serviceDescriptionFour' }
];

// دالة لتحديث النصوص في الصفحة بناءً على قاعدة البيانات
const updateContent = (key, elementId) => {
  const refPath = ref(db, `/siteSettings/${key}`);
  onValue(refPath, (snapshot) => {
    const value = snapshot.val();
    if (value) {
      document.getElementById(elementId).textContent = value;
    }
  });
};

// تطبيق التحديثات لجميع الإعدادات
siteSettings.forEach(setting => {
  updateContent(setting.key, setting.elementId);
});

// دالة لحفظ بيانات العملاء في Realtime Database
function storeCustomerData(name, email, message, phone) {
  const customersRef = ref(db, 'customers');
  const newCustomerRef = push(customersRef);
  set(newCustomerRef, {
    name: name,
    email: email,
    message: message,
    phone: phone,
    timestamp: new Date().toISOString()
  })
  .then(() => {
    alert("تم إرسال رسالتك بنجاح!");
  })
  .catch((error) => {
    console.error("حدث خطأ أثناء حفظ البيانات: ", error);
    alert("حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.");
  });
}

// ربط النموذج بحدث الإرسال
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;
  const phone = document.getElementById("phone").value;

  // استدعاء الدالة لحفظ البيانات في Realtime Database
  storeCustomerData(name, email, message, phone);

  // تنظيف الحقول بعد الإرسال
  document.getElementById("contactForm").reset();
});

// ظهور الأقسام عند التمرير
const sections = document.querySelectorAll('.section');
window.addEventListener('scroll', () => {
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop < window.innerHeight - 100) {
      section.classList.add('visible');
    }
  });
});

// التعامل مع الرسالة
const visitorMessage = document.getElementById("visitorMessage");
const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");

// تسجيل الرد في Firebase
function logVisitorResponse(response) {
  const responseRef = ref(db, 'visitorResponses');
  const newResponseRef = push(responseRef);
  set(newResponseRef, {
    response: response,
    timestamp: new Date().toISOString()
  });
}

// إخفاء الرسالة وعرض الرد
yesButton.addEventListener("click", function() {
  logVisitorResponse("نعم");
  // visitorMessage.style.display = 'none';
  document.getElementById('backAsk').style.display = 'none';
});

noButton.addEventListener("click", function() {
  logVisitorResponse("لا");
  visitorMessage.style.display = 'none';
  document.getElementById('backAsk').style.display = 'none';

});

// زر التمرير لأعلى
const scrollToTopButton = document.querySelector('.scroll-to-top');
window.onscroll = () => {
  if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
    scrollToTopButton.style.display = 'block';
  } else {
    scrollToTopButton.style.display = 'none';
  }
};
