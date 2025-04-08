// بيانات المنتجات
const products = [
    {
        id: 1,
        title: "كتاب البرمجة للمبتدئين",
        proginalprice:37.12,
        price: 29.99,
        description1:"Lorem ipsum dolor sit amet",
        description: " consectetur adipisicing elit. Molestiae tempora laboriosam repellendus veniam et quisquam praesentium optio! At corporis sed id. Nemo itaque illum, quam numquam esse nostrum. Pariatur, deserunt.",
        image: "image/java.mp4",
        starss:'<span class="star" data-value="1"><i class="fas fa-star"></i></span><span class="star" data-value="2"><i class="fas fa-star"></i></span><span class="star" data-value="3"><i class="fas fa-star"></i></span><span class="star" data-value="4"><i class="fas fa-star"></i></span> <span class="star" data-value="5"><i class="fas fa-star-half-alt"></i></span>'
    },
    {
        id: 2,
        title: "دورة تطوير الويب",
        proginalprice:60.00,
        price: 49.99,
        description1:"Lorem ipsum dolor sit amet",
        description: " consectetur adipisicing elit. Molestiae tempora laboriosam repellendus veniam et quisquam praesentium optio! At corporis sed id. Nemo itaque illum, quam numquam esse nostrum. Pariatur, deserunt.",
        image: "image/moha.mp4",
        starss:'<span class="star" data-value="1"><i class="fas fa-star"></i></span><span class="star" data-value="2"><i class="fas fa-star"></i></span><span class="star" data-value="3"><i class="fas fa-star"></i></span><span class="star" data-value="4"><i class="fas fa-star"></i></span> <span class="star" data-value="5"><i class="fas fa-star-half-alt"></i></span>'
    },
    {
        id: 3,
        title: "قوالب تصميم مواقع",
        proginalprice:25.77,
        price: 19.99,
        description1:"Lorem ipsum dolor sit amet ",
        description: " consectetur adipisicing elit. Molestiae tempora laboriosam repellendus veniam et quisquam praesentium optio! At corporis sed id. Nemo itaque illum, quam numquam esse nostrum. Pariatur, deserunt.",
        image: "https://youtu.be/Pp0VuGTVRDU?si=Z91TdT_cRHzxl6TK",
        starss:'<span class="star" data-value="1"><i class="fas fa-star"></i></span><span class="star" data-value="2"><i class="fas fa-star"></i></span><span class="star" data-value="3"><i class="fas fa-star"></i></span><span class="star" data-value="4"><i class="fas fa-star-half-alt"></i></span> <span class="star" data-value="5"><i class="fas fa-star-half-alt"></i></span>'
    }
];

document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    updateTotalAmount();
    loadPurchasedPage();
    setupMenuToggle();
});

// القائمة المتحركة للهواتف
function setupMenuToggle() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');
    menuToggle.addEventListener('click', () => {
        navbar.classList.toggle('active');

    });
    
}

// عرض المنتجات في الصفحة الرئيسية
function displayProducts() {
    const productsGrid = document.querySelector('.products-grid');
    if (productsGrid) {
        productsGrid.innerHTML = '';
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-image">
                    <video src="${product.image}"></video>
                </div>
                <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <div class="price">
                    <span class="original-price" style="text-decoration: line-through;">$${product.proginalprice.toFixed(2)}</span>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                </div>
                <div>
                    <h3 class="product-description1">${product.description1}<span>...</span></h3>
                    <h3 class="product-description">${product.description}</h3>
                </div>
                <div class="stars">
                    ${product.starss}
                </div>
                    <div class="button">
                        <button class="add-to-cart"  data-id="${product.id}">add to cart</button>
                        <button class="add-to-dtls" data-id="${product.id}"><a href="product.html?id=${product.id}" class="buy-btn">عرض التفاصيل</a></button> 
                    </div>
                </div>
            `;
            
            productsGrid.appendChild(productCard);
        });
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', addToCart);
        });
    }
}

// عرض تفاصيل المنتج
function displayProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    if (productId) {
        let product = products.find(p => p.id === productId);
        
        if (product) {
            document.getElementById('product-img').src = product.image;
            document.getElementById('product-title').textContent = product.title;
            document.getElementById('original-price').textContent=`$${product.proginalprice.toFixed(2)}`;
            document.getElementById('product-price').textContent = `$${product.price.toFixed(2)}`;
            document.getElementById('product-desc').textContent = product.description1+product.description;
            document.getElementById('starts').innerHTML = `${product.starss}`;
            
            
        } else {
            window.location.href = 'html.html';
        }
    } else {
        window.location.href = 'html.html';
    }
}

let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cart_count = document.querySelectorAll('.cart-count');
const total_prod = document.querySelectorAll('.total-products');
// دالة مساعدة للحصول على المنتج من مصدر البيانات
function getProductById(productId) {
    // هنا يجب أن تعيد مصفوفة المنتجات الخاصة بك
    // مثال:
    return products.find(product => product.id === productId);
};

function addToCart(e) {
    try {
        const productId = parseInt(e.currentTarget.getAttribute('data-id'));
        if (isNaN(productId)) return;
        const product = getProductById(productId);
        if (!product) return;
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity +=1;
            
        } else {
            cart.push({
                id: product.id,
                title: product.title,
                price: product.price,
                image:product.image,
                quantity:1,
                starss:product.starss
                
            });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert(`تمت إضافة ${product.title} إلى العربة`);
    } catch (error) {
        console.error('Error adding to cart:', error);
    };
    
}
// دالة تحديث عداد العربة
function updateCartCount() {
    const total = cart.reduce((sum, item) => sum +item.quantity, 0);
    cart_count.forEach(el => el.textContent = total); 
    total_prod.forEach(el => el.textContent = total);
    console.log(total_prod);
};

function updateTotalAmount() {
    const totalAmount = cart.reduce((sum,product) => {
        return sum +(product.price * product.quantity);
    }, 0);
    
    document.getElementById('total-amount').textContent = `$${totalAmount.toFixed(2)}`;
    if(totalAmount ===0){       
    }else{
        paypal.Buttons({
            createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                amount: {
                    value: `${totalAmount.toFixed(2)}`, // السعر
                    currency_code: 'USD'
                },
                description: 'شراء منتج'
                }]
            });
            },
            onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                alert('تم الدفع بنجاح! ' + details.payer.name.given_name);
                // يمكنك إضافة إعادة توجيه أو تحديث قاعدة البيانات هنا
                
            });
            }
        }).render('#paypal-button-container');
        
    
    }
};

// تهيئة الصفحة
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('product.html')) {
        displayProductDetails();
    } else {
        displayProducts();
    }
    // معالجة نموذج الاتصال
    const contactForm = document.querySelector('.contact-section form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('شكراً لتواصلك معنا! سنرد عليك في أقرب وقت ممكن.');
            this.reset();
        });
    }
});
// دالة عرض صفحة المشتريات
function loadPurchasedPage() {
    // جلب البيانات من localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    // عرض المنتجات
    displayPurchasedProducts(cart);
    
}
function displayPurchasedProducts() {
    const purchasedContainer = document.querySelector('.purchased-products');
    purchasedContainer.innerHTML = '';
    cart.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'purchased-product';
        productElement.innerHTML = `
            <div class="productimage">
                <video src=${product.image}></video>
            </div>
            <div>
                <h3>${product.title}</h3>
                <p>$${(product.price).toFixed(2)}</p>
            </div>  
        `;
        
        purchasedContainer.appendChild(productElement);
    });
}
document.querySelectorAll('#button').forEach(button => {
    button.addEventListener('click', downloadAllVideosFromCart);
});
function downloadAllVideos() {
    cart.forEach(product => {
        if (product.image) {
        // إنشاء رابط تنزيل مباشر
            const a = document.createElement('a');
            a.href = product.image; 
            a.download = `video_${product.id}.mp4`;
            a.click();
        }
    });
}
function downloadAllVideosFromCart() {
    // فلترة العناصر التي تحتوي على فيديو
    const videoProducts = cart.filter(item => 
      item.image && item.image.match(/\.(mp4|webm|mov)$/i) // تحقق من امتداد الفيديو
    );
    if (videoProducts.length === 0) {
      alert('لا توجد فيديوهات في السلة');
      return;
    }
    // تنزيل كل الفيديوهات واحدًا تلو الآخر
    videoProducts.forEach((product) => {
        if (product.image) {
            // إنشاء رابط تنزيل مباشر
                const a = document.createElement('a');
                a.href = product.image; 
                setTimeout(() => {
                    a.downloadVideo(product.image, `video_${product.id}.mp4`);
                }, index * 2000);
                a.click();
        }
         // تأخير 2 ثانية بين كل تنزيل
    });
}
  // دالة متخصصة لتنزيل الفيديو
function downloadVideo(videoUrl, fileName) {
    // إضافة طابع زمني لاسم الملف لمنع التكرار
    const timestamp = new Date().getTime();
    const uniqueName = `${fileName.split('.')[0]}_${timestamp}.mp4`;
    
    fetch(videoUrl)
      .then(response => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.blob();
      })
      .then(blob => {
        const blobUrl = URL.createObjectURL(new Blob([blob], { type: 'video/mp4' }));
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = uniqueName;
        document.body.appendChild(a);
        a.click();
        
        setTimeout(() => {
          document.body.removeChild(a);
          URL.revokeObjectURL(blobUrl);
          console.log(`تم تنزيل: ${uniqueName}`);
        }, 100);
      })
      .catch(error => {
        console.error(`فشل تنزيل ${videoUrl}:`, error);
        alert(`تعذر تنزيل الفيديو: ${videoUrl}\n${error.message}`);
      });
}
function downloadCartAsJSON() {
    const data = JSON.stringify(cart, null, 2); // تنسيق JSON مع مسافات
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cart_data'; // اسم الملف
    document.body.appendChild(a);
    a.click();
    
    // التنظيف
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
}
  
  // الاستخدام:

const remove=document.querySelector('.rmpr');
remove.addEventListener('click', function(){
        localStorage.clear();
        location.reload();
    }//مسح البيانات
);




