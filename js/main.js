"use strict";

const propertiesData = [
  { id: 1, type: "Квартира", area: 58, floor: 5, price: 8400000, address: "ул. Солнечная, д. 12" },
  { id: 2, type: "Квартира", area: 42, floor: 9, price: 6200000, address: "наб. Речная, д. 5" },
  { id: 3, type: "Квартира", area: 76, floor: 3, price: 10900000, address: "ул. Зелёная, д. 8" },
  { id: 4, type: "Дом", area: 120, floor: 2, price: 15000000, address: "пос. Лесной, д. 1" },
  { id: 5, type: "Квартира", area: 65, floor: 7, price: 9500000, address: "ул. Центральная, д. 22" },
  { id: 6, type: "Квартира", area: 33, floor: 2, price: 4500000, address: "ул. Молодежная, д. 14" },
  { id: 7, type: "Дом", area: 200, floor: 3, price: 25000000, address: "Коттеджный пос. Ромашка" },
  { id: 8, type: "Квартира", area: 85, floor: 12, price: 12000000, address: "Ленинский пр-т, д. 100" },
  { id: 9, type: "Квартира", area: 48, floor: 4, price: 7000000, address: "ул. Садовая, д. 3" },
  { id: 10, type: "Квартира", area: 92, floor: 10, price: 13500000, address: "ул. Парковая, д. 7" },
  { id: 11, type: "Дом", area: 150, floor: 2, price: 18500000, address: "дер. Ольгино, д. 9" },
  { id: 12, type: "Квартира", area: 54, floor: 1, price: 8000000, address: "ул. Строителей, д. 15" },
  { id: 13, type: "Квартира", area: 61, floor: 8, price: 9100000, address: "ул. Космонавтов, д. 4" },
  { id: 14, type: "Квартира", area: 38, floor: 6, price: 5500000, address: "ул. Северная, д. 11" },
  { id: 15, type: "Дом", area: 180, floor: 2, price: 21000000, address: "пос. Солнечный, д. 2" }
];

class Property {
  constructor(data) {
    this.id = data.id;
    this.type = data.type;
    this.area = data.area;
    this.floor = data.floor;
    this.price = data.price;
    this.address = data.address;
  }

  getFormattedPrice() {
    return this.price.toLocaleString("ru-RU") + " ₽";
  }

  render() {
    const article = document.createElement("article");
    article.className = "card";
    article.dataset.id = this.id; 

    const mediaDiv = document.createElement("div");
    mediaDiv.className = "card__media";
    
    // --- 1. Добавляем картинку (чтобы блок не был пустым) ---
    const img = document.createElement("img");
    img.className = "card__image";
    img.src = "https://placehold.co/400x300/e5e7eb/1f2937?text=Тут картинка"; 
    img.alt = `Фото объекта: ${this.type}`;
    mediaDiv.append(img);

    const priceTag = document.createElement("span");
    priceTag.className = "price-tag";
    
    const priceTagValue = document.createElement("span");
    priceTagValue.className = "price-tag__value";
    priceTagValue.textContent = this.getFormattedPrice();
    
    priceTag.append(priceTagValue);
    mediaDiv.append(priceTag); 

    const title = document.createElement("h3");
    title.className = "card__title";
    title.textContent = `${this.type} по адресу: ${this.address}`;

    const list = document.createElement("ul");
    list.className = "card__list";

    const areaLi = document.createElement("li");
    areaLi.textContent = `Площадь: ${this.area} м²`;
    
    const floorLi = document.createElement("li");
    floorLi.textContent = `Этаж: ${this.floor}`;

    list.append(areaLi, floorLi);

    article.append(mediaDiv, title, list);

    return article;
  }
}

const renderCatalog = () => {
  const container = document.querySelector("#catalog-container");
  if (!container) return; 

  container.textContent = ""; 

  propertiesData.forEach((dataItem) => {
    const propertyInstance = new Property(dataItem);
    const cardNode = propertyInstance.render();
    container.append(cardNode);
  });
};

const analyzeData = () => {
  console.log("--- Аналитика по каталогу недвижимости ---");

  const largeApartments = propertiesData
    .filter((prop) => prop.type === "Квартира" && prop.area > 60)
    .map((prop) => `${prop.address} (${prop.area} м²)`);

  console.log("1. Квартиры площадью более 60 кв.м:");
  console.log(largeApartments);

  const totalPrice = propertiesData.reduce((sum, prop) => sum + prop.price, 0);
  const totalArea = propertiesData.reduce((sum, prop) => sum + prop.area, 0);
  const avgPricePerSqMeter = totalPrice / totalArea;

  console.log(`2. Средняя стоимость квадратного метра по всему каталогу: ${Math.round(avgPricePerSqMeter).toLocaleString("ru-RU")} ₽/м²`);
};

renderCatalog();
analyzeData();